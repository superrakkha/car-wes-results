import { supabaseAdmin, supabasePublic } from "@/lib/supabase";
import { PurchaseResult } from "@/types";

// Supabaseの purchase_results テーブル（DB側はsnake_case）と
// アプリ側の型 PurchaseResult（camelCase）を相互変換する層。
// ここから下の関数のインターフェースはフェーズ1のJSONファイル版と同じにしてあるので、
// ページ側・管理画面側のコードは変更していない（awaitを付けただけ）。

const TABLE = "purchase_results";

type ResultRow = {
  id: string;
  management_number: string;
  slug: string;
  maker: string;
  maker_slug: string;
  car_name: string;
  grade: string | null;
  model_code: string | null;
  year: number;
  mileage: number;
  mileage_unknown: boolean | null;
  purchase_price: number;
  prefecture: string;
  city: string;
  area_slug: string;
  purchase_date: string;
  condition: string;
  condition_slug: string;
  inspection_status: string | null;
  drive_type: string | null;
  fuel_type: string | null;
  body_color: string | null;
  damage_details: string | null;
  customer_request: string | null;
  assessment_point: string | null;
  staff_comment: string | null;
  main_image_url: string;
  status: string;
  seo_title: string | null;
  meta_description: string | null;
  is_featured: boolean | null;
};

function rowToResult(row: ResultRow): PurchaseResult {
  return {
    id: row.id,
    managementNumber: row.management_number,
    slug: row.slug,
    maker: row.maker,
    makerSlug: row.maker_slug,
    carName: row.car_name,
    grade: row.grade ?? undefined,
    modelCode: row.model_code ?? undefined,
    year: row.year,
    mileage: row.mileage,
    mileageUnknown: row.mileage_unknown ?? undefined,
    purchasePrice: row.purchase_price,
    prefecture: row.prefecture,
    city: row.city,
    areaSlug: row.area_slug,
    purchaseDate: row.purchase_date,
    condition: row.condition,
    conditionSlug: row.condition_slug,
    inspectionStatus: row.inspection_status ?? undefined,
    driveType: row.drive_type ?? undefined,
    fuelType: row.fuel_type ?? undefined,
    bodyColor: row.body_color ?? undefined,
    damageDetails: row.damage_details ?? undefined,
    customerRequest: row.customer_request ?? undefined,
    assessmentPoint: row.assessment_point ?? undefined,
    staffComment: row.staff_comment ?? undefined,
    mainImageUrl: row.main_image_url,
    status: row.status as PurchaseResult["status"],
    seoTitle: row.seo_title ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    isFeatured: row.is_featured ?? undefined,
  };
}

// camelCase の入力 → DBのsnake_caseカラムへ変換（渡された項目だけを変換する）
function resultToRow(
  input: Partial<Omit<PurchaseResult, "id">>
): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  const map: Record<string, string> = {
    managementNumber: "management_number",
    slug: "slug",
    maker: "maker",
    makerSlug: "maker_slug",
    carName: "car_name",
    grade: "grade",
    modelCode: "model_code",
    year: "year",
    mileage: "mileage",
    mileageUnknown: "mileage_unknown",
    purchasePrice: "purchase_price",
    prefecture: "prefecture",
    city: "city",
    areaSlug: "area_slug",
    purchaseDate: "purchase_date",
    condition: "condition",
    conditionSlug: "condition_slug",
    inspectionStatus: "inspection_status",
    driveType: "drive_type",
    fuelType: "fuel_type",
    bodyColor: "body_color",
    damageDetails: "damage_details",
    customerRequest: "customer_request",
    assessmentPoint: "assessment_point",
    staffComment: "staff_comment",
    mainImageUrl: "main_image_url",
    status: "status",
    seoTitle: "seo_title",
    metaDescription: "meta_description",
    isFeatured: "is_featured",
  };

  for (const [key, column] of Object.entries(map)) {
    const value = (input as Record<string, unknown>)[key];
    if (value !== undefined) {
      row[column] = value;
    }
  }
  return row;
}

// 公開分のみ取得（サイト側の一覧・詳細で使う。anonキー＝RLSで published のみ見える）
export async function getPublishedResults(): Promise<PurchaseResult[]> {
  const { data, error } = await supabasePublic
    .from(TABLE)
    .select("*")
    .eq("status", "published")
    .order("purchase_date", { ascending: false });

  if (error) {
    console.error("[store] getPublishedResults error:", error.message);
    return [];
  }
  return (data as ResultRow[]).map(rowToResult);
}

// 全件取得（管理画面用。下書き・非公開も含む。service_roleキーを使うのでRLSを無視できる）
export async function getAllResults(): Promise<PurchaseResult[]> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select("*")
    .order("purchase_date", { ascending: false });

  if (error) {
    console.error("[store] getAllResults error:", error.message);
    return [];
  }
  return (data as ResultRow[]).map(rowToResult);
}

export async function getResultById(
  id: string
): Promise<PurchaseResult | undefined> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return undefined;
  return rowToResult(data as ResultRow);
}

export async function getResultBySlug(
  slug: string
): Promise<PurchaseResult | undefined> {
  const { data, error } = await supabasePublic
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return undefined;
  return rowToResult(data as ResultRow);
}

// 新規登録
export async function addResult(
  input: Omit<PurchaseResult, "id">
): Promise<PurchaseResult> {
  const row = resultToRow(input);
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .insert(row)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return rowToResult(data as ResultRow);
}

// 編集
export async function updateResult(
  id: string,
  patch: Partial<PurchaseResult>
): Promise<PurchaseResult | null> {
  const row = resultToRow(patch);
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .update(row)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error || !data) return null;
  return rowToResult(data as ResultRow);
}

// 削除
export async function deleteResult(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
}
