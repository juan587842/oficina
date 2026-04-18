"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({
  children,
  counts,
  user,
  crumb
}: {
  children: React.ReactNode;
  counts: { os: number; clientes: number; veiculos: number };
  user: { nome: string; papel: string };
  crumb?: string;
}) {
  const [open, setOpen] = useState(false);

  // fecha drawer ao mudar de rota
  useEffect(() => { setOpen(false); }, []);

  return (
    <div className="app-shell">
      {/* Overlay mobile */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <div className={`sidebar-wrap${open ? " open" : ""}`}>
        <Sidebar counts={counts} user={user} onClose={() => setOpen(false)} />
      </div>

      <div className="shell-main">
        <Topbar crumb={crumb ?? "CRM"} onMenuClick={() => setOpen(o => !o)} />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
