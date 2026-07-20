"use client";

import { useState } from "react";
import { SITE_CONFIG } from "@/lib/config";

export function DesktopNavBar() {
  return (
    <nav className="hidden w-full bg-brand-green md:block">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-3">
        {SITE_CONFIG.nav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="whitespace-nowrap text-sm font-bold text-white hover:text-brand-yellow"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function MobileNavTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-shrink-0 items-center gap-2 md:hidden">
      <a
        href={`tel:${SITE_CONFIG.phone}`}
        className="whitespace-nowrap rounded-md bg-brand-green px-3 py-2 text-sm font-bold text-white"
      >
        今すぐ電話査定
      </a>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="メニューを開く"
        className="flex flex-shrink-0 items-center justify-center px-1 text-brand-green-dark"
      >
        <span className="text-2xl leading-none">☰</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 flex w-4/5 max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b-2 border-brand-green px-4 py-3">
              <span className="text-base font-bold text-brand-text">
                メニュー
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="メニューを閉じる"
                className="text-2xl leading-none text-gray-500"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2 px-4 py-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="rounded-md bg-brand-green px-4 py-3 text-center"
              >
                <span className="block text-base font-bold text-white">
                  今すぐ電話で査定
                </span>
                <span className="block text-xs text-white/90">
                  通話無料 7:00〜22:00 年中無休
                </span>
              </a>
              <a
                href={SITE_CONFIG.assessmentUrl}
                className="rounded-md bg-brand-red px-4 py-3 text-center"
              >
                <span className="block text-base font-bold text-white">
                  簡単無料査定
                </span>
                <span className="block text-xs text-white/90">
                  最短15秒でできる！24時間可能！
                </span>
              </a>
            </div>

            <ul className="flex flex-col divide-y divide-gray-200 border-t border-gray-200">
              {SITE_CONFIG.nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-4 text-sm font-medium text-gray-800 hover:bg-brand-bg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
