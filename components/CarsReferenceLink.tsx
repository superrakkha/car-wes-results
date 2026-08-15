export default function CarsReferenceLink({
  url,
  carName,
}: {
  url: string;
  carName: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
      <p className="text-[11px] font-bold text-gray-400">
        {carName}の買取相場も確認できます
      </p>
      <p className="mt-0.5 text-[11px] leading-relaxed text-gray-400">
        この車種の年式・状態・走行距離別の参考価格を確認できます。
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        data-link="vehicle-price-reference"
        className="mt-2 inline-block text-xs font-bold text-brand-green-dark underline underline-offset-2 hover:text-brand-green"
      >
        {carName}の買取相場・参考価格を見る →
      </a>
    </div>
  );
}
