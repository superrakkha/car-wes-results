// 買取実績1件分のデータ型
// 後でSupabaseの purchase_results テーブルにそのまま対応させる想定
export type PurchaseResult = {
  id: string;
  managementNumber: string;
  slug: string;
  maker: string;
  makerSlug: string;
  carName: string;
  grade?: string;
  modelCode?: string;
  year: number;
  mileage: number;
  mileageUnknown?: boolean;
  purchasePrice: number;
  prefecture: string;
  city: string;
  areaSlug: string;
  purchaseDate: string; // ISO形式 YYYY-MM-DD
  condition: string;
  conditionSlug: string;
  inspectionStatus?: string;
  driveType?: string;
  fuelType?: string;
  bodyColor?: string;
  damageDetails?: string;
  customerRequest?: string;
  staffComment?: string;
  assessmentPoint?: string; // 査定ポイント（最低200文字程度を想定）
  mainImageUrl: string;
  images?: PurchaseResultImage[];
  status: "draft" | "published" | "hidden";
  seoTitle?: string;
  metaDescription?: string;
  isFeatured?: boolean;
};

export type PurchaseResultImage = {
  id: string;
  imageUrl: string;
  altText: string;
  sortOrder: number;
};

// 絞り込み用の選択肢
export type FilterOption = {
  label: string;
  slug: string;
};

// 並び替えの種類
export type SortKey =
  | "newest"
  | "price-desc"
  | "price-asc"
  | "year-desc"
  | "mileage-asc";

// 一覧ページのURLクエリパラメータ
export type ResultsSearchParams = {
  keyword?: string;
  condition?: string;
  area?: string;
  maker?: string;
  sort?: SortKey;
  page?: string;
};
