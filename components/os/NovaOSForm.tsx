"use client";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { UserPlus } from "lucide-react";
import SpinGear from "@/components/ui/SpinGear";
import NovoClienteModal from "@/components/os/NovoClienteModal";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button className="btn" type="submit" disabled={pending}>
      {pending ? <><SpinGear size={15} /> Abrindo…</> : "Abrir OS"}
    </button>
  );
}

export default function NovaOSForm({
  action,
  clientes: clientesIniciais,
  veiculos,
}: {
  action: (prev: unknown, fd: FormData) => Promise<unknown>;
  clientes: { id: string; nome: string }[];
  veiculos: { placa: string; marca: string; modelo: string; cliente_id: string }[];
}) {
  const [state, formAction] = useFormState(action, null);
  const [clientes, setClientes] = useState(clientesIniciais);
  const [cliente, setCliente] = useState<string>("");
  const [modalAberto, setModalAberto] = useState(false);

  const veiculosFiltrados = cliente
    ? veiculos.filter(v => v.cliente_id === cliente)
    : veiculos;

  function handleClienteCriado(novo: { id: string; nome: string }) {
    setClientes(prev => [...prev, novo].sort((a, b) => a.nome.localeCompare(b.nome)));
    setCliente(novo.id);
    setModalAberto(false);
  }

  return (
    <>
      <form action={formAction} className="panel">
        <div className="panel-head"><span className="panel-title">Dados da OS</span></div>
        <div className="panel-body pad form-grid-2">

          {/* Cliente + botão novo */}
          <div className="form-col-2">
            <label className="field-label">Cliente</label>
            <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
              <select
                name="cliente_id"
                className="field"
                required
                style={{ flex: 1 }}
                value={cliente}
                onChange={e => setCliente(e.target.value)}
              >
                <option value="">— Selecione um cliente —</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.id} — {c.nome}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn sm secondary"
                title="Cadastrar novo cliente"
                onClick={() => setModalAberto(true)}
                style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}
              >
                <UserPlus size={14} /> Novo cliente
              </button>
            </div>
          </div>

          {/* Veículo */}
          <div className="form-col-2">
            <label className="field-label">Veículo</label>
            <select name="placa" className="field" required>
              <option value="">— Selecione —</option>
              {veiculosFiltrados.map(v => (
                <option key={v.placa} value={v.placa}>
                  {v.placa} — {v.marca} {v.modelo}
                </option>
              ))}
            </select>
            {cliente && veiculosFiltrados.length === 0 && (
              <div style={{ marginTop: 6, fontSize: 12, color: "var(--graxa)" }}>
                Nenhum veículo cadastrado para este cliente.{" "}
                <a href={`/veiculos/novo?cliente_id=${cliente}`} target="_blank" rel="noreferrer" style={{ color: "var(--laranja)" }}>
                  Cadastrar veículo →
                </a>
              </div>
            )}
          </div>

          {/* Problema */}
          <div className="form-col-2">
            <label className="field-label">Problema relatado</label>
            <textarea
              name="problema"
              className="field"
              rows={3}
              required
              placeholder="Falha em rotação baixa, fumaça preta…"
            />
          </div>

          {/* Previsão e Urgência */}
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

          {/* Erro e submit */}
          {(state as { erro?: string } | null)?.erro && (
            <div className="form-col-2" style={{ color: "var(--vermelho)", fontSize: 13 }}>
              {(state as { erro: string }).erro}
            </div>
          )}
          <div className="form-col-2"><SubmitBtn /></div>
        </div>
      </form>

      {modalAberto && (
        <NovoClienteModal
          onCriado={handleClienteCriado}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </>
  );
}
