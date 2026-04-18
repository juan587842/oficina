import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Topbar from "@/components/shell/Topbar";
import { fmtDataSimples } from "@/lib/fmt";

export const dynamic = "force-dynamic";

export default async function ClientesPage({ searchParams }: { searchParams: { tipo?: string; q?: string } }) {
  const supabase = createClient();
  let query = supabase.from("clientes").select("*").order("nome");
  if (searchParams.tipo && ["frota","autonomo"].includes(searchParams.tipo)) {
    query = query.eq("tipo", searchParams.tipo);
  }
  if (searchParams.q) {
    query = query.or(`nome.ilike.%${searchParams.q}%,cnpj.ilike.%${searchParams.q}%,cpf.ilike.%${searchParams.q}%`);
  }
  const { data: clientes } = await query;

  return (
    <>
      <Topbar crumb="Clientes" />
      <div style={{ padding: 28, maxWidth: 1400 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 24, paddingBottom: 16, borderBottom: "2px solid var(--preto)" }}>
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

        <div className="panel">
          <table className="data">
            <thead>
              <tr><th>Código</th><th>Nome</th><th>Tipo</th><th>CNPJ/CPF</th><th>Cidade</th><th>Telefone</th><th>Status</th></tr>
            </thead>
            <tbody>
              {(clientes ?? []).map(c => (
                <tr key={c.id} style={{ cursor: "pointer" }}>
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
    </>
  );
}
