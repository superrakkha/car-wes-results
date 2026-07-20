import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "新潟県の廃車・事故車・不動車の買取実績｜カーウェス",
    template: "%s｜カーウェス買取実績",
  },
  description:
    "カーウェスが新潟県内で実際に買い取った廃車・事故車・不動車・車検切れ車の買取価格や査定ポイントをご紹介します。査定・引き取り・廃車手続きは無料です。",
};

// ルートレイアウト。公開サイト用のヘッダー・固定CTAは app/(site)/layout.tsx 側に置き、
// 管理画面（/admin配下）には表示されないようにしている
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-sans">{children}</body>
    </html>
  );
}
