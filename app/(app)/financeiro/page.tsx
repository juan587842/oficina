import { createClient } from "@/lib/supabase/server";
import Topbar from "@/components/shell/Topbar";
import Link from "next/link";
import { BRL, fmtData, statusLabel } from "@/lib/fmt";

export const dynamic = "force-dynamic";

export default async function FinanceiroPage() {
  const supabase = createClient();

  const hoje = new Date();
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const inicioMesAnt = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
  const fimMesAnt = new Date(hoje.getFullYear(), hoje.getMonth(), 0);

  const [
    { data: faturadas },
    { data: faturadasAnt },
    { data: aReceber },
    { data: recentes },
    { data: mensais }
  ] = await Promise.all([
    supabase.from("ordens_servico").select("valor_total").eq("status", "faturada").gte("conclusao", inicioMes.toISOString()),
    supabase.from("ordens_servico").select("valor_total").eq("status", "faturada").gte("conclusao", inicioMesAnt.toISOString()).lte("conclusao", fimMesAnt.toISOString()),
    supabase.from("ordens_servico").select("num,valor_total,placa,clientes(nome),conclusao").eq("status", "concluida").order("conclusao", { ascending: false }),
    supabase.from("ordens_servico").select("num,status,valor_total,placa,clientes(nome),conclusao,forma_pagamento").eq("status", "faturada").order("conclusao", { ascending: false }).limit(20),
    supabase.from("ordens_servico").select("conclusao,valor_total").eq("status", "faturada").gte("conclusao", new Date(hoje.getFullYear(), hoje.getMonth() - 5, 1).toISOString()).order("conclusao")
  ]);

  const receitaMes = (faturadas ?? []).reduce((s, r) => s + Number(r.valor_total || 0), 0);
  const receitaMesAnt = (faturadasAnt ?? []).reduce((s, r) => s + Number(r.valor_total || 0), 0);
  const totalAReceber = (aReceber ?? []).reduce((s, r) => s + Number(r.valor_total || 0), 0);
  const variacaoMes = receitaMesAnt > 0 ? ((receitaMes - receitaMesAnt) / receitaMesAnt) * 100 : null;

  // Agrupa por mês (últimos 6)
  const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const porMes: Record<string, number> = {};
  (mensais ?? []).forEach(r => {
    if (!r.conclusao) return;
    const d = new Date(r.conclusao);
    const k = `${MESES[d.getMonth()]}/${String(d.getFullYear()).slice(2)}`;
    porMes[k] = (porMes[k] ?? 0) + Number(r.valor_total || 0);
  });

  return (
    <>
      <Topbar crumb="Financeiro" />
      <div className="page-pad">
        <div className="page-head-resp" style={{ marginBottom: 24 }}>
          <div>
            <div className="eyebrow">Planejamento</div>
            <h1 className="page-title" style={{ marginTop: 6 }}>Financeiro</h1>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--graxa)" }}>Receita, OS faturadas e valores a receber.</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpi-grid-resp" style={{ marginBottom: 24 }}>
          <div className="kpi success">
            <div className="kpi-label">Receita do mês</div>
            <div className="kpi-value">{BRL(receitaMes)}</div>
            <div className="kpi-sub">
              {variacaoMes !== null
                ? <span style={{ color: variacaoMes >= 0 ? "var(--verde)" : "var(--vermelho)" }}>
                    {variacaoMes >= 0 ? "▲" : "▼"} {Math.abs(variacaoMes).toFixed(1)}% vs mês anterior
                  </span>
                : "primeiro mês"}
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Mês anterior</div>
            <div className="kpi-value">{BRL(receitaMesAnt)}</div>
            <div className="kpi-sub">{(faturadasAnt ?? []).length} OS faturadas</div>
          </div>
          <div className="kpi warn">
            <div className="kpi-label">A receber</div>
            <div className="kpi-value">{BRL(totalAReceber)}</div>
            <div className="kpi-sub">{(aReceber ?? []).length} OS concluídas não faturadas</div>
          </div>
          <div className="kpi alt">
            <div className="kpi-label">Faturadas (mês)</div>
            <div className="kpi-value">{(faturadas ?? []).length}</div>
            <div className="kpi-sub">ordens de serviço</div>
          </div>
        </div>

        {/* Receita por mês */}
        {Object.keys(porMes).length > 0 && (
          <div className="panel" style={{ marginBottom: 24 }}>
            <div className="panel-head"><span className="panel-title">Receita — últimos 6 meses</span></div>
            <div style={{ padding: "18px", display: "flex", gap: 8, alignItems: "flex-end", overflowX: "auto" }}>
              {(() => {
                const max = Math.max(...Object.values(porMes));
                return Object.entries(porMes).map(([mes, valor]) => (
                  <div key={mes} style={{ flex: 1, minWidth: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "var(--graxa)" }}>{BRL(valor).replace("R$\u00a0", "")}</span>
                    <div style={{ width: "100%", height: Math.max(8, (valor / max) * 120), background: "var(--laranja)", borderRadius: "2px 2px 0 0", border: "2px solid var(--preto)" }} />
                    <span style={{ fontFamily: "Oswald", fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>{mes}</span>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* A receber */}
        {(aReceber ?? []).length > 0 && (
          <div className="panel" style={{ marginBottom: 24, borderColor: "var(--amarelo)" }}>
            <div className="panel-head">
              <span className="panel-title">A receber — OS concluídas</span>
              <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, fontWeight: 700, color: "var(--amarelo)" }}>{BRL(totalAReceber)}</span>
            </div>
            <div className="table-wrap">
              <table className="data">
                <thead><tr><th>OS</th><th>Cliente</th><th>Placa</th><th>Conclusão</th><th style={{ textAlign: "right" }}>Valor</th></tr></thead>
                <tbody>
                  {aReceber!.map((os: any) => (
                    <tr key={os.num}>
                      <td><Link href={`/os/${os.num}`} className="mono">{os.num}</Link></td>
                      <td>{os.clientes?.nome ?? "—"}</td>
                      <td><span className="placa">{os.placa}</span></td>
                      <td className="mono">{fmtData(os.conclusao)}</td>
                      <td className="mono" style={{ textAlign: "right", fontWeight: 700, color: "var(--amarelo)" }}>{BRL(os.valor_total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Faturadas recentes */}
        <div className="panel">
          <div className="panel-head"><span className="panel-title">Últimas OS faturadas</span></div>
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th>OS</th><th>Cliente</th><th>Placa</th><th>Pagamento</th><th>Conclusão</th><th style={{ textAlign: "right" }}>Valor</th></tr></thead>
              <tbody>
                {(recentes ?? []).map((os: any) => (
                  <tr key={os.num}>
                    <td><Link href={`/os/${os.num}`} className="mono">{os.num}</Link></td>
                    <td>{os.clientes?.nome ?? "—"}</td>
                    <td><span className="placa">{os.placa}</span></td>
                    <td>{os.forma_pagamento ?? <span style={{ color: "var(--graxa)" }}>—</span>}</td>
                    <td className="mono">{fmtData(os.conclusao)}</td>
                    <td className="mono" style={{ textAlign: "right", fontWeight: 700, color: "var(--verde)" }}>{BRL(os.valor_total)}</td>
                  </tr>
                ))}
                {(!recentes || recentes.length === 0) && (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: "var(--graxa)" }}>Nenhuma OS faturada ainda.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
