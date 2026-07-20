import Link from "next/link";
import { getAllResults } from "@/lib/store";
import { deleteResultAction } from "@/lib/actions";
import { formatDateJa, formatPrice } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminResultsListPage() {
  const results = [...(await getAllResults())].sort(
    (a, b) =>
      new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-brand-text">買取実績一覧</h1>
        <Link
          href="/admin/results/new"
          className="rounded-full bg-brand-green px-5 py-2 text-sm font-bold text-white hover:bg-brand-green-dark"
        >
          + 新規登録
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400">
              <th className="px-4 py-3 font-normal">管理番号</th>
              <th className="px-4 py-3 font-normal">車種</th>
              <th className="px-4 py-3 font-normal">買取価格</th>
              <th className="px-4 py-3 font-normal">買取日</th>
              <th className="px-4 py-3 font-normal">状態</th>
              <th className="px-4 py-3 font-normal">公開状態</th>
              <th className="px-4 py-3 font-normal text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 text-gray-500">
                  {r.managementNumber}
                </td>
                <td className="px-4 py-3 font-bold text-brand-text">
                  {r.maker} {r.carName}
                  <span className="ml-1 font-normal text-gray-400">
                    （{r.year}年）
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-brand-red">
                  {formatPrice(r.purchasePrice)}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {formatDateJa(r.purchaseDate)}
                </td>
                <td className="px-4 py-3 text-gray-500">{r.condition}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/results/${r.id}/edit`}
                      className="text-xs font-bold text-brand-green-dark hover:underline"
                    >
                      編集
                    </Link>
                    <form action={deleteResultAction.bind(null, r.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  まだ登録がありません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    published: {
      label: "公開",
      className: "bg-brand-green/10 text-brand-green-dark",
    },
    draft: { label: "下書き", className: "bg-gray-100 text-gray-500" },
    hidden: { label: "非公開", className: "bg-red-50 text-brand-red" },
  };
  const c = config[status] ?? { label: status, className: "bg-gray-100" };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${c.className}`}
    >
      {c.label}
    </span>
  );
}
