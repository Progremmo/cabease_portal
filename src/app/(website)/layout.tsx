import { WebsiteNavbar } from "@/features/website/layout/WebsiteNavbar";
import { WebsiteFooter } from "@/features/website/layout/WebsiteFooter";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col selection:bg-primary/30">
      {/* Vibrant Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-normal opacity-70 translate-x-1/3 -translate-y-1/3 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-purple-500/15 dark:bg-purple-600/20 rounded-full blur-[100px] mix-blend-normal opacity-60 -translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] bg-primary/10 dark:bg-primary/15 rounded-full blur-[140px] mix-blend-normal opacity-50 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <WebsiteNavbar />
      <main className="flex-1 relative z-10">{children}</main>
      <WebsiteFooter />
    </div>
  );
}
