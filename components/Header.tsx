import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";
import { DesktopNavBar, MobileNavTrigger } from "./NavMenu";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-6 md:py-4">
        {/* スマホ表示のタグライン（ロゴの上） */}
        <span className="block text-[11px] font-medium text-gray-500 md:hidden">
          新潟の廃車買取・事故車買取・中古車買取｜出張・査定・引き取り無料
        </span>

        <div className="mt-1 flex items-center justify-between gap-2 md:mt-0 md:flex-wrap md:gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/icon.jpg"
              alt="カーウェス"
              width={48}
              height={48}
              className="hidden h-12 w-12 rounded-full object-cover md:block"
              priority
            />
            <span className="flex flex-col">
              <span className="hidden text-xs font-medium text-gray-500 md:block">
                新潟の廃車買取・事故車買取・中古車買取｜出張・査定・引き取り無料
              </span>
              <span className="text-base font-bold text-brand-text md:text-xl">
                廃車買取のカーウェス
              </span>
            </span>
          </Link>

          {/* PC表示：バッジ＋電話番号 */}
          <div className="hidden flex-col items-end gap-2 md:flex">
            <div className="flex gap-2">
              {SITE_CONFIG.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-brand-green px-3 py-1 text-xs font-bold text-brand-green-dark"
                >
                  {badge}
                </span>
              ))}
            </div>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="text-2xl font-extrabold text-brand-green-dark hover:opacity-80"
            >
              📞 {SITE_CONFIG.phoneDisplay}
            </a>
          </div>

          {/* スマホ表示：電話ボタン＋ハンバーガーメニュー */}
          <MobileNavTrigger />
        </div>
      </div>

      {/* PC表示：全幅グリーンのナビ */}
      <DesktopNavBar />
    </header>
  );
}
