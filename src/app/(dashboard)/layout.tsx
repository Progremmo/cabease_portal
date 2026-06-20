import { Sidebar } from "@/components/layouts/Sidebar";
import { Header } from "@/components/layouts/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-50/50 dark:bg-zinc-950/20">
          {children}
        </main>
      </div>
    </div>
  );
}
