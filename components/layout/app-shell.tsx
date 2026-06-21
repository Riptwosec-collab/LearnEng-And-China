import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="min-w-0 flex-1 pb-24 lg:pb-0">
        <Topbar />
        <main className="mx-auto w-full max-w-7xl p-4 lg:p-8">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
