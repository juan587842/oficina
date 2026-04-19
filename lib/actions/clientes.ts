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

export async function criarCliente(_prev: unknown, fd: FormData) {
  const parsed = clienteSchema.safeParse(parseForm(fd));
  if (!parsed.success) return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { erro: "Não autorizado." };
  const { error } = await supabase.from("clientes").insert(parsed.data);
  if (error) return { erro: error.message };
  revalidatePath("/clientes");
  redirect(`/clientes/${parsed.data.id}?ok=criado`);
}

export async function atualizarCliente(id: string, _prev: unknown, fd: FormData) {
  const parsed = clienteSchema.partial({ id: true }).safeParse(parseForm(fd));
  if (!parsed.success) return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { erro: "Não autorizado." };
  const { error } = await supabase.from("clientes").update(parsed.data).eq("id", id);
  if (error) return { erro: error.message };
  revalidatePath(`/clientes/${id}`);
  revalidatePath("/clientes");
  redirect(`/clientes/${id}?ok=atualizado`);
}

/** Versão sem redirect — usada no modal da Nova OS */
export async function criarClienteRapido(
  _prev: unknown,
  fd: FormData
): Promise<{ erro?: string; cliente?: { id: string; nome: string } }> {
  const parsed = clienteSchema.safeParse(
    Object.fromEntries(
      Array.from(fd.entries()).map(([k, v]) => [k, v === "" ? null : String(v)])
    )
  );
  if (!parsed.success) return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { erro: "Não autorizado." };
  const { error } = await supabase.from("clientes").insert(parsed.data);
  if (error) return { erro: error.message };
  revalidatePath("/clientes");
  return { cliente: { id: parsed.data.id, nome: parsed.data.nome } };
}

export async function excluirCliente(id: string): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado.");
  const { error } = await supabase.from("clientes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/clientes");
  redirect("/clientes?ok=excluido");
}
