import { AREAS, CONDITIONS, MAKERS } from "@/data/filterOptions";
import { PurchaseResult } from "@/types";

export default function ResultForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Partial<PurchaseResult>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Section title="基本情報">
        <Field label="管理番号" required>
          <input
            type="text"
            name="managementNumber"
            required
            defaultValue={defaultValues?.managementNumber}
            className="input"
            placeholder="例：017"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="メーカー" required>
            <select
              name="makerSlug"
              required
              defaultValue={defaultValues?.makerSlug}
              className="input"
            >
              <option value="">選択してください</option>
              {MAKERS.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="車種名" required>
            <input
              type="text"
              name="carName"
              required
              defaultValue={defaultValues?.carName}
              className="input"
              placeholder="例：プリウス"
            />
          </Field>
        </div>

        <Field label="グレード（任意）">
          <input
            type="text"
            name="grade"
            defaultValue={defaultValues?.grade}
            className="input"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="年式" required>
            <input
              type="number"
              name="year"
              required
              defaultValue={defaultValues?.year}
              className="input"
              placeholder="例：2015"
            />
          </Field>
          <Field label="走行距離（km）" required>
            <input
              type="number"
              name="mileage"
              required
              defaultValue={defaultValues?.mileage}
              className="input"
              placeholder="例：65000"
            />
          </Field>
        </div>
      </Section>

      <Section title="買取情報">
        <div className="grid grid-cols-2 gap-4">
          <Field label="買取価格（円）" required>
            <input
              type="number"
              name="purchasePrice"
              required
              defaultValue={defaultValues?.purchasePrice}
              className="input"
              placeholder="例：85000"
            />
          </Field>
          <Field label="買取日" required>
            <input
              type="date"
              name="purchaseDate"
              required
              defaultValue={defaultValues?.purchaseDate}
              className="input"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="買取地域" required>
            <select
              name="areaSlug"
              required
              defaultValue={defaultValues?.areaSlug}
              className="input"
            >
              <option value="">選択してください</option>
              {AREAS.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="車両状態" required>
            <select
              name="conditionSlug"
              required
              defaultValue={defaultValues?.conditionSlug}
              className="input"
            >
              <option value="">選択してください</option>
              {CONDITIONS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="メイン画像（任意・アップロード）">
          <div className="space-y-2">
            {defaultValues?.mainImageUrl && (
              <img
                src={defaultValues.mainImageUrl}
                alt="現在のメイン画像"
                className="h-24 w-32 rounded-lg border border-gray-200 object-cover"
              />
            )}
            <input
              type="file"
              name="mainImageFile"
              accept="image/*"
              className="input file:mr-3 file:rounded-full file:border-0 file:bg-brand-green file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-brand-green-dark"
            />
            <input
              type="hidden"
              name="currentMainImageUrl"
              value={defaultValues?.mainImageUrl ?? ""}
            />
            <p className="text-[11px] font-normal text-gray-400">
              画像を選ばなかった場合は、
              {defaultValues?.mainImageUrl
                ? "現在の画像がそのまま使われます。"
                : "プレースホルダー画像が使われます。"}
            </p>
          </div>
        </Field>
      </Section>

      <Section title="査定ポイント・公開設定">
        <Field label="査定ポイント（最低200文字程度推奨・空欄可）">
          <textarea
            name="assessmentPoint"
            rows={5}
            defaultValue={defaultValues?.assessmentPoint}
            className="input"
            placeholder="どのような状態で、なぜその価格になったのかを記載してください。"
          />
        </Field>

        <Field label="スタッフコメント（任意・社内用）">
          <textarea
            name="staffComment"
            rows={2}
            defaultValue={defaultValues?.staffComment}
            className="input"
          />
        </Field>

        <Field label="公開状態" required>
          <select
            name="status"
            required
            defaultValue={defaultValues?.status ?? "draft"}
            className="input"
          >
            <option value="draft">下書き</option>
            <option value="published">公開</option>
            <option value="hidden">非公開</option>
          </select>
        </Field>
      </Section>

      <button
        type="submit"
        className="rounded-full bg-brand-green px-8 py-3 text-sm font-bold text-white hover:bg-brand-green-dark"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card">
      <h2 className="mb-4 text-sm font-bold text-brand-green-dark">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-bold text-gray-600">
      {label}
      {required && <span className="ml-1 text-brand-red">必須</span>}
      <div className="mt-1 font-normal text-brand-text">{children}</div>
    </label>
  );
}
