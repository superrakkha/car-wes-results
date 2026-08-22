import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import BuyingFlow from "@/components/BuyingFlow";
import CarsReferenceLink from "@/components/CarsReferenceLink";
import ResultAssessmentCTA from "@/components/ResultAssessmentCTA";
import ResultCard from "@/components/ResultCard";
import { findCarsReference } from "@/lib/cars";
import { getPublishedResults, getResultBySlug } from "@/lib/store";
import {
  formatDateJa,
  formatMileage,
  formatPrice,
  getRelatedResults,
} from "@/lib/utils";

// 車両データは管理画面からいつでも変わりうるが、毎回作り直すと遅くなるため、
// 60秒だけキャッシュしてそこそこ速く保つ（管理画面からの変更はrevalidatePathで即反映される）
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const result = await getResultBySlug(params.slug);
  if (!result) {
    return { title: "ページが見つかりません" };
  }

  const title =
    result.seoTitle ??
    `${result.year}年式${result.maker} ${result.carName}${result.condition}を${formatPrice(
      result.purchasePrice
    )}で買取｜${result.city}｜カーウェス`;
  const description =
    result.metaDescription ??
    (result.assessmentPoint
      ? result.assessmentPoint.slice(0, 120)
      : `${result.city}で買い取った${result.year}年式${result.maker} ${result.carName}の買取実績です。買取価格は${formatPrice(
          result.purchasePrice
        )}でした。`);

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
  const carsReference = await findCarsReference(result!);

  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "買取実績", href: "/" },
    { label: `${result!.maker} ${result!.carName}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${result!.maker} ${result!.carName}（${result!.year}年式）の買取実績`,
    datePublished: result!.purchaseDate,
    articleBody: result!.assessmentPoint || undefined,
    about: {
      "@type": "Product",
      name: `${result!.maker} ${result!.carName}`,
      vehicleModelDate: String(result!.year),
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
        {/* 上部：メイン画像・車種名・買取価格 */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-bg shadow-card">
            <Image
              src={result!.mainImageUrl}
              alt={`${result!.city}で買い取った${result!.year}年式${result!.maker} ${result!.carName}${result!.condition}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <span className="absolute left-3 top-3 rounded-full bg-brand-green-dark px-3 py-1 text-xs font-bold text-white">
              {result!.condition}
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-extrabold text-brand-text sm:text-2xl">
              {result!.maker} {result!.carName}
              {result!.grade && (
                <span className="ml-1 text-base font-bold text-gray-400">
                  {result!.grade}
                </span>
              )}
            </h1>

            <div className="mt-4">
              <span className="text-xs text-gray-500">買取価格</span>
              <p className="text-4xl font-extrabold text-brand-red">
                {formatPrice(result!.purchasePrice)}
              </p>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
              <dt className="text-gray-400">買取地域</dt>
              <dd>
                {result!.prefecture}
                {result!.city}
              </dd>
              <dt className="text-gray-400">買取日</dt>
              <dd>{formatDateJa(result!.purchaseDate)}</dd>
              <dt className="text-gray-400">年式</dt>
              <dd>{result!.year}年</dd>
              <dt className="text-gray-400">走行距離</dt>
              <dd>{formatMileage(result!.mileage, result!.mileageUnknown)}</dd>
            </dl>

            {/* CTA①：買取価格のすぐ下（最重要CVポイント） */}
            <ResultAssessmentCTA result={result!} variant="price" />
          </div>
        </div>

        {/* 車両情報テーブル */}
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-brand-text">車両情報</h2>
          <div className="overflow-hidden rounded-2xl bg-white shadow-card">
            <dl className="divide-y divide-gray-100 text-sm">
              <InfoRow label="メーカー" value={result!.maker} />
              <InfoRow label="車種名" value={result!.carName} />
              {result!.grade && <InfoRow label="グレード" value={result!.grade} />}
              {result!.modelCode && (
                <InfoRow label="型式" value={result!.modelCode} />
              )}
              <InfoRow label="年式" value={`${result!.year}年`} />
              <InfoRow
                label="走行距離"
                value={formatMileage(result!.mileage, result!.mileageUnknown)}
              />
              {result!.inspectionStatus && (
                <InfoRow label="車検の有無" value={result!.inspectionStatus} />
              )}
              {result!.driveType && (
                <InfoRow label="駆動方式" value={result!.driveType} />
              )}
              {result!.fuelType && (
                <InfoRow label="燃料" value={result!.fuelType} />
              )}
              {result!.bodyColor && (
                <InfoRow label="車体色" value={result!.bodyColor} />
              )}
              <InfoRow
                label="買取地域"
                value={`${result!.prefecture}${result!.city}`}
              />
              <InfoRow label="買取日" value={formatDateJa(result!.purchaseDate)} />
              <InfoRow label="車両状態" value={result!.condition} />
            </dl>
          </div>
        </section>

        {/* 査定ポイント */}
        {result!.assessmentPoint && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-brand-text">
              査定ポイント
            </h2>
            <div className="whitespace-pre-line rounded-2xl bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-card">
              {result!.assessmentPoint}
            </div>
          </section>
        )}

        {/* この車種の買取相場（cars.ka-wes.com）への関連情報リンク。存在確認が取れた場合のみ表示 */}
        {carsReference && (
          <div className="mt-6">
            <CarsReferenceLink url={carsReference.url} carName={result!.carName} />
          </div>
        )}

        {/* 買取までの流れ */}
        <div className="mt-10">
          <BuyingFlow />
        </div>

        {/* 関連実績 */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-brand-text">
              関連する買取実績
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <ResultCard key={r.id} result={r} />
              ))}
            </div>
          </section>
        )}

        {/* CTA②：ページ最下部 */}
        <div className="mt-10">
          <ResultAssessmentCTA result={result!} variant="bottom" />
        </div>
      </div>
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
