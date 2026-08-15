// サイト共通の設定値
export const SITE_CONFIG = {
  siteName: "カーウェス 買取実績",
  mainSiteUrl: "https://www.ka-wes.com",
  // 無料査定LP（haisya.ka-wes.com）への基本リンク。WEB査定系CTAはここに統一する
  assessmentUrl: "https://haisya.ka-wes.com/",
  phone: "0120823320",
  phoneDisplay: "0120-823-320",
  lineUrl: "https://line.me/R/ti/p/@080gspcs?ts=05122306&oat_content=url",
  nav: [
    { label: "無料査定", href: "https://www.ka-wes.com/" },
    { label: "山形県買取情報", href: "https://www.ka-wes.com/yamagata" },
    {
      label: "廃車手続きに必要な書類",
      href: "https://www.ka-wes.com/haisya-document",
    },
    { label: "車種別買取参考価格", href: "https://cars.ka-wes.com/" },
    { label: "買取実績", href: "https://results.ka-wes.com/" },
    { label: "廃車買取の流れ", href: "https://www.ka-wes.com/flow-car" },
    { label: "お得な情報", href: "https://www.ka-wes.com/blog" },
    { label: "会社概要", href: "https://www.ka-wes.com/company" },
  ],
  badges: ["通話無料", "現金手渡し", "24時間対応中"],
  resultsPerPage: 24,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://results.ka-wes.com",
  adminPassword: "carwes2026",
} as const;
