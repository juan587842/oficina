import Topbar from "@/components/shell/Topbar";
import VeiculoForm from "@/components/veiculos/VeiculoForm";
import { createClient } from "@/lib/supabase/server";
import { criarVeiculo } from "@/lib/actions/veiculos";

export default async function NovoVeiculoPage({ searchParams }: { searchParams: { cliente?: string } }) {
  const supabase = createClient();
  const { data: clientes } = await supabase.from("clientes").select("id,nome").eq("status", "ativo").order("nome");
  return (
    <>
      <Topbar crumb="Veículos / Novo" />
      <div style={{ padding: 28, maxWidth: 900 }}>
        <div className="eyebrow">Cadastros</div>
        <h1 className="page-title" style={{ margin: "6px 0 20px" }}>Novo veículo</h1>
        <VeiculoForm action={criarVeiculo} clientes={clientes ?? []} inicial={searchParams.cliente ? { cliente_id: searchParams.cliente } : undefined} />
      </div>
    </>
  );
}
