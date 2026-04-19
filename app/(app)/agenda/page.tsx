import { createClient } from "@/lib/supabase/server";
import Topbar from "@/components/shell/Topbar";
import Link from "next/link";
import { statusLabel, fmtData } from "@/lib/fmt";

export const dynamic = "force-dynamic";

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function semanaAtual() {
  const hoje = new Date();
  const dia = hoje.getDay();
  const inicio = new Date(hoje);
  inicio.setDate(hoje.getDate() - dia);
  inicio.setHours(0, 0, 0, 0);
  const fim = new Date(inicio);
  fim.setDate(inicio.getDate() + 6);
  fim.setHours(23, 59, 59, 999);
  return { inicio, fim };
}

function diasDaSemana(inicio: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(inicio);
    d.setDate(inicio.getDate() + i);
    return d;
  });
}

function fmtDia(d: Date) {
  return `${String(d.getDate()).padStart(2, "0")} ${MESES[d.getMonth()]}`;
}

export default async function AgendaPage() {
  const supabase = createClient();
  const { inicio, fim } = semanaAtual();

  const [{ data: semana }, { data: semDta }, { data: atrasadas }] = await Promise.all([
    supabase
      .from("ordens_servico")
      .select("num,status,problema,placa,previsao,entrada,clientes(nome)")
      .gte("previsao", inicio.toISOString())
      .lte("previsao", fim.toISOString())
      .not("status", "in", '("concluida","faturada","cancelada")')
      .order("previsao"),
    supabase
      .from("ordens_servico")
      .select("num,status,problema,placa,entrada,clientes(nome)")
      .is("previsao", null)
      .not("status", "in", '("concluida","faturada","cancelada")')
      .order("entrada", { ascending: false })
      .limit(10),
    supabase
      .from("ordens_servico")
      .select("num,status,problema,placa,previsao,clientes(nome)")
      .lt("previsao", inicio.toISOString())
      .not("status", "in", '("concluida","faturada","cancelada")')
      .order("previsao")
      .limit(10)
  ]);

  const dias = diasDaSemana(inicio);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  function osNoDia(dia: Date) {
    return (semana ?? []).filter(os => {
      const d = new Date(os.previsao!);
      return d.toDateString() === dia.toDateString();
    });
  }

  return (
    <>
      <Topbar crumb="Agenda" />
      <div className="page-pad">
        <div className="page-head-resp" style={{ marginBottom: 24 }}>
          <div>
            <div className="eyebrow">Planejamento</div>
            <h1 className="page-title" style={{ marginTop: 6 }}>Agenda</h1>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--graxa)" }}>
              OS com previsão de entrega — semana de {fmtDia(inicio)} a {fmtDia(fim)}.
            </p>
          </div>
          <Link href="/os/nova" className="btn">+ Nova OS</Link>
        </div>

        {/* Atrasadas */}
        {(atrasadas ?? []).length > 0 && (
          <div className="panel" style={{ marginBottom: 20, borderColor: "var(--vermelho)" }}>
            <div className="panel-head" style={{ background: "#2A0E0E", borderColor: "var(--vermelho)" }}>
              <span className="panel-title" style={{ color: "var(--vermelho)" }}>⚠ Atrasadas ({atrasadas!.length})</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {atrasadas!.map((os: any) => (
                <Link key={os.num} href={`/os/${os.num}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: "1px solid var(--border-soft)", textDecoration: "none", color: "var(--preto)" }}>
                  <span className="mono" style={{ fontSize: 12, color: "var(--vermelho)", fontWeight: 700 }}>{os.num}</span>
                  <span style={{ flex: 1, fontSize: 13 }}>{os.clientes?.nome ?? "—"} · {os.problema}</span>
                  <span className="placa" style={{ fontSize: 11 }}>{os.placa}</span>
                  <span className={`pill ${os.status}`} style={{ fontSize: 10 }}>{statusLabel(os.status)}</span>
                  <span className="mono" style={{ fontSize: 11, color: "var(--vermelho)" }}>{fmtData(os.previsao)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Grade semanal */}
        <div className="agenda-semana">
          {dias.map((dia, i) => {
            const os = osNoDia(dia);
            const isHoje = dia.toDateString() === hoje.toDateString();
            const isFds = i === 0 || i === 6;
            return (
              <div key={i} className={`agenda-dia${isHoje ? " hoje" : ""}${isFds ? " fds" : ""}`}>
                <div className="agenda-dia-header">
                  <span className="agenda-dia-nome">{DIAS[i]}</span>
                  <span className="agenda-dia-data">{fmtDia(dia)}</span>
                  {os.length > 0 && <span className="agenda-count">{os.length}</span>}
                </div>
                <div className="agenda-dia-body">
                  {os.length === 0
                    ? <span style={{ fontSize: 12, color: "var(--graxa)", padding: "8px 0", display: "block" }}>Livre</span>
                    : os.map((o: any) => (
                      <Link key={o.num} href={`/os/${o.num}`} className="agenda-os-item">
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
                          <span className="mono" style={{ fontSize: 10 }}>{o.num}</span>
                          <span className={`pill ${o.status}`} style={{ fontSize: 9, padding: "2px 6px" }}>{statusLabel(o.status)}</span>
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 600, marginTop: 3, lineHeight: 1.3 }}>{o.clientes?.nome ?? "—"}</div>
                        <div style={{ fontSize: 11, color: "var(--graxa)", marginTop: 2 }}>{o.problema?.slice(0, 40)}{(o.problema?.length ?? 0) > 40 ? "…" : ""}</div>
                        <span className="placa" style={{ fontSize: 10, marginTop: 4 }}>{o.placa}</span>
                      </Link>
                    ))
                  }
                </div>
              </div>
            );
          })}
        </div>

        {/* Sem data */}
        {(semDta ?? []).length > 0 && (
          <div className="panel" style={{ marginTop: 20 }}>
            <div className="panel-head">
              <span className="panel-title">Sem data prevista ({semDta!.length})</span>
            </div>
            <div className="table-wrap">
              <table className="data">
                <thead><tr><th>OS</th><th>Cliente</th><th>Placa</th><th>Problema</th><th>Status</th><th>Abertura</th></tr></thead>
                <tbody>
                  {semDta!.map((os: any) => (
                    <tr key={os.num}>
                      <td><Link href={`/os/${os.num}`} className="mono">{os.num}</Link></td>
                      <td>{os.clientes?.nome ?? "—"}</td>
                      <td><span className="placa">{os.placa}</span></td>
                      <td style={{ maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{os.problema}</td>
                      <td><span className={`pill ${os.status}`} style={{ fontSize: 10 }}>{statusLabel(os.status)}</span></td>
                      <td className="mono">{fmtData(os.entrada)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
