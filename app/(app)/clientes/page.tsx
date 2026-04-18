import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Topbar from "@/components/shell/Topbar";

export const dynamic = "force-dynamic";

export default async function ClientesPage({ searchParams }: { searchParams: { tipo?: string; q?: string } }) {
  const supabase = createClient();
  let query = supabase.from("clientes").select("*").order("nome");
  if (searchParams.tipo && ["frota", "autonomo"].includes(searchParams.tipo)) {
    query = query.eq("tipo", searchParams.tipo);
  }
  if (searchParams.q) {
    query = query.or(`nome.ilike.%${searchParams.q}%,cnpj.ilike.%${searchParams.q}%,cpf.ilike.%${searchParams.q}%`);
  }
  const { data: clientes } = await query;

  return (
    <>
      <Topbar crumb="Clientes" />
      <div className="page-pad">
        <div className="page-head-resp">
          <div>
            <div className="eyebrow">Cadastros</div>
            <h1 className="page-title" style={{ marginTop: 6 }}>Clientes</h1>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--graxa)" }}>Frotas e autônomos atendidos pela oficina.</p>
          </div>
          <Link href="/clientes/novo" className="btn">+ Novo cliente</Link>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <Link href="/clientes" className={`chip ${!searchParams.tipo ? "active" : ""}`}>Todos</Link>
          <Link href="/clientes?tipo=frota" className={`chip ${searchParams.tipo === "frota" ? "active" : ""}`}>Frotas</Link>
          <Link href="/clientes?tipo=autonomo" className={`chip ${searchParams.tipo === "autonomo" ? "active" : ""}`}>Autônomos</Link>
        </div>

        {/* Tabela — desktop */}
        <div className="panel clientes-table-view">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr><th>Código</th><th>Nome</th><th>Tipo</th><th>CNPJ/CPF</th><th>Cidade</th><th>Telefone</th><th>Status</th></tr>
              </thead>
              <tbody>
                {(clientes ?? []).map(c => (
                  <tr key={c.id}>
                    <td className="mono"><Link href={`/clientes/${c.id}`}>{c.id}</Link></td>
                    <td style={{ fontWeight: 600 }}><Link href={`/clientes/${c.id}`} style={{ color: "var(--preto)", border: 0 }}>{c.nome}</Link></td>
                    <td><span className="chip" style={{ cursor: "default" }}>{c.tipo === "frota" ? "Frota" : "Autônomo"}</span></td>
                    <td className="mono">{c.cnpj ?? c.cpf ?? "—"}</td>
                    <td>{c.cidade ?? "—"}</td>
                    <td className="mono">{c.telefone ?? "—"}</td>
                    <td>{c.status === "ativo" ? <span className="pill concluida">Ativo</span> : <span className="pill aguardando">Inativo</span>}</td>
                  </tr>
                ))}
                {(!clientes || clientes.length === 0) && (
                  <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "var(--graxa)" }}>Nenhum cliente cadastrado. <Link href="/clientes/novo" style={{ color: "var(--laranja)" }}>Cadastrar o primeiro →</Link></td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards — mobile */}
        <div className="clientes-cards-view">
          {(clientes ?? []).map(c => (
            <Link key={c.id} href={`/clientes/${c.id}`} className="cliente-card">
              <div className="cliente-card-head">
                <span className="cliente-card-nome">{c.nome}</span>
                <span className={`pill ${c.status === "ativo" ? "concluida" : "aguardando"}`}>
                  {c.status === "ativo" ? "Ativo" : "Inativo"}
                </span>
              </div>
              <div className="cliente-card-meta">
                <span className="chip" style={{ cursor: "default", fontSize: 10 }}>{c.tipo === "frota" ? "Frota" : "Autônomo"}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--graxa)" }}>{c.id}</span>
              </div>
              <div className="cliente-card-info">
                {c.cidade && <span>📍 {c.cidade}{c.uf ? ` / ${c.uf}` : ""}</span>}
                {c.telefone && <span>📞 {c.telefone}</span>}
                {(c.cnpj ?? c.cpf) && <span className="mono">{c.cnpj ?? c.cpf}</span>}
              </div>
            </Link>
          ))}
          {(!clientes || clientes.length === 0) && (
            <div style={{ textAlign: "center", padding: 40, color: "var(--graxa)" }}>
              Nenhum cliente. <Link href="/clientes/novo" style={{ color: "var(--laranja)" }}>Cadastrar o primeiro →</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
