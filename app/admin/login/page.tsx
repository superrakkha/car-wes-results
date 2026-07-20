"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE_CONFIG } from "@/lib/config";

const STORAGE_KEY = "cw_admin_authed";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === SITE_CONFIG.adminPassword) {
      window.localStorage.setItem(STORAGE_KEY, "1");
      router.push("/admin");
    } else {
      setError("パスワードが違います");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card"
      >
        <h1 className="mb-1 text-center text-lg font-bold text-brand-text">
          管理者ログイン
        </h1>
        <p className="mb-6 text-center text-xs text-gray-400">
          カーウェス買取実績サイト
        </p>

        <label className="mb-4 block text-xs font-bold text-gray-600">
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="input mt-1"
          />
        </label>

        {error && (
          <p className="mb-4 text-xs font-bold text-brand-red">{error}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-full bg-brand-green py-2.5 text-sm font-bold text-white hover:bg-brand-green-dark"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
