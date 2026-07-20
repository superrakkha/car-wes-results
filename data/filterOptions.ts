import { FilterOption } from "@/types";

// 状態別の選択肢
export const CONDITIONS: FilterOption[] = [
  { label: "廃車", slug: "haisha" },
  { label: "事故車", slug: "accident-car" },
  { label: "不動車", slug: "immobile-car" },
  { label: "車検切れ", slug: "no-inspection" },
  { label: "過走行", slug: "high-mileage" },
  { label: "故障車", slug: "broken-car" },
  { label: "水没車", slug: "flooded-car" },
  { label: "中古車", slug: "used-car" },
];

// 地域別の選択肢（初期候補）
export const AREAS: FilterOption[] = [
  { label: "新潟市", slug: "niigata" },
  { label: "新発田市", slug: "shibata" },
  { label: "村上市", slug: "murakami" },
  { label: "胎内市", slug: "tainai" },
  { label: "阿賀野市", slug: "agano" },
  { label: "聖籠町", slug: "seiro" },
  { label: "五泉市", slug: "gosen" },
  { label: "燕市", slug: "tsubame" },
  { label: "三条市", slug: "sanjo" },
  { label: "長岡市", slug: "nagaoka" },
];

// メーカー別の選択肢
export const MAKERS: FilterOption[] = [
  { label: "トヨタ", slug: "toyota" },
  { label: "日産", slug: "nissan" },
  { label: "ホンダ", slug: "honda" },
  { label: "スズキ", slug: "suzuki" },
  { label: "ダイハツ", slug: "daihatsu" },
  { label: "スバル", slug: "subaru" },
  { label: "マツダ", slug: "mazda" },
  { label: "三菱", slug: "mitsubishi" },
  { label: "いすゞ", slug: "isuzu" },
  { label: "その他", slug: "other" },
];

// 並び替えの選択肢
export const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: "新着順", value: "newest" },
  { label: "買取価格が高い順", value: "price-desc" },
  { label: "買取価格が低い順", value: "price-asc" },
  { label: "年式が新しい順", value: "year-desc" },
  { label: "走行距離が少ない順", value: "mileage-asc" },
];
