import { PurchaseResult, SortKey } from "@/types";

export function formatPrice(price: number): string {
  return `${price.toLocaleString("ja-JP")}円`;
}

export function formatMileage(mileage: number, unknown?: boolean): string {
  if (unknown) return "不明";
  return `${mileage.toLocaleString("ja-JP")}km`;
}

export function formatDateJa(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export function buildSlug(params: {
  makerSlug: string;
  carName: string;
  year: number;
  areaSlug: string;
  managementNumber: string;
}): string {
  const carPart = params.carName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const numberPart = params.managementNumber.replace(/[^a-z0-9]/gi, "");
  return [params.makerSlug, carPart, params.year, params.areaSlug, numberPart]
    .filter(Boolean)
    .join("-");
}

export function filterResults(
  results: PurchaseResult[],
  filters: {
    keyword?: string;
    condition?: string;
    area?: string;
    maker?: string;
  }
): PurchaseResult[] {
  let list = results.filter((r) => r.status === "published");

  if (filters.keyword) {
    const kw = filters.keyword.trim().toLowerCase();
    if (kw) {
      list = list.filter((r) =>
        [r.maker, r.carName, r.modelCode ?? "", r.city, r.prefecture, r.assessmentPoint ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(kw)
      );
    }
  }

  if (filters.condition) {
    list = list.filter((r) => r.conditionSlug === filters.condition);
  }
  if (filters.area) {
    list = list.filter((r) => r.areaSlug === filters.area);
  }
  if (filters.maker) {
    list = list.filter((r) => r.makerSlug === filters.maker);
  }

  return list;
}

export function sortResults(
  results: PurchaseResult[],
  sort: SortKey = "newest"
): PurchaseResult[] {
  const list = [...results];
  switch (sort) {
    case "price-desc":
      return list.sort((a, b) => b.purchasePrice - a.purchasePrice);
    case "price-asc":
      return list.sort((a, b) => a.purchasePrice - b.purchasePrice);
    case "year-desc":
      return list.sort((a, b) => b.year - a.year);
    case "mileage-asc":
      return list.sort((a, b) => a.mileage - b.mileage);
    case "newest":
    default:
      return list.sort(
        (a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      );
  }
}

export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
): { items: T[]; totalPages: number; currentPage: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return { items: items.slice(start, start + perPage), totalPages, currentPage };
}

export function getRelatedResults(
  current: PurchaseResult,
  all: PurchaseResult[],
  max = 4
): PurchaseResult[] {
  const others = all.filter((r) => r.id !== current.id);
  const picked = new Map<string, PurchaseResult>();
  const passes: Array<(r: PurchaseResult) => boolean> = [
    (r) => r.carName === current.carName,
    (r) => r.makerSlug === current.makerSlug,
    (r) => r.conditionSlug === current.conditionSlug,
    (r) => r.areaSlug === current.areaSlug,
  ];
  for (const test of passes) {
    if (picked.size >= max) break;
    for (const r of others) {
      if (picked.size >= max) break;
      if (test(r) && !picked.has(r.id)) picked.set(r.id, r);
    }
  }
  return Array.from(picked.values());
}

// 買取実績→無料査定LP（haisya.ka-wes.com）への遷移URLを生成する共通関数。
// メーカー・車種・型式だけを引き継ぎ、年式・走行距離・地域・買取価格などは引き継がない
// （実績車両とユーザー自身の車は別物のため）。
// utm_source/utm_medium は常に固定、utm_campaign は配置場所ごとに変える。
export function buildAssessmentUrl(params: {
  maker?: string;
  model?: string;
  type?: string;
  utmCampaign: string;
}): string {
  const url = new URL("https://haisya.ka-wes.com/");
  if (params.maker) url.searchParams.set("maker", params.maker);
  if (params.model) url.searchParams.set("model", params.model);
  if (params.type) url.searchParams.set("type", params.type);
  url.searchParams.set("utm_source", "results");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", params.utmCampaign);
  return url.toString();
}
