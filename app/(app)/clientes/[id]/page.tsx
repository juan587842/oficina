import { notFound } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/shell/Topbar";
import ClienteForm from "@/components/clientes/ClienteForm";
import { createClient } from "@/lib/supabase/server";
import { atualizarCliente, excluirCliente } from "@/lib/actions/clientes";
import { BRL, fmtData, statusLabel } from "@/lib/fmt";

export const dynamic = "force-dynamic";

export default async function ClienteDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const [{ data: cliente }, { data: veiculos }, { data: ordens }] = await Promise.all([
    supabase.from("clientes").select("*").eq("id", params.id).maybeSingle(),
    supabase.from("veiculos").select("*").eq("cliente_id", params.id).order("placa"),
    supabase.from("ordens_servico").select("num,status,problema,entrada,valor_total,placa").eq("cliente_id", params.id).order("entrada", { ascending: false }).limit(10)
  ]);

  if (!cliente) notFound();

  const update = atualizarCliente.bind(null, params.id);
  const del = excluirCliente.bind(null, params.id);

  return (
    <>
      <Topbar crumb={`Clientes / ${cliente.nome}`} />
      <div style={{ padding: 28, maxWidth: 1400 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, paddingBottom: 16, borderBottom: "2px solid var(--preto)" }}>
          <div>
            <div className="eyebrow mono" style={{ color: "var(--graxa)" }}>{cliente.id}</div>
            <h1 className="page-title" style={{ margin: "4px 0" }}>{cliente.nome}</h1>
            <div style={{ fontSize: 13, color: "var(--graxa)", fontFamily: "JetBrains Mono", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {cliente.tipo === "frota" ? "Frota" : "Autônomo"} · {cliente.cidade ?? "—"} · {cliente.telefone ?? "—"}
            </div>
          </div>
          <form action={del}>
            <button type="submit" className="btn xs secondary">Excluir cliente</button>
          </form>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <div>
            <ClienteForm action={update} inicial={cliente} editar />

            <div className="panel" style={{ marginTop: 16 }}>
              <div className="panel-head">
                <span className="panel-title">Veículos</span>
                <Link href={`/veiculos/novo?cliente=${cliente.id}`} className="btn xs">+ Veículo</Link>
              </div>
              <table className="data">
                <thead><tr><th>Placa</th><th>Marca/Modelo</th><th>Ano</th><th>KM</th></tr></thead>
                <tbody>
                  {(veiculos ?? []).map(v => (
                    <tr key={v.placa}>
                      <td><Link href={`/veiculos/${v.placa}`}><span className="placa">{v.placa}</span></Link></td>
                      <td>{v.marca} {v.modelo}</td>
                      <td className="mono">{v.ano ?? "—"}</td>
                      <td className="mono">{v.km_atual?.toLocaleString("pt-BR") ?? "—"}</td>
                    </tr>
                  ))}
                  {(!veiculos || veiculos.length === 0) && (
                    <tr><td colSpan={4} style={{ textAlign: "center", padding: 24, color: "var(--graxa)" }}>Nenhum veículo. <Link href={`/veiculos/novo?cliente=${cliente.id}`} style={{ color: "var(--laranja)" }}>Adicionar →</Link></td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><span className="panel-title">Histórico de OS</span></div>
            <div className="panel-body pad" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(ordens ?? []).map(o => (
                <Link key={o.num} href={`/os/${o.num}`} style={{ border: 0, display: "block", padding: 10, background: "var(--papel)", borderRadius: 2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span className="mono">{o.num}</span>
                    <span className={`pill ${o.status}`} style={{ fontSize: 9 }}>{statusLabel(o.status)}</span>
                  </div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>{o.problema}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--graxa)" }} className="mono">
                    <span>{fmtData(o.entrada)}</span>
                    <span style={{ color: "var(--preto)", fontWeight: 700 }}>{BRL(o.valor_total)}</span>
                  </div>
                </Link>
              ))}
              {(!ordens || ordens.length === 0) && (
                <div style={{ textAlign: "center", padding: 20, color: "var(--graxa)", fontSize: 13 }}>Nenhuma OS ainda.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
