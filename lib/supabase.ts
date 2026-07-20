import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  // ビルド時ではなく実行時にわかりやすく気づけるように警告を出す
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL または NEXT_PUBLIC_SUPABASE_ANON_KEY が設定されていません。.env.local を確認してください。"
  );
}

// 公開サイト側（誰でもアクセスできる場所）で使うクライアント。
// RLSにより status = 'published' の行しか読めない
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

// 管理画面（サーバー側の処理でのみ使用）用クライアント。
// service_role キーはRLSを無視して全操作できるため、
// 絶対にクライアントコンポーネントやブラウザに公開しないこと。
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey || supabaseAnonKey,
  {
    auth: { persistSession: false },
  }
);
