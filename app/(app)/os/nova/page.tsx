import Topbar from "@/components/shell/Topbar";
import { createClient } from "@/lib/supabase/server";
import { criarOS } from "@/lib/actions/os";
import NovaOSForm from "@/components/os/NovaOSForm";

export default async function NovaOSPage() {
  const supabase = createClient();
  const { data: clientes } = await supabase.from("clientes").select("id,nome").eq("status", "ativo").order("nome");
  const { data: veiculos } = await supabase.from("veiculos").select("placa,marca,modelo,cliente_id").order("placa");

  return (
    <>
      <Topbar crumb="OS / Nova" />
      <div className="page-pad">
        <div className="page-head-resp" style={{ marginBottom: 24 }}>
          <div>
            <div className="eyebrow">Operação</div>
            <h1 className="page-title" style={{ margin: "6px 0 0" }}>Nova Ordem de Serviço</h1>
          </div>
        </div>
        <NovaOSForm action={criarOS} clientes={clientes ?? []} veiculos={veiculos ?? []} />
      </div>
    </>
  );
}
