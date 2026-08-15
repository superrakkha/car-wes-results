import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Hero from "@/components/Hero";
import SearchFilter from "@/components/SearchFilter";
import ResultGrid from "@/components/ResultGrid";
import ResultsListCTA from "@/components/ResultsListCTA";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { getPublishedResults } from "@/lib/store";
import { ResultsSearchParams, SortKey } from "@/types";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const normalized: ResultsSearchParams = {
    keyword: toStr(searchParams.keyword),
    condition: toStr(searchParams.condition),
    area: toStr(searchParams.area),
    maker: toStr(searchParams.maker),
    sort: toStr(searchParams.sort) as SortKey | undefined,
    page: toStr(searchParams.page),
  };

  const results = await getPublishedResults();

  return (
    <main>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "買取実績" }]} />
      <Hero results={results} />
      <div className="py-6">
        <Suspense fallback={null}>
          <SearchFilter />
        </Suspense>
        <ResultGrid results={results} searchParams={normalized} />
        <ResultsListCTA />
      </div>
      <WhyUs />
      <FAQ />
      <CTASection />
    </main>
  );
}

function toStr(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
