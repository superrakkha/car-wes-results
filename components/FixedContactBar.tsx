import { SITE_CONFIG } from "@/lib/config";

export default function FixedContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-brand-text px-3 py-2 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1.5">
              {SITE_CONFIG.badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className="rounded border border-white px-2 py-0.5 text-[10px] sm:text-xs"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="flex gap-1.5">
              <span className="rounded border border-white px-2 py-0.5 text-[10px] sm:text-xs">
                7:00〜22:00 年中無休
              </span>
            </div>
          </div>

          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex flex-col items-end justify-center leading-tight hover:text-brand-yellow"
          >
            <span className="text-[10px] text-white/80 sm:text-xs">
              電話ならそのまま査定額がわかる
            </span>
            <span className="text-2xl font-bold text-white sm:text-4xl">
              {SITE_CONFIG.phoneDisplay}
            </span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={SITE_CONFIG.assessmentUrl}
            className="rounded bg-brand-red px-2 py-2 text-center text-xs font-bold text-white hover:opacity-90 sm:text-sm"
          >
            今すぐWEBで無料査定
          </a>
          <a
            href={SITE_CONFIG.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-brand-green px-2 py-2 text-center text-xs font-bold text-white hover:bg-brand-green-dark sm:text-sm"
          >
            LINEで無料査定
          </a>
        </div>
      </div>
    </div>
  );
}
