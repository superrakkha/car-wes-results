import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { filterResults, paginate, sortResults } from "@/lib/utils";
import { PurchaseResult, ResultsSearchParams } from "@/types";
import ResultCard from "./ResultCard";

export default function ResultGrid({
  results,
  searchParams,
  basePath = "/",
}: {
  results: PurchaseResult[];
  searchParams: ResultsSearchParams;
  // メーカー別・地域別・状態別ページなど、一覧ページ以外で使うときのURL基点
  // （ページネーションのリンク先を正しくするために必要）
  basePath?: string;
}) {
  const filtered = filterResults(results, {
    keyword: searchParams.keyword,
    condition: searchParams.condition,
    area: searchParams.area,
    maker: searchParams.maker,
  });
  const sorted = sortResults(filtered, searchParams.sort);
  const page = Number(searchParams.page ?? "1") || 1;
  const { items, totalPages, currentPage } = paginate(
    sorted,
    page,
    SITE_CONFIG.resultsPerPage
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {sorted.length}件の買取実績が見つかりました
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500 shadow-card">
          条件に合う買取実績が見つかりませんでした。
          <br />
          絞り込み条件を変更してもう一度お試しください。
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <PaginationNav
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
          basePath={basePath}
        />
      )}
    </section>
  );
}

function PaginationNav({
  currentPage,
  totalPages,
  searchParams,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: ResultsSearchParams;
  basePath: string;
}) {
  function hrefForPage(p: number) {
    const params = new URLSearchParams();
    if (searchParams.keyword) params.set("keyword", searchParams.keyword);
    if (searchParams.condition) params.set("condition", searchParams.condition);
    if (searchParams.area) params.set("area", searchParams.area);
    if (searchParams.maker) params.set("maker", searchParams.maker);
    if (searchParams.sort) params.set("sort", searchParams.sort);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="ページネーション"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      {pages.map((p) => (
        <Link
          key={p}
          href={hrefForPage(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
            p === currentPage
              ? "bg-brand-green text-white"
              : "bg-white text-gray-600 shadow-card hover:bg-brand-bg"
          }`}
        >
          {p}
        </Link>
      ))}
    </nav>
  );
}
