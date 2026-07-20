import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedContactBar from "@/components/FixedContactBar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      {/* pb-28: 下部固定バー（FixedContactBar）に本文が隠れないための余白 */}
      <main className="flex-1 pb-28">{children}</main>
      <Footer />
      <FixedContactBar />
    </div>
  );
}
