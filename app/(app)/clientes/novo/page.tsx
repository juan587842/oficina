import Topbar from "@/components/shell/Topbar";
import ClienteForm from "@/components/clientes/ClienteForm";
import { criarCliente } from "@/lib/actions/clientes";

export default function NovoClientePage() {
  return (
    <>
      <Topbar crumb="Clientes / Novo" />
      <div style={{ padding: 28, maxWidth: 900 }}>
        <div className="eyebrow">Cadastros</div>
        <h1 className="page-title" style={{ margin: "6px 0 20px" }}>Novo cliente</h1>
        <ClienteForm action={criarCliente} />
      </div>
    </>
  );
}
