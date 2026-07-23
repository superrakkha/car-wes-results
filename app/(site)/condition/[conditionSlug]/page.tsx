import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ResultGrid from "@/components/ResultGrid";
import CTASection from "@/components/CTASection";
import { CONDITIONS } from "@/data/filterOptions";
import { getPublishedResults } from "@/lib/store";
import { ResultsSearchParams, SortKey } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { conditionSlug: string };
}): Promise<Metadata> {
  const condition = CONDITIONS.find((c) => c.slug === params.conditionSlug);
  if (!condition) return { title: "ページが見つかりません" };

  const title = `新潟県の${condition.label}買取実績｜カーウェス`;
  const description = `カーウェスが新潟県内で買い取った${condition.label}の買取実績一覧です。査定・引き取り・廃車手続きはすべて無料です。`;

  return {
    title,
    description,
    alternates: { canonical: `/condition/${condition.slug}` },
  };
}

export default async function ConditionPage({
  params,
  searchParams,
}: {
  params: { conditionSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const condition = CONDITIONS.find((c) => c.slug === params.conditionSlug);
  if (!condition) {
    notFound();
  }

  const allResults = await getPublishedResults();
  const results = allResults.filter(
    (r) => r.conditionSlug === condition!.slug
  );

  const normalized: ResultsSearchParams = {
    keyword: toStr(searchParams.keyword),
    sort: toStr(searchParams.sort) as SortKey | undefined,
    page: toStr(searchParams.page),
  };

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "買取実績", href: "/" },
          { label: `${condition!.label}の買取実績` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <h1 className="text-xl font-extrabold text-brand-text sm:text-2xl">
          新潟県の{condition!.label}買取実績
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          カーウェスが新潟県内で実際に買い取った{condition!.label}
          の実績です。査定・出張・引き取り・廃車手続きはすべて無料で対応しています。
        </p>
      </div>

      <ResultGrid
        results={results}
        searchParams={normalized}
        basePath={`/condition/${condition!.slug}`}
      />

      <CTASection />
    </main>
  );
}

function toStr(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
