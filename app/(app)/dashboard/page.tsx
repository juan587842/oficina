import { createClient } from "@/lib/supabase/server";
import Topbar from "@/components/shell/Topbar";
import GraficoSemanal from "@/components/dashboard/GraficoSemanal";
import Link from "next/link";
import { BRL, fmtData, statusLabel } from "@/lib/fmt";

export const dynamic = "force-dynamic";

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function ultimos7Dias() {
  const dias: { label: string; inicio: Date; fim: Date }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const fim = new Date(d);
    fim.setHours(23, 59, 59, 999);
    dias.push({ label: DIAS_SEMANA[d.getDay()], inicio: d, fim });
  }
  return dias;
}

export default async function DashboardPage() {
  const supabase = createClient();

  const inicioMes = new Date();
  inicioMes.setDate(1);
  inicioMes.setHours(0, 0, 0, 0);

  const inicioSemana = new Date();
  inicioSemana.setDate(inicioSemana.getDate() - 6);
  inicioSemana.setHours(0, 0, 0, 0);

  const [
    { count: abertas },
    { count: andamento },
    { count: aguardando },
    { data: faturadas },
    { data: recentes },
    { data: osSemana }
  ] = await Promise.all([
    supabase.from("ordens_servico").select("*", { count: "exact", head: true }).eq("status", "aberta"),
    supabase.from("ordens_servico").select("*", { count: "exact", head: true }).eq("status", "andamento"),
    supabase.from("ordens_servico").select("*", { count: "exact", head: true }).eq("status", "aguardando"),
    supabase.from("ordens_servico").select("valor_total").eq("status", "faturada").gte("conclusao", inicioMes.toISOString()),
    supabase.from("ordens_servico").select("num,status,problema,valor_total,entrada,cliente_id,placa,clientes(nome)").order("entrada", { ascending: false }).limit(6),
    supabase.from("ordens_servico").select("entrada,conclusao,valor_total,status").gte("entrada", inicioSemana.toISOString())
  ]);

  const receita = (faturadas ?? []).reduce((s, r) => s + Number(r.valor_total || 0), 0);

  const diasSemana = ultimos7Dias();
  const dadosGrafico = diasSemana.map(({ label, inicio, fim }) => {
    const osNoDia = (osSemana ?? []).filter((o) => {
      const dt = new Date(o.entrada);
      return dt >= inicio && dt <= fim;
    });
    const valorNoDia = osNoDia
      .filter((o) => o.status === "faturada" || o.status === "concluida")
      .reduce((s, o) => s + Number(o.valor_total || 0), 0);
    return { dia: label, os: osNoDia.length, valor: valorNoDia };
  });

  return (
    <>
      <Topbar crumb="Dashboard" />
      <div className="page-pad">
        <div className="page-head-resp">
          <div>
            <div className="eyebrow">Visão geral</div>
            <h1 className="page-title" style={{ marginTop: 6 }}>Dashboard</h1>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--graxa)" }}>O que tá rolando na oficina agora.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/os/nova" className="btn">+ Nova OS</Link>
          </div>
        </div>

        <div className="kpi-grid-resp">
          <div className="kpi"><div className="kpi-label">OS Abertas</div><div className="kpi-value">{abertas ?? 0}</div><div className="kpi-sub">aguardando início</div></div>
          <div className="kpi warn"><div className="kpi-label">Em Andamento</div><div className="kpi-value">{andamento ?? 0}</div><div className="kpi-sub">equipe trabalhando</div></div>
          <div className="kpi alt"><div className="kpi-label">Aguardando peça</div><div className="kpi-value">{aguardando ?? 0}</div><div className="kpi-sub">fornecedor</div></div>
          <div className="kpi success"><div className="kpi-label">Receita / mês</div><div className="kpi-value">{BRL(receita)}</div><div className="kpi-sub">OS faturadas</div></div>
        </div>

        <div className="panel" style={{ marginBottom: 24 }}>
          <div className="panel-head">
            <span className="panel-title">Serviços — últimos 7 dias</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--graxa)" }}>
              <span style={{ color: "var(--laranja)", marginRight: 12 }}>■ OS abertas</span>
              <span style={{ color: "var(--verde)" }}>■ Valor faturado</span>
            </span>
          </div>
          <GraficoSemanal dados={dadosGrafico} />
        </div>

        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Últimas Ordens</span>
            <Link href="/os" style={{ fontFamily: "Oswald", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--laranja)" }}>
              Ver todas →
            </Link>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr><th>OS</th><th>Cliente</th><th>Placa</th><th>Problema</th><th>Status</th><th>Entrada</th><th style={{ textAlign: "right" }}>Valor</th></tr>
              </thead>
              <tbody>
                {(recentes ?? []).map((r: any) => (
                  <tr key={r.num}>
                    <td><Link href={`/os/${r.num}`} className="mono">{r.num}</Link></td>
                    <td>{r.clientes?.nome ?? r.cliente_id}</td>
                    <td><span className="placa">{r.placa}</span></td>
                    <td style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.problema}</td>
                    <td><span className={`pill ${r.status}`}><span style={{ width: 7, height: 7, borderRadius: 999, background: "currentColor" }} /> {statusLabel(r.status)}</span></td>
                    <td className="mono">{fmtData(r.entrada)}</td>
                    <td className="mono" style={{ textAlign: "right" }}>{BRL(r.valor_total)}</td>
                  </tr>
                ))}
                {(!recentes || recentes.length === 0) && (
                  <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "var(--graxa)" }}>Nenhuma OS ainda. <Link href="/os/nova" style={{ color: "var(--laranja)" }}>Abrir a primeira →</Link></td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
