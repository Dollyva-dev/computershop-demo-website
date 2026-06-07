import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Portal | Dollyva",
  robots: "noindex, nofollow", // Prevent search engines from indexing the admin area
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We use a fixed full-screen layout to override the consumer site's scrolling behavior
    <div className="fixed inset-0 z-[100] flex bg-[#050505] text-slate-200 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-[#050505]">
        {children}
      </main>
    </div>
  );
}