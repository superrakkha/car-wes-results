import { SITE_CONFIG } from "@/lib/config";
import { buildAssessmentUrl } from "@/lib/utils";

export default function CTASection({
  campaign = "site_cta",
}: {
  // GA4等で流入元を分析するためのUTMキャンペーン名。配置場所ごとに変える
  campaign?: string;
}) {
  const assessmentUrl = buildAssessmentUrl({ utmCampaign: campaign });

  return (
    <section className="bg-brand-green-dark">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">
          あなたの車も無料査定します
        </h2>
        <p className="mt-2 text-sm text-white/85">
          廃車・事故車・不動車・低年式車も、まずはお気軽にご相談ください。
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SITE_CONFIG.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="line-assessment"
            data-cta-location={campaign}
            className="w-full max-w-xs rounded-full bg-[#06C755] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90 sm:w-auto"
          >
            LINEで無料査定
          </a>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            data-cta="phone-assessment"
            data-cta-location={campaign}
            className="w-full max-w-xs rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-text transition hover:opacity-90 sm:w-auto"
          >
            電話で無料相談 {SITE_CONFIG.phoneDisplay}
          </a>
          <a
            href={assessmentUrl}
            data-cta="result-assessment"
            data-cta-location={campaign}
            className="w-full max-w-xs rounded-full border-2 border-white px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-brand-green-dark sm:w-auto"
          >
            査定フォームへ
          </a>
        </div>

        <a
          href={SITE_CONFIG.mainSiteUrl}
          className="mt-6 inline-block text-xs text-white/80 underline underline-offset-2"
        >
          メインサイトへ戻る
        </a>
      </div>
    </section>
  );
}
