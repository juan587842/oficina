import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import AppShell from "@/components/shell/AppShell";
import Toast from "@/components/ui/Toast";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ count: osCount }, { count: clientesCount }, { count: veiculosCount }, { data: profile }] = await Promise.all([
    supabase.from("ordens_servico").select("*", { count: "exact", head: true }).in("status", ["aberta","andamento","aguardando"]),
    supabase.from("clientes").select("*", { count: "exact", head: true }).eq("status", "ativo"),
    supabase.from("veiculos").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("nome,papel").eq("id", user.id).maybeSingle()
  ]);

  return (
    <AppShell
      counts={{ os: osCount ?? 0, clientes: clientesCount ?? 0, veiculos: veiculosCount ?? 0 }}
      user={{ nome: profile?.nome ?? user.email ?? "Usuário", papel: profile?.papel ?? "recepcao" }}
    >
      {children}
      <Suspense fallback={null}><Toast /></Suspense>
    </AppShell>
  );
}
