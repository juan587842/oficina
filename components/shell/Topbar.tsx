"use client";
import { Bell, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useSidebar } from "@/lib/sidebar-context";

export default function Topbar({ crumb }: { crumb: string }) {
  const router = useRouter();
  const { toggle } = useSidebar();

  async function sair() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div style={{
      height: 56,
      background: "var(--papel)",
      borderBottom: "2px solid var(--preto)",
      display: "flex", alignItems: "center",
      padding: "0 16px", gap: 12,
      position: "sticky", top: 0, zIndex: 10
    }}>
      <button onClick={toggle} className="hamburger-btn" aria-label="Abrir menu">
        <Menu size={22} />
      </button>

      <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "var(--graxa)", textTransform: "uppercase", letterSpacing: "0.06em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        CRM / <strong style={{ color: "var(--preto)" }}>{crumb}</strong>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <button aria-label="Notificações" style={{
          width: 36, height: 36, borderRadius: 2,
          background: "transparent", border: "2px solid var(--preto)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
        }}>
          <Bell size={16} />
        </button>
        <button className="btn xs secondary" onClick={sair}>Sair</button>
      </div>
    </div>
  );
}
