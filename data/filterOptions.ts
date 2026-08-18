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

// 地域別の選択肢
export const AREAS: FilterOption[] = [
  // 新潟県
  { label: "新潟市", slug: "niigata" },
  { label: "長岡市", slug: "nagaoka" },
  { label: "三条市", slug: "sanjo" },
  { label: "柏崎市", slug: "kashiwazaki" },
  { label: "新発田市", slug: "shibata" },
  { label: "小千谷市", slug: "ojiya" },
  { label: "加茂市", slug: "kamo" },
  { label: "十日町市", slug: "tokamachi" },
  { label: "見附市", slug: "mitsuke" },
  { label: "村上市", slug: "murakami" },
  { label: "燕市", slug: "tsubame" },
  { label: "糸魚川市", slug: "itoigawa" },
  { label: "妙高市", slug: "myoko" },
  { label: "五泉市", slug: "gosen" },
  { label: "上越市", slug: "joetsu" },
  { label: "阿賀野市", slug: "agano" },
  { label: "佐渡市", slug: "sado" },
  { label: "魚沼市", slug: "uonuma" },
  { label: "南魚沼市", slug: "minamiuonuma" },
  { label: "胎内市", slug: "tainai" },
  { label: "聖籠町", slug: "seiro" },
  { label: "弥彦村", slug: "yahiko" },
  { label: "田上町", slug: "tagami" },
  { label: "阿賀町", slug: "aga" },
  { label: "出雲崎町", slug: "izumozaki" },
  { label: "湯沢町", slug: "yuzawa" },
  { label: "津南町", slug: "tsunan" },
  { label: "刈羽村", slug: "kariwa" },
  { label: "関川村", slug: "sekikawa" },
  { label: "粟島浦村", slug: "awashimaura" },
  // 山形県（対応エリアとして実績あり）
  { label: "山形市", slug: "yamagata-shi" },
  { label: "米沢市", slug: "yonezawa" },
  { label: "酒田市", slug: "sakata" },
  { label: "鶴岡市", slug: "tsuruoka" },
  { label: "新庄市", slug: "shinjo" },
  { label: "寒河江市", slug: "sagae" },
  { label: "上山市", slug: "kaminoyama" },
  { label: "村山市", slug: "murayama" },
  { label: "長井市", slug: "nagai" },
  { label: "天童市", slug: "tendo" },
  { label: "東根市", slug: "higashine" },
  { label: "尾花沢市", slug: "obanazawa" },
  { label: "南陽市", slug: "nanyo" },
];

// メーカー別の選択肢
// 国産メーカーに加えて、輸入車もよく問い合わせがあるため主要ブランドを追加している。
// ここに無いメーカーは管理画面で「その他」を選んでください。
export const MAKERS: FilterOption[] = [
  // 国産
  { label: "トヨタ", slug: "toyota" },
  { label: "日産", slug: "nissan" },
  { label: "ホンダ", slug: "honda" },
  { label: "スズキ", slug: "suzuki" },
  { label: "ダイハツ", slug: "daihatsu" },
  { label: "スバル", slug: "subaru" },
  { label: "マツダ", slug: "mazda" },
  { label: "三菱", slug: "mitsubishi" },
  { label: "いすゞ", slug: "isuzu" },
  { label: "レクサス", slug: "lexus" },
  // 輸入車
  { label: "フォルクスワーゲン", slug: "volkswagen" },
  { label: "メルセデス・ベンツ", slug: "mercedes-benz" },
  { label: "BMW", slug: "bmw" },
  { label: "アウディ", slug: "audi" },
  { label: "プジョー", slug: "peugeot" },
  { label: "ルノー", slug: "renault" },
  { label: "シトロエン", slug: "citroen" },
  { label: "フィアット", slug: "fiat" },
  { label: "ボルボ", slug: "volvo" },
  { label: "ポルシェ", slug: "porsche" },
  { label: "ジープ", slug: "jeep" },
  { label: "ミニ", slug: "mini" },
  { label: "ヒュンダイ", slug: "hyundai" },
  // その他
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