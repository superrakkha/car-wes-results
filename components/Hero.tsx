import { PurchaseResult } from "@/types";
import { formatDateJa, formatPrice } from "@/lib/utils";

const STRENGTHS = [
  "査定無料",
  "引き取り無料",
  "廃車手続き無料",
  "立ち会い不要も対応",
];

export default function Hero({ results }: { results: PurchaseResult[] }) {
  const published = results.filter((r) => r.status === "published");
  const count = published.length;
  const maxPrice = published.reduce(
    (max, r) => Math.max(max, r.purchasePrice),
    0
  );
  const latestDate = published.reduce((latest, r) => {
    return new Date(r.purchaseDate) > new Date(latest) ? r.purchaseDate : latest;
  }, published[0]?.purchaseDate ?? "");

  return (
    <section className="bg-gradient-to-b from-white to-brand-bg">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl font-extrabold leading-snug text-brand-text sm:text-3xl">
          新潟県の廃車・事故車・不動車の買取実績
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
          カーウェスが新潟県内で実際に買い取った車両をご紹介します。
          <br className="hidden sm:block" />
          廃車、事故車、不動車、車検切れ車、低年式車、過走行車など、さまざまな車の買取価格・年式・走行距離・地域・査定ポイントを掲載しています。
        </p>

        {/* 強み表示 */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {STRENGTHS.map((s) => (
            <li
              key={s}
              className="rounded-full border border-brand-green bg-white px-3 py-1 text-xs font-bold text-brand-green-dark sm:text-sm"
            >
              ✓ {s}
            </li>
          ))}
        </ul>

        {/* 実績数字 */}
        <dl className="mt-8 grid grid-cols-3 gap-3 rounded-2xl bg-white p-4 shadow-card sm:gap-6 sm:p-6">
          <div className="text-center">
            <dt className="text-[11px] text-gray-500 sm:text-xs">掲載実績数</dt>
            <dd className="mt-1 text-lg font-extrabold text-brand-text sm:text-2xl">
              {count}<span className="text-xs font-bold sm:text-sm">台</span>
            </dd>
          </div>
          <div className="text-center">
            <dt className="text-[11px] text-gray-500 sm:text-xs">最高買取価格</dt>
            <dd className="mt-1 text-lg font-extrabold text-brand-red sm:text-2xl">
              {formatPrice(maxPrice)}
            </dd>
          </div>
          <div className="text-center">
            <dt className="text-[11px] text-gray-500 sm:text-xs">最新更新日</dt>
            <dd className="mt-1 text-lg font-extrabold text-brand-text sm:text-2xl">
              {latestDate ? formatDateJa(latestDate) : "-"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
