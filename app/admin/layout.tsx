import AdminGuard from "@/components/admin/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = {
  title: "管理画面",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-brand-bg">
        <AdminNav />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </div>
    </AdminGuard>
  );
}
