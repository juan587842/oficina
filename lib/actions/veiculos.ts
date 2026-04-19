"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { veiculoSchema } from "@/lib/schemas/veiculo";

function parseForm(fd: FormData) {
  const obj: Record<string, string | null> = {};
  fd.forEach((v, k) => { obj[k] = v === "" ? null : String(v); });
  return obj;
}

export async function criarVeiculo(_prev: unknown, fd: FormData) {
  const parsed = veiculoSchema.safeParse(parseForm(fd));
  if (!parsed.success) return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { erro: "Não autorizado." };
  const { error } = await supabase.from("veiculos").insert(parsed.data);
  if (error) return { erro: error.message };
  revalidatePath("/veiculos");
  revalidatePath(`/clientes/${parsed.data.cliente_id}`);
  redirect("/veiculos?ok=criado");
}

export async function atualizarVeiculo(placa: string, _prev: unknown, fd: FormData) {
  const parsed = veiculoSchema.partial({ placa: true }).safeParse(parseForm(fd));
  if (!parsed.success) return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { erro: "Não autorizado." };
  const { error } = await supabase.from("veiculos").update(parsed.data).eq("placa", placa);
  if (error) return { erro: error.message };
  revalidatePath(`/veiculos/${placa}`);
  revalidatePath("/veiculos");
  redirect(`/veiculos/${placa}?ok=atualizado`);
}

export async function excluirVeiculo(placa: string): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado.");
  const { error } = await supabase.from("veiculos").delete().eq("placa", placa);
  if (error) throw new Error(error.message);
  revalidatePath("/veiculos");
  redirect("/veiculos?ok=excluido");
}
