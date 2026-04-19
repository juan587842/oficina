import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BRL, fmtData, fmtDataSimples, statusLabel } from "@/lib/fmt";
import BotaoImprimir from "@/components/os/BotaoImprimir";

export const dynamic = "force-dynamic";

export default async function ImprimirOSPage({ params }: { params: { num: string } }) {
  const supabase = createClient();
  const [{ data: os }, { data: itens }] = await Promise.all([
    supabase.from("ordens_servico").select("*,clientes(nome,telefone,cnpj,cpf,endereco,cidade,uf,email),veiculos(marca,modelo,ano,km_atual)").eq("num", params.num).maybeSingle(),
    supabase.from("os_itens").select("*").eq("os_num", params.num).order("ordem")
  ]);
  if (!os) notFound();

  const cliente = (os as any).clientes;
  const veiculo = (os as any).veiculos;
  const maoObra = (itens ?? []).filter(i => i.tipo === "mao_obra");
  const pecas = (itens ?? []).filter(i => i.tipo === "peca");

  return (
    <div className="print-doc">
      <div className="no-print" style={{ padding: 16, borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href={`/os/${params.num}`} style={{ fontSize: 13 }}>← Voltar para a OS</a>
        <BotaoImprimir />
      </div>

      <div className="print-sheet">
        <header className="print-header">
          <div>
            <div className="print-brand">Fabio Mecânica Diesel</div>
            <div className="print-brand-sub">A gente cuida do seu caminhão.</div>
          </div>
          <div className="print-os-num">
            <div className="print-eyebrow">Ordem de Serviço</div>
            <div className="print-num">{os.num}</div>
            <div className="print-status">{statusLabel(os.status)}</div>
          </div>
        </header>

        <section className="print-grid-2">
          <div>
            <div className="print-block-title">Cliente</div>
            <div className="print-line"><strong>{cliente?.nome ?? os.cliente_id}</strong></div>
            {cliente?.cnpj && <div className="print-line">CNPJ: {cliente.cnpj}</div>}
            {cliente?.cpf && <div className="print-line">CPF: {cliente.cpf}</div>}
            {cliente?.telefone && <div className="print-line">Telefone: {cliente.telefone}</div>}
            {cliente?.email && <div className="print-line">E-mail: {cliente.email}</div>}
            {(cliente?.endereco || cliente?.cidade) && (
              <div className="print-line">{[cliente.endereco, cliente.cidade, cliente.uf].filter(Boolean).join(", ")}</div>
            )}
          </div>
          <div>
            <div className="print-block-title">Veículo</div>
            <div className="print-line"><strong>{veiculo?.marca} {veiculo?.modelo}</strong> {veiculo?.ano ? `(${veiculo.ano})` : ""}</div>
            <div className="print-line">Placa: <strong>{os.placa}</strong></div>
            {veiculo?.km_atual != null && <div className="print-line">KM atual: {Number(veiculo.km_atual).toLocaleString("pt-BR")}</div>}
            <div className="print-line">Entrada: {fmtData(os.entrada)}</div>
            {os.previsao && <div className="print-line">Previsão: {fmtData(os.previsao)}</div>}
            {os.conclusao && <div className="print-line">Conclusão: {fmtData(os.conclusao)}</div>}
          </div>
        </section>

        <section>
          <div className="print-block-title">Problema relatado</div>
          <p className="print-problema">{os.problema}</p>
        </section>

        {maoObra.length > 0 && (
          <section>
            <div className="print-block-title">Mão de obra</div>
            <table className="print-table">
              <thead><tr><th>Descrição</th><th>Qtd</th><th>Un</th><th>V. unit</th><th>Total</th></tr></thead>
              <tbody>
                {maoObra.map(i => (
                  <tr key={i.id}>
                    <td>{i.descricao}</td>
                    <td className="num">{i.quantidade}</td>
                    <td>{i.unidade}</td>
                    <td className="num">{BRL(Number(i.valor_unit))}</td>
                    <td className="num"><strong>{BRL(Number(i.valor_total ?? 0))}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {pecas.length > 0 && (
          <section>
            <div className="print-block-title">Peças</div>
            <table className="print-table">
              <thead><tr><th>Descrição</th><th>Qtd</th><th>Un</th><th>V. unit</th><th>Total</th></tr></thead>
              <tbody>
                {pecas.map(i => (
                  <tr key={i.id}>
                    <td>{i.descricao}</td>
                    <td className="num">{i.quantidade}</td>
                    <td>{i.unidade}</td>
                    <td className="num">{BRL(Number(i.valor_unit))}</td>
                    <td className="num"><strong>{BRL(Number(i.valor_total ?? 0))}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <section className="print-total-row">
          <div>
            {os.forma_pagamento && <div className="print-line">Forma de pagamento: <strong>{os.forma_pagamento}</strong></div>}
            {os.garantia_dias ? <div className="print-line">Garantia: <strong>{os.garantia_dias} dias</strong></div> : null}
          </div>
          <div className="print-total-box">
            <div className="print-total-label">Total</div>
            <div className="print-total-value">{BRL(Number(os.valor_total))}</div>
          </div>
        </section>

        {os.observacoes && (
          <section>
            <div className="print-block-title">Observações</div>
            <p className="print-problema">{os.observacoes}</p>
          </section>
        )}

        <section className="print-assinaturas">
          <div className="print-ass">
            <div className="print-ass-line" />
            <div className="print-ass-label">Cliente</div>
          </div>
          <div className="print-ass">
            <div className="print-ass-line" />
            <div className="print-ass-label">Oficina</div>
          </div>
        </section>

        <footer className="print-footer">
          Emitido em {fmtDataSimples(new Date().toISOString())} — Fabio Mecânica Diesel
        </footer>
      </div>
    </div>
  );
}
