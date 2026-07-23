import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ResultGrid from "@/components/ResultGrid";
import CTASection from "@/components/CTASection";
import { AREAS } from "@/data/filterOptions";
import { getPublishedResults } from "@/lib/store";
import { ResultsSearchParams, SortKey } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { areaSlug: string };
}): Promise<Metadata> {
  const area = AREAS.find((a) => a.slug === params.areaSlug);
  if (!area) return { title: "ページが見つかりません" };

  const title = `${area.label}の廃車・事故車・不動車の買取実績｜カーウェス`;
  const description = `カーウェスが${area.label}で実際に買い取った廃車・事故車・不動車の買取実績です。出張査定・引き取りも無料で対応しています。`;

  return {
    title,
    description,
    alternates: { canonical: `/area/${area.slug}` },
  };
}

export default async function AreaPage({
  params,
  searchParams,
}: {
  params: { areaSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const area = AREAS.find((a) => a.slug === params.areaSlug);
  if (!area) {
    notFound();
  }

  const allResults = await getPublishedResults();
  const results = allResults.filter((r) => r.areaSlug === area!.slug);
  const otherAreas = AREAS.filter((a) => a.slug !== area!.slug);

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
          { label: `${area!.label}の買取実績` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <h1 className="text-xl font-extrabold text-brand-text sm:text-2xl">
          {area!.label}の廃車・事故車・不動車の買取実績
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          カーウェスは{area!.label}
          エリアでの出張査定・引き取りに対応しています。ご自宅や駐車場までスタッフが伺い、
          その場で査定・お引き取りが可能です。立ち会いが難しい場合もご相談ください。
        </p>
      </div>

      <ResultGrid
        results={results}
        searchParams={normalized}
        basePath={`/area/${area!.slug}`}
      />

      <div className="mx-auto max-w-7xl px-4">
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-card">
          <h2 className="mb-2 text-sm font-bold text-brand-green-dark">
            出張査定・引き取り対応について
          </h2>
          <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
            {area!.label}
            内であれば、出張査定・車両の引き取りともに無料で対応しています。
            立ち会いが難しい場合や、鍵・車検証が手元にない場合でもご相談いただけますので、
            お気軽にお問い合わせください。
          </p>
        </section>

        <section className="mb-10 rounded-2xl bg-white p-6 shadow-card">
          <h2 className="mb-3 text-sm font-bold text-brand-green-dark">
            対応可能な周辺地域
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherAreas.map((a) => (
              <Link
                key={a.slug}
                href={`/area/${a.slug}`}
                className="rounded-full border border-brand-green px-3 py-1 text-xs font-bold text-brand-green-dark hover:bg-brand-bg"
              >
                {a.label}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <CTASection />
    </main>
  );
}

function toStr(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
