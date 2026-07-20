"use client";

export default function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm("この買取実績を削除しますか？この操作は元に戻せません。")) {
          e.preventDefault();
        }
      }}
      className="text-xs font-bold text-brand-red hover:underline"
    >
      削除
    </button>
  );
}
