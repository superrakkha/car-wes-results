import Image from "next/image";
import Link from "next/link";
import { PurchaseResult } from "@/types";
import { formatDateJa, formatMileage, formatPrice } from "@/lib/utils";

export default function ResultCard({ result }: { result: PurchaseResult }) {
  return (
    <Link
      href={`/results/${result.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] w-full bg-brand-bg">
        <Image
          src={result.mainImageUrl}
          alt={`${result.city}で買い取った${result.year}年式${result.maker} ${result.carName}${result.condition}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        <span className="absolute left-2 top-2 rounded-full bg-brand-green-dark px-2.5 py-1 text-[11px] font-bold text-white">
          {result.condition}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <span className="text-[11px] text-gray-500">買取価格</span>
          <p className="text-2xl font-extrabold text-brand-red">
            {formatPrice(result.purchasePrice)}
          </p>
        </div>

        <h3 className="text-sm font-bold text-brand-text">
          {result.maker} {result.carName}
        </h3>

        <dl className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs text-gray-600">
          <dt className="text-gray-400">年式</dt>
          <dd>{result.year}年</dd>
          <dt className="text-gray-400">走行距離</dt>
          <dd>{formatMileage(result.mileage, result.mileageUnknown)}</dd>
          <dt className="text-gray-400">買取日</dt>
          <dd>{formatDateJa(result.purchaseDate)}</dd>
          <dt className="text-gray-400">買取地域</dt>
          <dd>
            {result.prefecture}
            {result.city}
          </dd>
        </dl>

        {result.assessmentPoint && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
            {result.assessmentPoint}
          </p>
        )}

        <span className="mt-auto pt-2 text-right text-xs font-bold text-brand-green-dark group-hover:underline">
          詳しい買取内容を見る ＞
        </span>
      </div>
    </Link>
  );
}
