import { notFound } from "next/navigation";
import ResultForm from "@/components/admin/ResultForm";
import { getResultById } from "@/lib/store";
import { updateResultAction } from "@/lib/actions";

export default async function EditResultPage({
  params,
}: {
  params: { id: string };
}) {
  const result = await getResultById(params.id);
  if (!result) {
    notFound();
  }

  const action = updateResultAction.bind(null, result.id);

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-brand-text">
        買取実績を編集（管理番号：{result.managementNumber}）
      </h1>
      <ResultForm
        action={action}
        defaultValues={result}
        submitLabel="変更を保存する"
      />
    </div>
  );
}
