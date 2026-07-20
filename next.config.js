/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // Supabase Storageにアップロードした画像を next/image で表示できるようにする
        // "*.supabase.co" とすることで、プロジェクトごとに違うサブドメインにも対応する
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;
