import Link from "next/link";
import { getAllResults } from "@/lib/store";
import { formatDateJa, formatPrice } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const results = await getAllResults();
  const now = new Date();

  const total = results.length;
  const published = results.filter((r) => r.status === "published").length;
  const draft = results.filter((r) => r.status === "draft").length;
  const thisMonthCount = results.filter((r) => {
    const d = new Date(r.purchaseDate);
    return (
      d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    );
  }).length;
  const maxPrice = results.reduce(
    (max, r) => Math.max(max, r.purchasePrice),
    0
  );

  const recent = [...results]
    .sort(
      (a, b) =>
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
    )
    .slice(0, 5);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-brand-text">管理画面トップ</h1>
        <Link
          href="/admin/results/new"
          className="rounded-full bg-brand-green px-5 py-2 text-sm font-bold text-white hover:bg-brand-green-dark"
        >
          + 新規登録
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard label="総登録台数" value={`${total}台`} />
        <StatCard label="公開中" value={`${published}台`} />
        <StatCard label="下書き" value={`${draft}台`} />
        <StatCard label="今月登録数" value={`${thisMonthCount}台`} />
        <StatCard label="最高買取価格" value={formatPrice(maxPrice)} accent />
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-card">
        <h2 className="mb-4 text-sm font-bold text-brand-green-dark">
          最近追加した実績
        </h2>
        <ul className="divide-y divide-gray-100">
          {recent.map((r) => (
            <li key={r.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-bold text-brand-text">
                  {r.maker} {r.carName}（{r.year}年）
                </p>
                <p className="text-xs text-gray-500">
                  {formatDateJa(r.purchaseDate)}・{r.city}・
                  <StatusLabel status={r.status} />
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-base font-bold text-brand-red">
                  {formatPrice(r.purchasePrice)}
                </span>
                <Link
                  href={`/admin/results/${r.id}/edit`}
                  className="text-xs font-bold text-brand-green-dark hover:underline"
                >
                  編集
                </Link>
              </div>
            </li>
          ))}
          {recent.length === 0 && (
            <li className="py-6 text-center text-sm text-gray-400">
              まだ登録がありません
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 text-center shadow-card">
      <p className="text-[11px] text-gray-500">{label}</p>
      <p
        className={`mt-1 text-lg font-extrabold ${
          accent ? "text-brand-red" : "text-brand-text"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusLabel({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: "公開",
    draft: "下書き",
    hidden: "非公開",
  };
  return <span>{map[status] ?? status}</span>;
}
