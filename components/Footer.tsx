import { SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t-4 border-brand-green bg-white px-6 py-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} {SITE_CONFIG.siteName}
    </footer>
  );
}
