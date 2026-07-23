import { PurchaseResult, SortKey } from "@/types";

// 買取価格を「85,000円」のような表示に変換する
export function formatPrice(price: number): string {
  return `${price.toLocaleString("ja-JP")}円`;
}

// 走行距離を「50,000km」のような表示に変換する
export function formatMileage(mileage: number, unknown?: boolean): string {
  if (unknown) return "不明";
  return `${mileage.toLocaleString("ja-JP")}km`;
}

// 買取日を「2026年7月10日」のような表示に変換する
export function formatDateJa(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

// URLスラッグを自動生成する（例: toyota-prius-2012-shibata-001）
// 日本語（カタカナ・漢字など）はURLに含めるとブラウザ・サーバー間でのエンコードの
// 取り扱いが不安定になり、404の原因になることがあるため、英数字だけに変換する
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

// 一覧を絞り込む
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
        [
          r.maker,
          r.carName,
          r.modelCode ?? "",
          r.city,
          r.prefecture,
          r.assessmentPoint ?? "",
        ]
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

// 並び替える
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
        (a, b) =>
          new Date(b.purchaseDate).getTime() -
          new Date(a.purchaseDate).getTime()
      );
  }
}

// ページ分割する
export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
): { items: T[]; totalPages: number; currentPage: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages,
    currentPage,
  };
}

// 詳細ページの「関連実績」を優先順位（同じ車種 > 同じメーカー > 同じ状態 > 同じ地域）で最大4件取得する
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
      if (test(r) && !picked.has(r.id)) {
        picked.set(r.id, r);
      }
    }
  }

  return Array.from(picked.values());
}
