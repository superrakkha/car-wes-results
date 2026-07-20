"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AREAS, CONDITIONS, MAKERS, SORT_OPTIONS } from "@/data/filterOptions";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");

  // 現在のクエリを引き継ぎつつ、指定したキーだけ更新する
  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // フィルターや並び替えを変えたらページ番号はリセットする
    if (key !== "page") {
      params.delete("page");
    }
    router.push(`/?${params.toString()}`);
  }

  function handleKeywordSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParam("keyword", keyword.trim());
  }

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="rounded-2xl bg-white p-4 shadow-card sm:p-5">
        {/* モバイルの折りたたみボタン */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="flex w-full items-center justify-between text-sm font-bold text-brand-text sm:hidden"
          aria-expanded={isOpen}
        >
          絞り込み・並び替え
          <span>{isOpen ? "－" : "＋"}</span>
        </button>

        <div className={`${isOpen ? "mt-4 block" : "hidden"} sm:mt-0 sm:block`}>
          {/* キーワード検索 */}
          <form onSubmit={handleKeywordSubmit} className="flex gap-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="車種名・メーカー・地域で検索"
              className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brand-green px-4 py-2 text-sm font-bold text-white hover:bg-brand-green-dark"
            >
              検索
            </button>
          </form>

          {/* セレクト絞り込み */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <FilterSelect
              label="状態別"
              value={searchParams.get("condition") ?? ""}
              onChange={(v) => updateParam("condition", v)}
              options={CONDITIONS.map((c) => ({ label: c.label, value: c.slug }))}
            />
            <FilterSelect
              label="地域別"
              value={searchParams.get("area") ?? ""}
              onChange={(v) => updateParam("area", v)}
              options={AREAS.map((a) => ({ label: a.label, value: a.slug }))}
            />
            <FilterSelect
              label="メーカー別"
              value={searchParams.get("maker") ?? ""}
              onChange={(v) => updateParam("maker", v)}
              options={MAKERS.map((m) => ({ label: m.label, value: m.slug }))}
            />
            <FilterSelect
              label="並び替え"
              value={searchParams.get("sort") ?? "newest"}
              onChange={(v) => updateParam("sort", v)}
              options={SORT_OPTIONS}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="block text-xs text-gray-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm text-brand-text focus:border-brand-green focus:outline-none"
      >
        {label !== "並び替え" && <option value="">すべて</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
