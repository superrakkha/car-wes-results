import { buildAssessmentUrl } from "@/lib/utils";

export default function ResultsListCTA() {
  const assessmentUrl = buildAssessmentUrl({
    utmCampaign: "results_list_cta",
  });

  return (
    <section className="mx-auto max-w-7xl px-4 pb-4">
      <div className="rounded-2xl bg-white p-6 text-center shadow-card">
        <h2 className="text-base font-extrabold text-brand-text sm:text-lg">
          あなたの車も査定してみませんか？
        </h2>
        <a
          href={assessmentUrl}
          data-cta="result-assessment"
          data-cta-location="results-list"
          className="mt-4 inline-block rounded-full bg-brand-green px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-green-dark"
        >
          無料査定してみる
        </a>
      </div>
    </section>
  );
}
