"use client";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { criarClienteRapido } from "@/lib/actions/clientes";
import SpinGear from "@/components/ui/SpinGear";
import { X } from "lucide-react";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button className="btn sm" type="submit" disabled={pending}>
      {pending ? <><SpinGear size={13} /> Salvando…</> : "Salvar cliente"}
    </button>
  );
}

function gerarId(nome: string): string {
  return nome
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toUpperCase().replace(/[^A-Z0-9\s]/g, "")
    .trim().split(/\s+/).slice(0, 3).join("-")
    .slice(0, 20);
}

export default function NovoClienteModal({
  onCriado,
  onFechar,
}: {
  onCriado: (cliente: { id: string; nome: string }) => void;
  onFechar: () => void;
}) {
  const [state, formAction] = useFormState(criarClienteRapido, null);
  const [tipo, setTipo] = useState<"frota" | "autonomo">("autonomo");
  const [nome, setNome] = useState("");
  const [idSugerido, setIdSugerido] = useState("");

  /* Gera código sugerido ao digitar o nome */
  useEffect(() => {
    setIdSugerido(nome ? gerarId(nome) : "");
  }, [nome]);

  /* Fecha o modal e seleciona o cliente após criação bem-sucedida */
  useEffect(() => {
    if (state?.cliente) onCriado(state.cliente);
  }, [state, onCriado]);

  return (
    <div className="confirm-overlay" onClick={onFechar}>
      <div
        className="confirm-modal"
        style={{ maxWidth: 520 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, paddingBottom: 14, borderBottom: "2px solid var(--preto)" }}>
          <div>
            <div className="eyebrow" style={{ fontSize: 11, marginBottom: 2 }}>Cadastro rápido</div>
            <div className="confirm-title" style={{ margin: 0, padding: 0, border: 0, fontSize: 20 }}>
              Novo Cliente
            </div>
          </div>
          <button
            type="button"
            onClick={onFechar}
            style={{ background: "none", border: 0, cursor: "pointer", color: "var(--graxa)", padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Tipo */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label className="field-label">Tipo *</label>
              <select
                name="tipo"
                className="field"
                value={tipo}
                onChange={e => setTipo(e.target.value as "frota" | "autonomo")}
                required
              >
                <option value="autonomo">Autônomo</option>
                <option value="frota">Frota (empresa)</option>
              </select>
            </div>
            <div>
              <label className="field-label">
                {tipo === "frota" ? "CNPJ" : "CPF"}
                <span style={{ color: "var(--graxa)", marginLeft: 4, fontWeight: 400 }}>(opcional)</span>
              </label>
              <input
                name={tipo === "frota" ? "cnpj" : "cpf"}
                className="field"
                placeholder={tipo === "frota" ? "00.000.000/0001-00" : "000.000.000-00"}
              />
              {/* garante que o campo do outro tipo não seja enviado */}
              <input type="hidden" name={tipo === "frota" ? "cpf" : "cnpj"} value="" />
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="field-label">Nome / Razão social *</label>
            <input
              name="nome"
              className="field"
              required
              placeholder={tipo === "frota" ? "Transportadora Exemplo Ltda." : "João da Silva"}
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </div>

          {/* Código */}
          <div>
            <label className="field-label">
              Código *
              <span style={{ color: "var(--graxa)", fontWeight: 400, marginLeft: 4 }}>(identificador único)</span>
            </label>
            <input
              name="id"
              className="field mono"
              required
              placeholder="Ex: JOAO-SILVA"
              defaultValue={idSugerido}
              key={idSugerido}
              style={{ textTransform: "uppercase" }}
              maxLength={20}
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="field-label">
              Telefone
              <span style={{ color: "var(--graxa)", fontWeight: 400, marginLeft: 4 }}>(opcional)</span>
            </label>
            <input name="telefone" className="field" placeholder="(00) 90000-0000" />
          </div>

          {/* Campos ocultos com defaults */}
          <input type="hidden" name="status" value="ativo" />

          {state?.erro && (
            <div style={{ color: "var(--vermelho)", fontSize: 13, background: "#FFF0F0", border: "1px solid var(--vermelho)", borderRadius: 3, padding: "10px 14px" }}>
              {state.erro}
            </div>
          )}

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 4 }}>
            <button type="button" className="btn sm ghost" onClick={onFechar}>
              Cancelar
            </button>
            <SubmitBtn />
          </div>
        </form>
      </div>
    </div>
  );
}
