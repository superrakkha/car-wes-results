import { PurchaseResult } from "@/types";

// results.ka-wes.com → cars.ka-wes.com の相互リンク
//
// 重要：cars.ka-wes.com の正確なURL構造（ルーティング）をこちらから確認できないため、
// 「存在しそうなURLパターン」を複数候補として組み立て、実際にリクエストして
// 200が返ってきたものだけをリンクとして採用する。存在しないURL（404）は絶対に表示しない。
//
// もし cars.ka-wes.com の実際のURL構造が分かっている場合は、
// buildCandidateUrls() の中のパターンを実際の形式に合わせて調整してください。
// （例：確認できたURLが https://cars.ka-wes.com/suzuki/carry/da16t なら、
// 　　 今のパターンのままでOK。/vehicles/suzuki/carry のような形式なら要修正）

const CARS_BASE_URL = "https://cars.ka-wes.com";
const FETCH_TIMEOUT_MS = 2500;

// cars.ka-wes.com は車種名を英語（ローマ字）のスラッグで管理している
// （実例：https://cars.ka-wes.com/toyota/aqua/nhp10 、/honda/fit/gd1 ）。
// こちらのDBの車種名は日本語（カタカナ）なので、対応表で変換する。
// 未登録の車種名は変換できずリンクが出ないだけなので、安全側に倒れる設計。
// 新しい車種を追加した場合は、ここに1行足せばリンク対象に含められる。
const CAR_NAME_SLUG_MAP: Record<string, string> = {
  アクア: "aqua",
  プリウス: "prius",
  ノート: "note",
  ムーヴ: "move",
  ムーブ: "move",
  レガシィ: "legacy",
  レガシー: "legacy",
  デミオ: "demio",
  "eKワゴン": "ek-wagon",
  セレナ: "serena",
  ワゴンR: "wagon-r",
  フィット: "fit",
  タント: "tanto",
  エルフ: "elf",
  "CX-5": "cx-5",
  ヴィッツ: "vitz",
  ハスラー: "hustler",
  ライフ: "life",
  パッソ: "passo",
  ステップワゴン: "step-wagon",
  アルト: "alto",
  ボンゴ: "bongo",
  エクストレイル: "x-trail",
  エルグランド: "elgrand",
  インプレッサ: "impreza",
  オデッセイ: "odyssey",
  エスケープ: "escape",
  キャリートラック: "carry",
  キャリイ: "carry",
  "キャリイトラック": "carry",
  ハイエース: "hiace",
  エブリイワゴン: "every",
  エブリイ: "every",
  ワゴンr: "wagon-r",
  bB: "bb",
  BB: "bb",
};

// 表記揺れ（全角・半角スペース、記号など）を軽く正規化してから対応表を引く
function normalizeCarName(carName: string): string {
  return carName
    .normalize("NFKC")
    .replace(/[\s　]+/g, "")
    .trim();
}

function getModelSlug(carName: string): string | null {
  const normalized = normalizeCarName(carName);
  if (CAR_NAME_SLUG_MAP[normalized]) return CAR_NAME_SLUG_MAP[normalized];
  if (CAR_NAME_SLUG_MAP[carName]) return CAR_NAME_SLUG_MAP[carName];

  // 車種名がもともと英数字のみ（アルファベット表記の車種）の場合はそのままスラッグ化できる
  const ascii = slugify(carName);
  return ascii || null;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 型式一致 → 車種一致 の優先順位で候補URLを組み立てる
function buildCandidateUrls(
  makerSlug: string,
  carName: string,
  modelCode?: string
): string[] {
  const modelSlug = getModelSlug(carName);
  if (!modelSlug) return [];

  const candidates: string[] = [];

  if (modelCode) {
    const typeSlug = slugify(modelCode);
    if (typeSlug) {
      candidates.push(`${CARS_BASE_URL}/${makerSlug}/${modelSlug}/${typeSlug}`);
    }
  }

  candidates.push(`${CARS_BASE_URL}/${makerSlug}/${modelSlug}`);

  return candidates;
}

// 指定したURLに実際にアクセスして、ページが存在する（200番台が返る）か確認する
// HEADリクエストはサーバー側で正しく扱われないことがあるため、GETで確認する
async function urlExists(url: string): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      // ページが存在するかどうかは滅多に変わらないため24時間キャッシュする。
      // 詳細ページを開くたびに毎回cars.ka-wes.comへ問い合わせに行くと遅くなるため
      next: { revalidate: 86400 },
      headers: {
        // 一部のサーバーはUser-Agentが無いリクエストをブロックすることがあるため付与する
        "User-Agent":
          "Mozilla/5.0 (compatible; carwes-results-linkchecker/1.0)",
      },
    });
    return res.ok;
  } catch {
    // タイムアウト・ネットワークエラー時は「存在しない」扱いにして、
    // リンクを出さない（安全側に倒す）
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export type CarsReference = {
  url: string;
  matchedBy: "type" | "model";
};

// 買取実績1件に対応する cars.ka-wes.com のページを探す。
// 見つからなければ null を返す（呼び出し側はリンクを表示しない）
export async function findCarsReference(
  result: PurchaseResult
): Promise<CarsReference | null> {
  const candidates = buildCandidateUrls(
    result.makerSlug,
    result.carName,
    result.modelCode
  );

  for (const url of candidates) {
    // eslint-disable-next-line no-await-in-loop
    const exists = await urlExists(url);
    if (exists) {
      const matchedBy = result.modelCode && url.includes(slugify(result.modelCode))
        ? "type"
        : "model";
      return { url, matchedBy };
    }
  }

  return null;
}
