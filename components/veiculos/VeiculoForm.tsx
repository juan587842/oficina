"use client";
import { useFormState, useFormStatus } from "react-dom";

function SubmitBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <button className="btn" type="submit" disabled={pending}>{pending ? "Salvando…" : label}</button>;
}

export default function VeiculoForm({
  action,
  clientes,
  inicial,
  editar = false
}: {
  action: (prev: any, fd: FormData) => Promise<any>;
  clientes: { id: string; nome: string }[];
  inicial?: Record<string, any>;
  editar?: boolean;
}) {
  const [state, formAction] = useFormState(action, null);
  const v = (k: string) => inicial?.[k] ?? "";

  return (
    <form action={formAction} className="panel">
      <div className="panel-head"><span className="panel-title">{editar ? "Editar veículo" : "Novo veículo"}</span></div>
      <div className="panel-body pad" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label className="field-label">Placa</label>
          <input name="placa" className="field mono" defaultValue={v("placa")} required disabled={editar} placeholder="ABC-1D23" />
        </div>
        <div>
          <label className="field-label">Cliente</label>
          <select name="cliente_id" className="field" defaultValue={v("cliente_id")} required>
            <option value="">— Selecione —</option>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.id} — {c.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="field-label">Marca</label>
          <input name="marca" className="field" defaultValue={v("marca")} required placeholder="Scania" />
        </div>
        <div>
          <label className="field-label">Modelo</label>
          <input name="modelo" className="field" defaultValue={v("modelo")} required placeholder="R 450" />
        </div>
        <div>
          <label className="field-label">Ano</label>
          <input name="ano" type="number" className="field mono" defaultValue={v("ano")} />
        </div>
        <div>
          <label className="field-label">KM atual</label>
          <input name="km_atual" type="number" className="field mono" defaultValue={v("km_atual")} />
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <label className="field-label">Tipo</label>
          <input name="tipo" className="field" defaultValue={v("tipo")} placeholder="caminhão, cavalo, carreta…" />
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <label className="field-label">Observações</label>
          <textarea name="observacoes" className="field" rows={3} defaultValue={v("observacoes")} />
        </div>
        {state?.erro && <div style={{ gridColumn: "span 2", color: "var(--vermelho)" }}>{state.erro}</div>}
        <div style={{ gridColumn: "span 2" }}>
          <SubmitBtn label={editar ? "Salvar alterações" : "Cadastrar veículo"} />
        </div>
      </div>
    </form>
  );
}
