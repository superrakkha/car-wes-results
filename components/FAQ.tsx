"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "動かない車でも買い取ってもらえますか？",
    answer:
      "はい、可能です。不動車やエンジンがかからない車も、部品や車体としての価値を評価して査定します。レッカーでの引き取りも無料です。",
  },
  {
    question: "事故車でも値段がつきますか？",
    answer:
      "事故車でも、走行機能や使用可能な部品の状態によって買取価格をお付けできます。まずは無料査定でご相談ください。",
  },
  {
    question: "査定や引き取りに費用はかかりますか？",
    answer:
      "査定・出張・引き取り・廃車手続きはすべて無料です。追加費用が発生することはありません。",
  },
  {
    question: "新潟県内であればどこでも対応可能ですか？",
    answer:
      "新潟市・新発田市・長岡市・三条市など、新潟県内全域に対応しています。詳しい対応エリアはお問い合わせください。",
  },
  {
    question: "買取実績に載っている金額は本当の査定額ですか？",
    answer:
      "はい、実際にお客様の車両を査定・買取させていただいた金額です。車両の状態は一台ごとに異なるため、正確な金額は無料査定でご確認ください。",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-xl font-extrabold text-brand-text sm:text-2xl">
        よくある質問
      </h2>
      <div className="mt-6 divide-y divide-gray-100 rounded-2xl bg-white shadow-card">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="px-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="text-sm font-bold text-brand-text sm:text-base">
                  Q. {item.question}
                </span>
                <span className="shrink-0 text-brand-green-dark">
                  {isOpen ? "－" : "＋"}
                </span>
              </button>
              {isOpen && (
                <p className="pb-4 text-xs leading-relaxed text-gray-600 sm:text-sm">
                  A. {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
