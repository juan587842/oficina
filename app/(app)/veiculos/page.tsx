import Link from "next/link";
import Topbar from "@/components/shell/Topbar";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function VeiculosPage() {
  const supabase = createClient();
  const { data: veiculos } = await supabase
    .from("veiculos")
    .select("placa,marca,modelo,ano,km_atual,cliente_id,clientes(nome)")
    .order("placa");

  return (
    <>
      <Topbar crumb="Veículos" />
      <div className="page-pad">
        <div className="page-head-resp">
          <div>
            <div className="eyebrow">Cadastros</div>
            <h1 className="page-title" style={{ marginTop: 6 }}>Veículos</h1>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--graxa)" }}>Caminhões, cavalos, carretas — a frota que passa pela oficina.</p>
          </div>
          <Link href="/veiculos/novo" className="btn">+ Novo veículo</Link>
        </div>

        <div className="veiculos-grid-resp">
          {(veiculos ?? []).map((v: any) => (
            <Link key={v.placa} href={`/veiculos/${v.placa}`} style={{
              background: "white", border: "2px solid var(--preto)", borderRadius: 4,
              padding: 16, boxShadow: "var(--shadow-sm)", textDecoration: "none", color: "var(--preto)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: "Oswald", fontWeight: 700, fontSize: 18, textTransform: "uppercase" }}>{v.marca}</div>
                  <div style={{ fontSize: 13, color: "var(--fg2)" }}>{v.modelo} {v.ano ? `(${v.ano})` : ""}</div>
                </div>
                <span className="placa" style={{ fontSize: 13, letterSpacing: 3 }}>{v.placa}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, paddingTop: 10, borderTop: "1px solid var(--border-soft)" }}>
                <div>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "var(--graxa)", textTransform: "uppercase" }}>KM atual</div>
                  <div style={{ fontFamily: "Oswald", fontSize: 14, fontWeight: 600 }}>{v.km_atual?.toLocaleString("pt-BR") ?? "—"}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "var(--graxa)", textTransform: "uppercase" }}>Cliente</div>
                  <div style={{ fontFamily: "Oswald", fontSize: 14, fontWeight: 600 }}>{v.clientes?.nome ?? v.cliente_id}</div>
                </div>
              </div>
            </Link>
          ))}
          {(!veiculos || veiculos.length === 0) && (
            <div style={{ gridColumn: "1 / -1", padding: 40, textAlign: "center", color: "var(--graxa)" }}>
              Nenhum veículo. <Link href="/veiculos/novo" style={{ color: "var(--laranja)" }}>Cadastrar →</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
