"use client";
import { Bell, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Topbar({ crumb }: { crumb: string }) {
  const router = useRouter();

  async function sair() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div style={{
      height: 64, background: "var(--papel)",
      borderBottom: "2px solid var(--preto)",
      display: "flex", alignItems: "center",
      padding: "0 24px", gap: 16,
      position: "sticky", top: 0, zIndex: 10
    }}>
      <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "var(--graxa)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        CRM / <strong style={{ color: "var(--preto)" }}>{crumb}</strong>
      </div>

      <div style={{ flex: 1, maxWidth: 400, marginLeft: 24, position: "relative" }}>
        <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--graxa)" }} />
        <input className="field" placeholder="Buscar cliente, placa, OS…" style={{ paddingLeft: 38 }} />
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        <button aria-label="Notificações" style={{
          width: 40, height: 40, borderRadius: 2,
          background: "transparent", border: "2px solid var(--preto)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
        }}>
          <Bell size={18} />
        </button>
        <button className="btn xs secondary" onClick={sair}>Sair</button>
      </div>
    </div>
  );
}
