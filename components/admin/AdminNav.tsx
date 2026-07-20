"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const STORAGE_KEY = "cw_admin_authed";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  function handleLogout() {
    window.localStorage.removeItem(STORAGE_KEY);
    router.push("/admin/login");
  }

  return (
    <nav className="bg-brand-green-dark text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-wrap gap-4 text-sm font-bold">
          <Link href="/admin" className="hover:text-brand-yellow">
            管理画面トップ
          </Link>
          <Link href="/admin/results" className="hover:text-brand-yellow">
            買取実績一覧
          </Link>
          <Link href="/admin/results/new" className="hover:text-brand-yellow">
            + 新規登録
          </Link>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="text-xs font-bold text-white/80 underline underline-offset-2 hover:text-white"
        >
          ログアウト
        </button>
      </div>
    </nav>
  );
}
