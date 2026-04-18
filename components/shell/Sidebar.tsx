"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Truck, Calendar, Wallet, Settings } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, section: "Operação" },
  { href: "/os", label: "Ordens de Serviço", icon: FileText, section: "Operação" },
  { href: "/clientes", label: "Clientes", icon: Users, section: "Cadastros" },
  { href: "/veiculos", label: "Veículos", icon: Truck, section: "Cadastros" },
  { href: "/agenda", label: "Agenda", icon: Calendar, section: "Planejamento", disabled: true },
  { href: "/financeiro", label: "Financeiro", icon: Wallet, section: "Planejamento", disabled: true }
];

export default function Sidebar({
  counts,
  user
}: {
  counts: { os: number; clientes: number; veiculos: number };
  user: { nome: string; papel: string };
}) {
  const path = usePathname();
  const bySection: Record<string, typeof items> = {};
  items.forEach(i => { (bySection[i.section] ||= []).push(i); });

  function countFor(href: string) {
    if (href === "/os") return counts.os;
    if (href === "/clientes") return counts.clientes;
    if (href === "/veiculos") return counts.veiculos;
    return undefined;
  }

  return (
    <aside style={{
      background: "var(--preto)", color: "var(--papel)",
      borderRight: "3px solid var(--laranja)",
      display: "flex", flexDirection: "column",
      position: "sticky", top: 0, height: "100vh", width: 240
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 20px", borderBottom: "1px solid #3A3D43" }}>
        <img src="/assets/logo-mark.svg" alt="" style={{ width: 40, height: 40 }} />
        <div>
          <div style={{ fontFamily: "Oswald", fontWeight: 700, fontSize: 14, lineHeight: 1 }}>FABIO MECÂNICA</div>
          <div style={{ fontFamily: "Oswald", fontSize: 10, letterSpacing: "0.16em", color: "var(--laranja)", marginTop: 3 }}>DIESEL · CRM</div>
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: "auto", paddingBottom: 12 }}>
        {Object.entries(bySection).map(([sec, list]) => (
          <div key={sec}>
            <div style={{ fontFamily: "Oswald", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "#55585F", padding: "20px 20px 8px" }}>{sec}</div>
            {list.map(i => {
              const Icon = i.icon;
              const active = path?.startsWith(i.href);
              const n = countFor(i.href);
              const content = (
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 20px",
                  fontFamily: "Oswald", fontWeight: 600, fontSize: 13,
                  textTransform: "uppercase", letterSpacing: "0.06em",
                  color: i.disabled ? "#55585F" : active ? "var(--laranja)" : "#B8B6B0",
                  background: active ? "#1A1B1F" : "transparent",
                  borderLeft: `3px solid ${active ? "var(--laranja)" : "transparent"}`,
                  cursor: i.disabled ? "not-allowed" : "pointer"
                }}>
                  <Icon size={18} />
                  <span>{i.label}</span>
                  {typeof n === "number" && (
                    <span style={{
                      marginLeft: "auto", fontFamily: "JetBrains Mono", fontSize: 11,
                      padding: "2px 7px", borderRadius: 999,
                      background: active ? "var(--laranja)" : "#2A2D33",
                      color: active ? "var(--preto)" : "#B8B6B0"
                    }}>{n}</span>
                  )}
                </div>
              );
              return i.disabled
                ? <div key={i.href}>{content}</div>
                : <Link key={i.href} href={i.href as any} style={{ textDecoration: "none", border: 0 }}>{content}</Link>;
            })}
          </div>
        ))}
      </nav>

      <div style={{ marginTop: "auto", padding: "16px 20px", borderTop: "1px solid #3A3D43" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 4, background: "var(--laranja)",
            color: "var(--preto)", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Oswald", fontWeight: 700, fontSize: 14, border: "2px solid var(--preto)"
          }}>{user.nome.slice(0, 2).toUpperCase()}</div>
          <div>
            <div style={{ fontFamily: "Oswald", fontSize: 13, fontWeight: 600 }}>{user.nome}</div>
            <div style={{ fontSize: 11, color: "#B8B6B0", fontFamily: "JetBrains Mono", textTransform: "uppercase" }}>{user.papel}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
