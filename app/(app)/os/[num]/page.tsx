import { notFound } from "next/navigation";
import Link from "next/link";
import { Printer } from "lucide-react";
import Topbar from "@/components/shell/Topbar";
import BotaoWhatsApp from "@/components/os/BotaoWhatsApp";
import UploadFotos from "@/components/os/UploadFotos";
import { createClient } from "@/lib/supabase/server";
import { adicionarItem, removerItem, mudarStatusOS } from "@/lib/actions/os";
import { BRL, fmtData, statusLabel } from "@/lib/fmt";

export const dynamic = "force-dynamic";

const STATUSES = ["aberta","andamento","aguardando","concluida","faturada","cancelada"];

export default async function OSDetailPage({ params }: { params: { num: string } }) {
  const supabase = createClient();
  const [{ data: os }, { data: itens }, { data: timeline }, { data: fotosRaw }] = await Promise.all([
    supabase.from("ordens_servico").select("*,clientes(nome,telefone),veiculos(marca,modelo,ano)").eq("num", params.num).maybeSingle(),
    supabase.from("os_itens").select("*").eq("os_num", params.num).order("ordem"),
    supabase.from("os_timeline").select("*").eq("os_num", params.num).order("quando", { ascending: false }),
    supabase.from("os_fotos").select("id,path,descricao").eq("os_num", params.num).order("created_at", { ascending: false })
  ]);
  if (!os) notFound();

  const fotos = await Promise.all((fotosRaw ?? []).map(async f => {
    const { data } = await supabase.storage.from("os-fotos").createSignedUrl(f.path, 3600);
    return { id: f.id, path: f.path, descricao: f.descricao, signedUrl: data?.signedUrl ?? "" };
  }));

  async function addItem(fd: FormData) {
    "use server";
    await adicionarItem(params.num, fd);
  }
  async function setStatus(fd: FormData) {
    "use server";
    await mudarStatusOS(params.num, String(fd.get("status") ?? "aberta"));
  }

  const cliente = (os as any).clientes;
  const veiculo = (os as any).veiculos;

  return (
    <>
      <Topbar crumb={`OS / ${os.num}`} />
      <div className="page-pad">
        <div style={{
          background: "var(--preto)", color: "var(--papel)",
          padding: "20px 24px", border: "2px solid var(--preto)", borderRadius: 4,
          boxShadow: "var(--shadow-md)", marginBottom: 20,
          display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16
        }}>
          <div>
            <div className="mono" style={{ color: "var(--laranja)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em" }}>{os.num}</div>
            <h1 style={{ fontFamily: "Oswald", fontSize: 32, fontWeight: 700, textTransform: "uppercase", margin: "8px 0 12px", color: "var(--papel)" }}>
              {os.problema}
            </h1>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontFamily: "JetBrains Mono", fontSize: 12, color: "#B8B6B0", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              <span>Cliente: <strong style={{ color: "var(--papel)" }}>{cliente?.nome}</strong></span>
              <span>Veículo: <strong style={{ color: "var(--papel)" }}>{veiculo?.marca} {veiculo?.modelo}</strong></span>
              <span>Placa: <strong style={{ color: "var(--papel)" }}>{os.placa}</strong></span>
              <span>Entrada: <strong style={{ color: "var(--papel)" }}>{fmtData(os.entrada)}</strong></span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <span className={`pill ${os.status}`}>{statusLabel(os.status)}</span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Link href={`/os/${os.num}/imprimir`} className="btn xs" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Printer size={13} /> Imprimir / PDF
              </Link>
              <BotaoWhatsApp
                num={os.num}
                problema={os.problema}
                placa={os.placa}
                clienteNome={cliente?.nome ?? os.cliente_id}
                telefone={cliente?.telefone}
                valorTotal={Number(os.valor_total ?? 0)}
                itens={(itens ?? []).map((i: any) => ({ tipo: i.tipo, descricao: i.descricao, quantidade: i.quantidade, valor_total: i.valor_total }))}
              />
            </div>
          </div>
        </div>

        <div className="detail-grid-resp">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <form action={setStatus} className="panel">
              <div className="panel-head"><span className="panel-title">Mudar status</span></div>
              <div className="panel-body pad" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <select name="status" className="field" defaultValue={os.status} style={{ maxWidth: 240 }}>
                  {STATUSES.map(s => <option key={s} value={s}>{statusLabel(s)}</option>)}
                </select>
                <button className="btn sm" type="submit">Atualizar</button>
              </div>
            </form>

            <div className="panel">
              <div className="panel-head"><span className="panel-title">Itens — mão de obra e peças</span></div>
              <div className="table-wrap"><table className="data">
                <thead><tr><th>Tipo</th><th>Descrição</th><th style={{ textAlign: "right" }}>Qtd</th><th>Un</th><th style={{ textAlign: "right" }}>V. unit</th><th style={{ textAlign: "right" }}>Total</th><th></th></tr></thead>
                <tbody>
                  {(itens ?? []).map(i => (
                    <tr key={i.id}>
                      <td><span className="chip" style={{ cursor: "default", fontSize: 10 }}>{i.tipo === "mao_obra" ? "Mão de obra" : "Peça"}</span></td>
                      <td>{i.descricao}</td>
                      <td className="mono" style={{ textAlign: "right" }}>{i.quantidade}</td>
                      <td className="mono">{i.unidade}</td>
                      <td className="mono" style={{ textAlign: "right" }}>{BRL(Number(i.valor_unit))}</td>
                      <td className="mono" style={{ textAlign: "right", fontWeight: 700 }}>{BRL(Number(i.valor_total ?? 0))}</td>
                      <td>
                        <form action={async () => { "use server"; await removerItem(params.num, i.id); }}>
                          <button type="submit" className="btn xs ghost" style={{ color: "var(--vermelho)" }}>×</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: "var(--preto)", color: "var(--papel)" }}>
                    <td colSpan={5} style={{ fontFamily: "Oswald", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 700 }}>Total</td>
                    <td className="mono" style={{ textAlign: "right", fontWeight: 700, fontSize: 16 }}>{BRL(Number(os.valor_total))}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table></div>
              <form action={addItem} className="panel-body pad add-item-form" style={{ display: "grid", gridTemplateColumns: "120px 1fr 80px 80px 120px auto", gap: 10, alignItems: "end", borderTop: "2px solid var(--preto)" }}>
                <div><label className="field-label">Tipo</label><select name="tipo" className="field"><option value="peca">Peça</option><option value="mao_obra">Mão de obra</option></select></div>
                <div><label className="field-label">Descrição</label><input name="descricao" className="field" required /></div>
                <div><label className="field-label">Qtd</label><input name="quantidade" type="number" step="0.01" defaultValue={1} className="field mono" /></div>
                <div><label className="field-label">Un</label><input name="unidade" className="field mono" defaultValue="un" /></div>
                <div><label className="field-label">V. unit (R$)</label><input name="valor_unit" type="number" step="0.01" defaultValue={0} className="field mono" /></div>
                <button type="submit" className="btn sm">+ Item</button>
              </form>
            </div>

            <UploadFotos osNum={os.num} fotos={fotos} />
          </div>

          <div className="panel">
            <div className="panel-head"><span className="panel-title">Timeline</span></div>
            <div style={{ padding: 0 }}>
              {(timeline ?? []).map(t => (
                <div key={t.id} style={{ display: "flex", gap: 14, padding: "14px 18px", borderBottom: "1px solid var(--border-soft)" }}>
                  <div style={{ width: 10, height: 10, marginTop: 6, borderRadius: 999, background: "var(--laranja)", flexShrink: 0, boxShadow: "0 0 0 3px white, 0 0 0 4px var(--preto)" }} />
                  <div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--graxa)", textTransform: "uppercase" }}>{fmtData(t.quando)}</div>
                    <div style={{ fontSize: 14, marginTop: 2 }}>{t.acao}</div>
                    {t.observacao && <div style={{ fontSize: 12, color: "var(--graxa)", marginTop: 2 }}>{t.observacao}</div>}
                  </div>
                </div>
              ))}
              {(!timeline || timeline.length === 0) && (
                <div style={{ textAlign: "center", padding: 24, color: "var(--graxa)" }}>Sem eventos.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
