import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const noStoreFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store" });

// 公開サイト側は「常に最新」より「そこそこ速い」を優先し、
// 60秒キャッシュ（この間はSupabaseへ問い合わせずキャッシュを返す）にする。
// 管理画面から追加・編集・削除した場合は revalidatePath() で即座に反映されるので、
// 実際に体感が遅れるのは「Supabaseダッシュボードで直接編集した場合」の最大60秒だけ。
const revalidatingFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, next: { revalidate: 60 } });

export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  global: { fetch: revalidatingFetch },
});

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey || supabaseAnonKey,
  { auth: { persistSession: false }, global: { fetch: noStoreFetch } }
);
