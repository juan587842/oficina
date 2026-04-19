"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function criarOS(_prev: any, fd: FormData) {
  const cliente_id = String(fd.get("cliente_id") ?? "");
  const placa = String(fd.get("placa") ?? "");
  const problema = String(fd.get("problema") ?? "");
  const previsao = String(fd.get("previsao") ?? "");
  const urgente = String(fd.get("urgente") ?? "false") === "true";

  if (!cliente_id || !placa || !problema) return { erro: "Preencha cliente, veículo e problema." };

  const supabase = createClient();
  const { data: numRow, error: errNum } = await supabase.rpc("gerar_numero_os");
  if (errNum || !numRow) return { erro: errNum?.message ?? "Falha ao gerar número da OS" };

  const { error } = await supabase.from("ordens_servico").insert({
    num: numRow,
    cliente_id, placa, problema,
    previsao: previsao ? new Date(previsao).toISOString() : null,
    urgente,
    status: "aberta"
  });
  if (error) return { erro: error.message };

  revalidatePath("/os");
  redirect(`/os/${numRow}?ok=criado`);
}

export async function mudarStatusOS(num: string, status: string) {
  const supabase = createClient();
  const patch: { status: string; conclusao?: string } = { status };
  if (status === "concluida") patch.conclusao = new Date().toISOString();
  const { error } = await supabase.from("ordens_servico").update(patch).eq("num", num);
  if (error) return { erro: error.message };
  revalidatePath("/os");
  revalidatePath(`/os/${num}`);
  return { ok: true };
}

export async function adicionarItem(num: string, fd: FormData) {
  const supabase = createClient();
  const { error } = await supabase.from("os_itens").insert({
    os_num: num,
    tipo: String(fd.get("tipo") ?? "peca"),
    descricao: String(fd.get("descricao") ?? ""),
    quantidade: Number(fd.get("quantidade") ?? 1),
    unidade: String(fd.get("unidade") ?? "un"),
    valor_unit: Number(fd.get("valor_unit") ?? 0)
  });
  if (error) return { erro: error.message };
  revalidatePath(`/os/${num}`);
  return { ok: true };
}

export async function removerItem(num: string, id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("os_itens").delete().eq("id", id);
  if (error) return { erro: error.message };
  revalidatePath(`/os/${num}`);
  return { ok: true };
}
