import ResultForm from "@/components/admin/ResultForm";
import { createResultAction } from "@/lib/actions";

export default function NewResultPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-brand-text">
        新規買取実績登録
      </h1>
      <ResultForm action={createResultAction} submitLabel="登録する" />
    </div>
  );
}
