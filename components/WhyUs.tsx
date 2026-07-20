const REASONS = [
  {
    title: "海外への独自販売ルート",
    description:
      "国内では値段がつきにくい過走行車や不動車も、海外での需要を見込んで査定するため、高価買取が可能です。",
  },
  {
    title: "部品単位での価値評価",
    description:
      "車体としての価値だけでなく、エンジンや使用可能な部品まで評価するため、事故車や故障車でも買取価格が付きやすくなっています。",
  },
  {
    title: "査定・引き取り・手続きがすべて無料",
    description:
      "出張査定、レッカーでの引き取り、廃車に必要な手続きまで、すべて無料で対応しています。余計な費用は一切かかりません。",
  },
  {
    title: "新潟県内での豊富な買取実績",
    description:
      "新潟市・新発田市・長岡市をはじめ、新潟県内全域での買取実績があり、地域ごとの相場や需要を踏まえた査定が可能です。",
  },
];

export default function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-xl font-extrabold text-brand-text sm:text-2xl">
        カーウェスが高く買い取れる理由
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {REASONS.map((reason) => (
          <div
            key={reason.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card"
          >
            <h3 className="text-sm font-bold text-brand-green-dark sm:text-base">
              {reason.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
