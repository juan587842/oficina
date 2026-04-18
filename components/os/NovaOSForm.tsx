"use client";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return <button className="btn" type="submit" disabled={pending}>{pending ? "Abrindo…" : "Abrir OS"}</button>;
}

export default function NovaOSForm({
  action,
  clientes,
  veiculos
}: {
  action: (prev: any, fd: FormData) => Promise<any>;
  clientes: { id: string; nome: string }[];
  veiculos: { placa: string; marca: string; modelo: string; cliente_id: string }[];
}) {
  const [state, formAction] = useFormState(action, null);
  const [cliente, setCliente] = useState<string>("");
  const veiculosFiltrados = cliente ? veiculos.filter(v => v.cliente_id === cliente) : veiculos;

  return (
    <form action={formAction} className="panel">
      <div className="panel-head"><span className="panel-title">Dados da OS</span></div>
      <div className="panel-body pad" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ gridColumn: "span 2" }}>
          <label className="field-label">Cliente</label>
          <select name="cliente_id" className="field" required value={cliente} onChange={e => setCliente(e.target.value)}>
            <option value="">— Selecione —</option>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.id} — {c.nome}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <label className="field-label">Veículo</label>
          <select name="placa" className="field" required>
            <option value="">— Selecione —</option>
            {veiculosFiltrados.map(v => <option key={v.placa} value={v.placa}>{v.placa} — {v.marca} {v.modelo}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <label className="field-label">Problema relatado</label>
          <textarea name="problema" className="field" rows={3} required placeholder="Falha em rotação baixa, fumaça preta…" />
        </div>
        <div>
          <label className="field-label">Previsão de entrega</label>
          <input name="previsao" type="datetime-local" className="field" />
        </div>
        <div>
          <label className="field-label">Urgente?</label>
          <select name="urgente" className="field" defaultValue="false">
            <option value="false">Não</option>
            <option value="true">Sim</option>
          </select>
        </div>
        {state?.erro && <div style={{ gridColumn: "span 2", color: "var(--vermelho)" }}>{state.erro}</div>}
        <div style={{ gridColumn: "span 2" }}><SubmitBtn /></div>
      </div>
    </form>
  );
}
