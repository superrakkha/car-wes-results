const FLOW_STEPS: {
  title: string;
  description: string;
  icon: "phone" | "camera" | "price" | "calendar" | "truck" | "document";
}[] = [
  {
    title: "お問い合わせ",
    description: "お電話またはWEBフォームで、車の状態をお気軽にご相談ください。",
    icon: "phone",
  },
  {
    title: "車両情報と写真を確認",
    description: "車種・年式・走行距離・写真をもとに、大まかな査定額をご案内します。",
    icon: "camera",
  },
  {
    title: "査定金額を提示",
    description: "実際の状態を確認したうえで、正式な買取価格をご提示します。",
    icon: "price",
  },
  {
    title: "引き取り日を決定",
    description: "ご都合の良い日時で、引き取りのスケジュールを調整します。",
    icon: "calendar",
  },
  {
    title: "車両を無料引き取り",
    description: "レッカーやスタッフが指定の場所まで、無料で車両を引き取りに伺います。",
    icon: "truck",
  },
  {
    title: "廃車手続きを代行",
    description: "抹消登録などの廃車手続きは、当社が無料で代行します。",
    icon: "document",
  },
];

export default function BuyingFlow() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-brand-text">
        買取までの流れ
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {FLOW_STEPS.map((step, index) => (
          <div
            key={step.title}
            className="overflow-hidden rounded-2xl bg-white shadow-card"
          >
            <div className="relative aspect-[4/3] w-full bg-brand-bg">
              <FlowIcon kind={step.icon} />
              <span className="absolute left-2 top-2 rounded-full bg-brand-green px-2.5 py-1 text-[10px] font-bold text-white sm:text-xs">
                ステップ{index + 1}
              </span>
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-xs font-bold text-brand-text sm:text-sm">
                {step.title}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-gray-500 sm:text-xs">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 写真の代わりに使う、シンプルな自作イラスト（ステップの内容がひと目でわかる程度のもの）
function FlowIcon({ kind }: { kind: (typeof FLOW_STEPS)[number]["icon"] }) {
  return (
    <svg
      viewBox="0 0 120 90"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {kind === "phone" && (
        <g>
          <rect x="45" y="20" width="30" height="50" rx="6" fill="#0AA33B" />
          <rect x="50" y="27" width="20" height="32" rx="2" fill="#F7F8FA" />
          <circle cx="60" cy="63" r="2.5" fill="#F7F8FA" />
        </g>
      )}
      {kind === "camera" && (
        <g>
          <rect x="30" y="32" width="60" height="38" rx="6" fill="#087F30" />
          <rect x="48" y="22" width="24" height="12" rx="3" fill="#087F30" />
          <circle cx="60" cy="52" r="13" fill="#F7F8FA" />
          <circle cx="60" cy="52" r="7" fill="#0AA33B" />
        </g>
      )}
      {kind === "price" && (
        <g>
          <path
            d="M35 45 L60 25 L85 45 L85 65 Q85 68 82 68 L38 68 Q35 68 35 65 Z"
            fill="#0AA33B"
          />
          <circle cx="60" cy="48" r="11" fill="#F7F8FA" />
          <text
            x="60"
            y="52"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#087F30"
          >
            ¥
          </text>
        </g>
      )}
      {kind === "calendar" && (
        <g>
          <rect x="32" y="28" width="56" height="42" rx="5" fill="#0AA33B" />
          <rect x="32" y="28" width="56" height="12" rx="5" fill="#087F30" />
          <rect x="42" y="48" width="8" height="8" fill="#F7F8FA" />
          <rect x="56" y="48" width="8" height="8" fill="#F7F8FA" />
          <rect x="70" y="48" width="8" height="8" fill="#F7F8FA" />
        </g>
      )}
      {kind === "truck" && (
        <g>
          <rect x="24" y="46" width="42" height="16" rx="2" fill="#087F30" />
          <path d="M66 50 L84 50 L92 58 L92 62 L66 62 Z" fill="#0AA33B" />
          <circle cx="38" cy="66" r="6" fill="#222222" />
          <circle cx="80" cy="66" r="6" fill="#222222" />
        </g>
      )}
      {kind === "document" && (
        <g>
          <rect x="38" y="20" width="44" height="54" rx="4" fill="#F7F8FA" />
          <rect
            x="38"
            y="20"
            width="44"
            height="54"
            rx="4"
            fill="none"
            stroke="#0AA33B"
            strokeWidth="2"
          />
          <line x1="46" y1="32" x2="74" y2="32" stroke="#0AA33B" strokeWidth="3" />
          <line x1="46" y1="42" x2="74" y2="42" stroke="#0AA33B" strokeWidth="3" />
          <line x1="46" y1="52" x2="64" y2="52" stroke="#0AA33B" strokeWidth="3" />
          <path
            d="M48 64 q6 -8 12 0 q6 -8 12 0"
            fill="none"
            stroke="#087F30"
            strokeWidth="2.5"
          />
        </g>
      )}
    </svg>
  );
}
