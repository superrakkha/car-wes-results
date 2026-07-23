"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addResult, deleteResult, updateResult } from "@/lib/store";
import { supabaseAdmin } from "@/lib/supabase";
import { buildSlug } from "@/lib/utils";
import { AREAS, CONDITIONS, MAKERS } from "@/data/filterOptions";
import { PurchaseResult } from "@/types";

const IMAGE_BUCKET = "purchase-results";
const PLACEHOLDER_IMAGE = "/images/placeholder-car.svg";

// フォームの入力内容を PurchaseResult の形に変換する共通処理
// （画像だけは別処理なのでここでは扱わない）
function parseFormData(formData: FormData) {
  const makerSlug = String(formData.get("makerSlug") ?? "");
  const areaSlug = String(formData.get("areaSlug") ?? "");
  const conditionSlug = String(formData.get("conditionSlug") ?? "");

  const maker = MAKERS.find((m) => m.slug === makerSlug)?.label ?? makerSlug;
  const area = AREAS.find((a) => a.slug === areaSlug);
  const condition =
    CONDITIONS.find((c) => c.slug === conditionSlug)?.label ?? conditionSlug;

  const managementNumber = String(formData.get("managementNumber") ?? "");
  const carName = String(formData.get("carName") ?? "");
  const grade = String(formData.get("grade") ?? "");
  const year = Number(formData.get("year") ?? 0);
  const mileage = Number(formData.get("mileage") ?? 0);
  const purchasePrice = Number(formData.get("purchasePrice") ?? 0);
  const purchaseDate = String(formData.get("purchaseDate") ?? "");
  const assessmentPoint = String(formData.get("assessmentPoint") ?? "");
  const staffComment = String(formData.get("staffComment") ?? "");
  const status = String(
    formData.get("status") ?? "draft"
  ) as PurchaseResult["status"];

  return {
    managementNumber,
    maker,
    makerSlug,
    carName,
    grade: grade || undefined,
    year,
    mileage,
    purchasePrice,
    prefecture: "新潟県",
    city: area?.label ?? areaSlug,
    areaSlug,
    purchaseDate,
    condition,
    conditionSlug,
    assessmentPoint,
    staffComment: staffComment || undefined,
    status,
  };
}

// アップロードされた画像ファイルをSupabase Storageに保存し、公開URLを返す
// ファイルが選ばれていなければ null を返す
async function uploadMainImageIfPresent(
  formData: FormData,
  managementNumber: string
): Promise<string | null> {
  const file = formData.get("mainImageFile");

  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeNumber = managementNumber.replace(/[^a-zA-Z0-9-]/g, "") || "car";
  const path = `${safeNumber}/main-${Date.now()}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabaseAdmin.storage
    .from(IMAGE_BUCKET)
    .upload(path, arrayBuffer, {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

  if (error) {
    console.error("[actions] 画像アップロードに失敗しました:", error.message);
    return null;
  }

  const { data } = supabaseAdmin.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// 画像の最終的な値を決める：
// 1. 新しいファイルがアップロードされていればそれを使う
// 2. なければ今までの画像（編集時）を維持する
// 3. どちらもなければプレースホルダー画像
async function resolveMainImageUrl(
  formData: FormData,
  managementNumber: string
): Promise<string> {
  const uploaded = await uploadMainImageIfPresent(formData, managementNumber);
  if (uploaded) return uploaded;

  const current = String(formData.get("currentMainImageUrl") ?? "").trim();
  return current || PLACEHOLDER_IMAGE;
}

// 手入力のスラッグをURLに安全な形（半角英数字とハイフンのみ）に整える
// 空欄、または英数字が1文字も無い場合は null を返し、自動生成に任せる
function sanitizeSlugOverride(formData: FormData): string | null {
  const raw = String(formData.get("slugOverride") ?? "").trim();
  if (!raw) return null;

  const cleaned = raw
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || null;
}

// 新規登録
export async function createResultAction(formData: FormData) {
  const data = parseFormData(formData);
  const autoSlug = buildSlug({
    makerSlug: data.makerSlug,
    carName: data.carName,
    year: data.year,
    areaSlug: data.areaSlug,
    managementNumber: data.managementNumber,
  });
  const slug = sanitizeSlugOverride(formData) ?? autoSlug;
  const mainImageUrl = await resolveMainImageUrl(
    formData,
    data.managementNumber
  );

  await addResult({ ...data, slug, mainImageUrl });

  revalidatePath("/");
  revalidatePath("/admin/results");
  redirect("/admin/results");
}

// 編集（idを事前にbindして使う）
export async function updateResultAction(id: string, formData: FormData) {
  const data = parseFormData(formData);
  const autoSlug = buildSlug({
    makerSlug: data.makerSlug,
    carName: data.carName,
    year: data.year,
    areaSlug: data.areaSlug,
    managementNumber: data.managementNumber,
  });
  const slug = sanitizeSlugOverride(formData) ?? autoSlug;
  const mainImageUrl = await resolveMainImageUrl(
    formData,
    data.managementNumber
  );

  await updateResult(id, { ...data, slug, mainImageUrl });

  revalidatePath("/");
  revalidatePath("/admin/results");
  redirect("/admin/results");
}

// 削除（idを事前にbindして使う）
export async function deleteResultAction(id: string) {
  await deleteResult(id);
  revalidatePath("/");
  revalidatePath("/admin/results");
}
