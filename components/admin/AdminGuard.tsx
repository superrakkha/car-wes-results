"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const STORAGE_KEY = "cw_admin_authed";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // ログインページ自体はガードしない（無限リダイレクト防止）
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }

    const authed = window.localStorage.getItem(STORAGE_KEY) === "1";
    if (!authed) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-400">
        確認中...
      </div>
    );
  }

  return <>{children}</>;
}
