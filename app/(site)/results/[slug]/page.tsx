import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import BuyingFlow from "@/components/BuyingFlow";
import CTASection from "@/components/CTASection";
import ResultCard from "@/components/ResultCard";
import { getPublishedResults, getResultBySlug } from "@/lib/store";
import {
  formatDateJa,
  formatMileage,
  formatPrice,
  getRelatedResults,
} from "@/lib/utils";

// 車両データは管理画面からいつでも変わりうるため、
// このページはキャッシュせず常に最新の状態で描画する
export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const result = await getResultBySlug(params.slug);
  if (!result) {
    return { title: "繝壹・繧ｸ縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ" };
  }

  const title =
    result.seoTitle ??
    `${result.year}蟷ｴ蠑・{result.maker} ${result.carName}${result.condition}繧・{formatPrice(
      result.purchasePrice
    )}縺ｧ雋ｷ蜿厄ｽ・{result.city}・懊き繝ｼ繧ｦ繧ｧ繧ｹ`;
  const description =
    result.metaDescription ??
    (result.assessmentPoint
      ? result.assessmentPoint.slice(0, 120)
      : `${result.city}縺ｧ雋ｷ縺・叙縺｣縺・{result.year}蟷ｴ蠑・{result.maker} ${result.carName}縺ｮ雋ｷ蜿門ｮ溽ｸｾ縺ｧ縺吶りｲｷ蜿紋ｾ｡譬ｼ縺ｯ${formatPrice(
          result.purchasePrice
        )}縺ｧ縺励◆縲Ａ);

  return {
    title,
    description,
    alternates: {
      canonical: `/results/${result.slug}`,
    },
  };
}

export default async function ResultDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const result = await getResultBySlug(params.slug);
  if (!result) {
    notFound();
  }

  const allResults = await getPublishedResults();
  const related = getRelatedResults(result!, allResults, 4);

  const breadcrumbItems = [
    { label: "繝帙・繝", href: "/" },
    { label: "雋ｷ蜿門ｮ溽ｸｾ", href: "/" },
    { label: `${result.maker} ${result.carName}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${result.maker} ${result.carName}・・{result.year}蟷ｴ蠑擾ｼ峨・雋ｷ蜿門ｮ溽ｸｾ`,
    datePublished: result.purchaseDate,
    articleBody: result.assessmentPoint || undefined,
    about: {
      "@type": "Product",
      name: `${result.maker} ${result.carName}`,
      vehicleModelDate: String(result.year),
    },
  };

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 pb-12">
        {/* 荳企Κ・壹Γ繧､繝ｳ逕ｻ蜒上・霆顔ｨｮ蜷阪・雋ｷ蜿紋ｾ｡譬ｼ */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-bg shadow-card">
            <Image
              src={result.mainImageUrl}
              alt={`${result.city}縺ｧ雋ｷ縺・叙縺｣縺・{result.year}蟷ｴ蠑・{result.maker} ${result.carName}${result.condition}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <span className="absolute left-3 top-3 rounded-full bg-brand-green-dark px-3 py-1 text-xs font-bold text-white">
              {result.condition}
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-extrabold text-brand-text sm:text-2xl">
              {result.maker} {result.carName}
              {result.grade && (
                <span className="ml-1 text-base font-bold text-gray-400">
                  {result.grade}
                </span>
              )}
            </h1>

            <div className="mt-4">
              <span className="text-xs text-gray-500">雋ｷ蜿紋ｾ｡譬ｼ</span>
              <p className="text-4xl font-extrabold text-brand-red">
                {formatPrice(result.purchasePrice)}
              </p>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
              <dt className="text-gray-400">雋ｷ蜿門慍蝓・/dt>
              <dd>
                {result.prefecture}
                {result.city}
              </dd>
              <dt className="text-gray-400">雋ｷ蜿匁律</dt>
              <dd>{formatDateJa(result.purchaseDate)}</dd>
              <dt className="text-gray-400">蟷ｴ蠑・/dt>
              <dd>{result.year}蟷ｴ</dd>
              <dt className="text-gray-400">襍ｰ陦瑚ｷ晞屬</dt>
              <dd>{formatMileage(result.mileage, result.mileageUnknown)}</dd>
            </dl>
          </div>
        </div>

        {/* 霆贋ｸ｡諠・ｱ繝・・繝悶Ν */}
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-brand-text">霆贋ｸ｡諠・ｱ</h2>
          <div className="overflow-hidden rounded-2xl bg-white shadow-card">
            <dl className="divide-y divide-gray-100 text-sm">
              <InfoRow label="繝｡繝ｼ繧ｫ繝ｼ" value={result.maker} />
              <InfoRow label="霆顔ｨｮ蜷・ value={result.carName} />
              {result.grade && <InfoRow label="繧ｰ繝ｬ繝ｼ繝・ value={result.grade} />}
              {result.modelCode && (
                <InfoRow label="蝙句ｼ・ value={result.modelCode} />
              )}
              <InfoRow label="蟷ｴ蠑・ value={`${result.year}蟷ｴ`} />
              <InfoRow
                label="襍ｰ陦瑚ｷ晞屬"
                value={formatMileage(result.mileage, result.mileageUnknown)}
              />
              {result.inspectionStatus && (
                <InfoRow label="霆頑､懊・譛臥┌" value={result.inspectionStatus} />
              )}
              {result.driveType && (
                <InfoRow label="鬧・虚譁ｹ蠑・ value={result.driveType} />
              )}
              {result.fuelType && (
                <InfoRow label="辯・侭" value={result.fuelType} />
              )}
              {result.bodyColor && (
                <InfoRow label="霆贋ｽ楢牡" value={result.bodyColor} />
              )}
              <InfoRow
                label="雋ｷ蜿門慍蝓・
                value={`${result.prefecture}${result.city}`}
              />
              <InfoRow label="雋ｷ蜿匁律" value={formatDateJa(result.purchaseDate)} />
              <InfoRow label="霆贋ｸ｡迥ｶ諷・ value={result.condition} />
            </dl>
          </div>
        </section>

        {/* 譟ｻ螳壹・繧､繝ｳ繝・*/}
        {result.assessmentPoint && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-brand-text">
              譟ｻ螳壹・繧､繝ｳ繝・            </h2>
            <div className="whitespace-pre-line rounded-2xl bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-card">
              {result.assessmentPoint}
            </div>
          </section>
        )}

        {/* 騾比ｸｭCTA */}
        <div className="mt-10">
          <CTASection />
        </div>

        {/* 雋ｷ蜿悶∪縺ｧ縺ｮ豬√ｌ */}
        <div className="mt-10">
          <BuyingFlow />
        </div>

        {/* 髢｢騾｣螳溽ｸｾ */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-brand-text">
              髢｢騾｣縺吶ｋ雋ｷ蜿門ｮ溽ｸｾ
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <ResultCard key={r.id} result={r} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 譛蠕後・CTA */}
      <CTASection />
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 px-5 py-3">
      <dt className="col-span-1 text-gray-400">{label}</dt>
      <dd className="col-span-2 font-bold text-brand-text">{value}</dd>
    </div>
  );
}
