import Topbar from "@/components/shell/Topbar";
import ClienteForm from "@/components/clientes/ClienteForm";
import { criarCliente } from "@/lib/actions/clientes";

export default function NovoClientePage() {
  return (
    <>
      <Topbar crumb="Clientes / Novo" />
      <div className="page-pad">
        <div className="page-head-resp" style={{ marginBottom: 24 }}>
          <div>
            <div className="eyebrow">Cadastros</div>
            <h1 className="page-title" style={{ margin: "6px 0 0" }}>Novo cliente</h1>
          </div>
        </div>
        <ClienteForm action={criarCliente} />
      </div>
    </>
  );
}
