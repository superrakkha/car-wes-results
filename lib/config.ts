// サイト共通の設定値
// リンク先や電話番号はここで一元管理し、あとから変更しやすくする
// 2026-07-20時点でメインサイト（ka-wes.com）で実際に使われているリンク・電話番号に合わせている
export const SITE_CONFIG = {
  siteName: "カーウェス 買取実績",
  mainSiteUrl: "https://www.ka-wes.com",
  // 無料査定フォームへのリンク（メインサイトのトップ＝査定フォームへの導線）
  assessmentUrl: "https://ka-wes.com",
  phone: "0120823320",
  phoneDisplay: "0120-823-320",
  lineUrl: "https://line.me/R/ti/p/@080gspcs?ts=05122306&oat_content=url",
  nav: [
    { label: "無料査定", href: "https://ka-wes.com" },
    { label: "山形県買取情報", href: "https://www.ka-wes.com/yamagata" },
    {
      label: "廃車手続き代行に必要な書類",
      href: "https://www.ka-wes.com/haisya-document",
    },
    { label: "廃車買取の流れ", href: "https://www.ka-wes.com/flow-car" },
    { label: "買取実績", href: "https://www.ka-wes.com/purchase-results" },
    { label: "お得な情報", href: "https://www.ka-wes.com/blog" },
    { label: "会社概要", href: "https://www.ka-wes.com/company" },
  ],
  badges: ["通話無料", "現金手渡し", "24時間対応中"],
  resultsPerPage: 24,
  // 管理画面の簡易パスワード（Supabase Auth接続までの仮のもの。必ず変更してください）
  adminPassword: "carwes2026",
} as const;
