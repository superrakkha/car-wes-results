import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ResultGrid from "@/components/ResultGrid";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { MAKERS } from "@/data/filterOptions";
import { getPublishedResults } from "@/lib/store";
import { ResultsSearchParams, SortKey } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { makerSlug: string };
}): Promise<Metadata> {
  const maker = MAKERS.find((m) => m.slug === params.makerSlug);
  if (!maker) return { title: "ページが見つかりません" };

  const title = `${maker.label}車の廃車・事故車・中古車買取実績｜カーウェス`;
  const description = `カーウェスが新潟県内で買い取った${maker.label}車の買取実績一覧です。廃車・事故車・不動車も査定無料・引き取り無料でご相談いただけます。`;

  return {
    title,
    description,
    alternates: { canonical: `/maker/${maker.slug}` },
  };
}

export default async function MakerPage({
  params,
  searchParams,
}: {
  params: { makerSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const maker = MAKERS.find((m) => m.slug === params.makerSlug);
  if (!maker) {
    notFound();
  }

  const allResults = await getPublishedResults();
  const results = allResults.filter((r) => r.makerSlug === maker!.slug);

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
          { label: `${maker!.label}の買取実績` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <h1 className="text-xl font-extrabold text-brand-text sm:text-2xl">
          {maker!.label}車の廃車・事故車・中古車買取実績
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          カーウェスでは、新潟県内で{maker!.label}
          車の廃車・事故車・不動車・中古車の買取実績が多数あります。
          車検切れや過走行、修復歴のある車両でも、部品や海外需要を含めて査定するため、
          他社で断られた車両にも買取価格がつく場合があります。
        </p>
      </div>

      <ResultGrid
        results={results}
        searchParams={normalized}
        basePath={`/maker/${maker!.slug}`}
      />

      <div className="mx-auto max-w-7xl px-4">
        <section className="mb-10 rounded-2xl bg-white p-6 shadow-card">
          <h2 className="mb-2 text-sm font-bold text-brand-green-dark">
            {maker!.label}車の買取について
          </h2>
          <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
            {maker!.label}
            車は年式や走行距離、車両の状態によって買取価格が大きく変わります。
            国内での需要が少ない車両でも、海外への輸出ルートや部品としての価値を
            踏まえて査定できるケースがありますので、諦める前にまずは無料査定でご相談ください。
          </p>
        </section>
      </div>

      <FAQ />
      <CTASection />
    </main>
  );
}

function toStr(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
