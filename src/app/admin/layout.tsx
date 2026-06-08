import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard"; // Adjust path if needed

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
    // Wrap the entire layout inside the Auth Guard
    <AdminAuthGuard>
      {/* We use a fixed full-screen layout to override the consumer site's scrolling behavior. */}
      {/* Added flex-col md:flex-row so the sidebar can safely collapse/stack on smaller screens. */}
      <div className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-[#050505] text-slate-200 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-[#050505] w-full md:w-auto">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}