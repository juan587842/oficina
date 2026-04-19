import Link from "next/link";
import Topbar from "@/components/shell/Topbar";
import BuscaOS from "@/components/os/BuscaOS";
import { createClient } from "@/lib/supabase/server";
import { BRL, fmtData, statusLabel } from "@/lib/fmt";

export const dynamic = "force-dynamic";

const COLS = [
  { key: "aberta", label: "Abertas" },
  { key: "andamento", label: "Em andamento" },
  { key: "aguardando", label: "Aguardando peça" },
  { key: "concluida", label: "Concluídas" }
];

export default async function OrdensPage({ searchParams }: { searchParams: { q?: string } }) {
  const supabase = createClient();
  const q = (searchParams.q ?? "").trim();
  let query = supabase
    .from("ordens_servico")
    .select("num,status,problema,entrada,previsao,valor_total,urgente,placa,cliente_id,clientes(nome)")
    .in("status", ["aberta","andamento","aguardando","concluida"])
    .order("entrada", { ascending: false });
  if (q) {
    const like = `%${q}%`;
    query = query.or(`num.ilike.${like},placa.ilike.${like},cliente_id.ilike.${like},problema.ilike.${like}`);
  }
  const { data: ordens } = await query;

  const porStatus: Record<string, any[]> = { aberta: [], andamento: [], aguardando: [], concluida: [] };
  (ordens ?? []).forEach((o: any) => (porStatus[o.status] ||= []).push(o));

  return (
    <>
      <Topbar crumb="Ordens de Serviço" />
      <div className="page-pad">
        <div className="page-head-resp">
          <div>
            <div className="eyebrow">Operação</div>
            <h1 className="page-title" style={{ marginTop: 6 }}>Ordens de Serviço</h1>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--graxa)" }}>Fluxo da oficina em tempo real.</p>
          </div>
          <Link href="/os/nova" className="btn">+ Nova OS</Link>
        </div>

        <div style={{ margin: "14px 0 18px" }}>
          <BuscaOS />
          {q && (
            <div className="mono" style={{ fontSize: 11, color: "var(--graxa)", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {(ordens?.length ?? 0)} resultado(s) para “{q}”
            </div>
          )}
        </div>

        <div className="kanban-resp">
          {COLS.map(c => (
            <div key={c.key} style={{ background: "var(--papel-alt)", border: "2px solid var(--preto)", borderRadius: 4, minHeight: 400, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "10px 14px", borderBottom: "2px solid var(--preto)", background: "white", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "Oswald", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>{c.label}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--graxa)" }}>{porStatus[c.key]?.length ?? 0}</span>
              </div>
              <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 10 }}>
                {(porStatus[c.key] ?? []).map((o: any) => (
                  <Link key={o.num} href={`/os/${o.num}`} style={{
                    background: "white", border: "2px solid var(--preto)", borderRadius: 3,
                    boxShadow: "var(--shadow-sm)", padding: 12, textDecoration: "none", color: "var(--preto)",
                    borderLeft: o.urgente ? "4px solid var(--vermelho)" : "2px solid var(--preto)"
                  }}>
                    <div className="mono" style={{ fontSize: 11, color: "var(--graxa)", textTransform: "uppercase" }}>{o.num}</div>
                    <div style={{ fontFamily: "Oswald", fontWeight: 700, fontSize: 14, textTransform: "uppercase", margin: "4px 0 6px" }}>
                      {o.clientes?.nome ?? o.cliente_id}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--fg2)", marginBottom: 8 }}>
                      <span className="placa" style={{ fontSize: 10 }}>{o.placa}</span> · {o.problema}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid var(--border-soft)", fontSize: 12 }}>
                      <span className="mono" style={{ color: "var(--graxa)" }}>{fmtData(o.entrada)}</span>
                      <span className="mono" style={{ fontWeight: 700 }}>{BRL(o.valor_total)}</span>
                    </div>
                  </Link>
                ))}
                {(porStatus[c.key] ?? []).length === 0 && (
                  <div style={{ textAlign: "center", color: "var(--graxa)", fontSize: 12, padding: 20 }}>Vazio</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
