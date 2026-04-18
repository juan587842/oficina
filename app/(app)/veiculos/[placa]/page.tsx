import { notFound } from "next/navigation";
import Topbar from "@/components/shell/Topbar";
import VeiculoForm from "@/components/veiculos/VeiculoForm";
import { createClient } from "@/lib/supabase/server";
import { atualizarVeiculo, excluirVeiculo } from "@/lib/actions/veiculos";

export const dynamic = "force-dynamic";

export default async function VeiculoDetailPage({ params }: { params: { placa: string } }) {
  const supabase = createClient();
  const [{ data: veiculo }, { data: clientes }] = await Promise.all([
    supabase.from("veiculos").select("*").eq("placa", params.placa).maybeSingle(),
    supabase.from("clientes").select("id,nome").eq("status", "ativo").order("nome")
  ]);
  if (!veiculo) notFound();

  const update = atualizarVeiculo.bind(null, params.placa);
  const del = excluirVeiculo.bind(null, params.placa);

  return (
    <>
      <Topbar crumb={`Veículos / ${veiculo.placa}`} />
      <div style={{ padding: 28, maxWidth: 900 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div className="eyebrow">Cadastros</div>
            <h1 className="page-title" style={{ margin: "6px 0" }}>{veiculo.marca} {veiculo.modelo}</h1>
            <span className="placa">{veiculo.placa}</span>
          </div>
          <form action={del}>
            <button type="submit" className="btn xs secondary">Excluir</button>
          </form>
        </div>
        <VeiculoForm action={update} clientes={clientes ?? []} inicial={veiculo} editar />
      </div>
    </>
  );
}
