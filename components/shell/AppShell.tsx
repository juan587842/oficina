"use client";
import { SidebarProvider, useSidebar } from "@/lib/sidebar-context";
import Sidebar from "./Sidebar";

function Shell({
  children,
  counts,
  user
}: {
  children: React.ReactNode;
  counts: { os: number; clientes: number; veiculos: number };
  user: { nome: string; papel: string };
}) {
  const { open, close } = useSidebar();

  return (
    <div className="app-shell">
      {open && <div className="sidebar-overlay" onClick={close} />}
      <div className={`sidebar-wrap${open ? " open" : ""}`}>
        <Sidebar counts={counts} user={user} onClose={close} />
      </div>
      <div className="shell-main">{children}</div>
    </div>
  );
}

export default function AppShell({
  children,
  counts,
  user
}: {
  children: React.ReactNode;
  counts: { os: number; clientes: number; veiculos: number };
  user: { nome: string; papel: string };
}) {
  return (
    <SidebarProvider>
      <Shell counts={counts} user={user}>{children}</Shell>
    </SidebarProvider>
  );
}
