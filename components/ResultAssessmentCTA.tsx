import { buildAssessmentUrl } from "@/lib/utils";
import { PurchaseResult } from "@/types";

export default function ResultAssessmentCTA({
  result,
  variant,
}: {
  result: PurchaseResult;
  variant: "price" | "bottom";
}) {
  const assessmentUrl = buildAssessmentUrl({
    maker: result.maker,
    model: result.carName,
    type: result.modelCode,
    utmCampaign: "result_cta",
  });

  const ctaLabel = `この${result.carName}を無料査定する`;

  if (variant === "price") {
    // 買取価格のすぐ下に置く、控えめなCTA（価格の存在感を邪魔しない）
    return (
      <div className="mt-4 rounded-xl border border-brand-green/40 bg-brand-bg px-4 py-3">
        <p className="text-xs font-bold text-brand-text">
          あなたの{result.carName}はいくら？
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
          年式・走行距離・車両状態によって査定額は変わります。まずは無料査定で現在の価格をご確認ください。
        </p>
        <a
          href={assessmentUrl}
          data-cta="result-assessment"
          data-cta-location="price"
          className="mt-3 inline-block rounded-full bg-brand-green px-5 py-2 text-xs font-bold text-white hover:bg-brand-green-dark sm:text-sm"
        >
          {ctaLabel}
        </a>
      </div>
    );
  }

  // ページ最下部：内容を読み終えたユーザー向けの、しっかりしたCTA
  return (
    <section className="rounded-2xl bg-brand-green-dark px-6 py-10 text-center">
      <h2 className="text-lg font-extrabold text-white sm:text-xl">
        あなたのお車も無料査定できます
      </h2>
      <p className="mt-2 text-xs text-white/85 sm:text-sm">
        事故車・不動車・車検切れ・過走行車も査定可能です。
      </p>
      <p className="mt-1 text-[11px] text-white/70 sm:text-xs">
        年式・走行距離・車両状態によって査定額は変わります。まずは無料査定で現在の価格をご確認ください。
      </p>
      <a
        href={assessmentUrl}
        data-cta="result-assessment"
        data-cta-location="bottom"
        className="mt-5 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-brand-green-dark hover:bg-brand-bg"
      >
        {ctaLabel}
      </a>
    </section>
  );
}
