"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { clienteSchema } from "@/lib/schemas/cliente";

function parseForm(fd: FormData) {
  const obj: Record<string, string | null> = {};
  fd.forEach((v, k) => { obj[k] = v === "" ? null : String(v); });
  return obj;
}

export async function criarCliente(_prev: any, fd: FormData) {
  const parsed = clienteSchema.safeParse(parseForm(fd));
  if (!parsed.success) return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  const supabase = createClient();
  const { error } = await supabase.from("clientes").insert(parsed.data);
  if (error) return { erro: error.message };
  revalidatePath("/clientes");
  redirect(`/clientes/${parsed.data.id}?ok=criado`);
}

export async function atualizarCliente(id: string, _prev: any, fd: FormData) {
  const parsed = clienteSchema.partial({ id: true }).safeParse(parseForm(fd));
  if (!parsed.success) return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  const supabase = createClient();
  const { error } = await supabase.from("clientes").update(parsed.data).eq("id", id);
  if (error) return { erro: error.message };
  revalidatePath(`/clientes/${id}`);
  revalidatePath("/clientes");
  redirect(`/clientes/${id}?ok=atualizado`);
}

export async function excluirCliente(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("clientes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/clientes");
  redirect("/clientes?ok=excluido");
}
