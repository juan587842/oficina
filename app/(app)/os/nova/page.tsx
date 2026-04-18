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
      <div style={{ padding: 28, maxWidth: 900 }}>
        <div className="eyebrow">Operação</div>
        <h1 className="page-title" style={{ margin: "6px 0 20px" }}>Nova Ordem de Serviço</h1>
        <NovaOSForm action={criarOS} clientes={clientes ?? []} veiculos={veiculos ?? []} />
      </div>
    </>
  );
}
