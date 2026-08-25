/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // VercelのHobbyプランは画像最適化（自動リサイズ・WebP変換）の月間上限があり、
    // 超えると402エラーで画像が壊れてしまう。上限を気にせず確実に表示させるため、
    // 最適化機能そのものをオフにする（画像は元のサイズのまま表示される）。
    // ProプランにアップグレードしたらDeleteしてもOK。
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;