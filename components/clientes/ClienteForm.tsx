"use client";
import { useFormState, useFormStatus } from "react-dom";
import SpinGear from "@/components/ui/SpinGear";

function SubmitBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn" type="submit" disabled={pending}>
      {pending ? <><SpinGear size={15} /> Salvando…</> : label}
    </button>
  );
}

export default function ClienteForm({
  action,
  inicial,
  editar = false
}: {
  action: (prev: any, fd: FormData) => Promise<any>;
  inicial?: Record<string, any>;
  editar?: boolean;
}) {
  const [state, formAction] = useFormState(action, null);
  const v = (k: string) => inicial?.[k] ?? "";

  return (
    <form action={formAction} className="panel">
      <div className="panel-head"><span className="panel-title">{editar ? "Editar cliente" : "Novo cliente"}</span></div>
      <div className="panel-body pad form-grid-2">
        <div>
          <label className="field-label">Código</label>
          <input name="id" className="field mono" defaultValue={v("id")} disabled={editar} required placeholder="C-001" />
        </div>
        <div>
          <label className="field-label">Tipo</label>
          <select name="tipo" className="field" defaultValue={v("tipo") || "frota"}>
            <option value="frota">Frota</option>
            <option value="autonomo">Autônomo</option>
          </select>
        </div>
        <div className="form-col-2">
          <label className="field-label">Nome / Razão social</label>
          <input name="nome" className="field" defaultValue={v("nome")} required />
        </div>
        <div>
          <label className="field-label">CNPJ</label>
          <input name="cnpj" className="field mono" defaultValue={v("cnpj")} />
        </div>
        <div>
          <label className="field-label">CPF</label>
          <input name="cpf" className="field mono" defaultValue={v("cpf")} />
        </div>
        <div>
          <label className="field-label">Pessoa de contato</label>
          <input name="contato" className="field" defaultValue={v("contato")} />
        </div>
        <div>
          <label className="field-label">Telefone</label>
          <input name="telefone" className="field mono" defaultValue={v("telefone")} />
        </div>
        <div>
          <label className="field-label">E-mail</label>
          <input name="email" type="email" className="field" defaultValue={v("email")} />
        </div>
        <div>
          <label className="field-label">Cidade</label>
          <input name="cidade" className="field" defaultValue={v("cidade")} />
        </div>
        <div>
          <label className="field-label">UF</label>
          <input name="uf" className="field" maxLength={2} defaultValue={v("uf")} />
        </div>
        <div>
          <label className="field-label">Status</label>
          <select name="status" className="field" defaultValue={v("status") || "ativo"}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
        <div className="form-col-2">
          <label className="field-label">Endereço</label>
          <input name="endereco" className="field" defaultValue={v("endereco")} />
        </div>
        <div className="form-col-2">
          <label className="field-label">Observações</label>
          <textarea name="observacoes" className="field" rows={3} defaultValue={v("observacoes")} />
        </div>
        {state?.erro && <div className="form-col-2" style={{ color: "var(--vermelho)" }}>{state.erro}</div>}
        <div className="form-col-2" style={{ display: "flex", gap: 10 }}>
          <SubmitBtn label={editar ? "Salvar alterações" : "Cadastrar cliente"} />
        </div>
      </div>
    </form>
  );
}
