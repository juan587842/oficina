"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search } from "lucide-react";

export default function BuscaClientes() {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const buscar = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value.trim();
    const tipo = params.get("tipo");
    const url = new URLSearchParams();
    if (tipo) url.set("tipo", tipo);
    if (q) url.set("q", q);
    startTransition(() => router.push(`/clientes${url.toString() ? `?${url}` : ""}`));
  }, [params, router]);

  return (
    <form onSubmit={buscar} style={{ display: "flex", gap: 0, flex: 1, minWidth: 0, maxWidth: 400 }}>
      <input
        name="q"
        defaultValue={params.get("q") ?? ""}
        placeholder="Buscar por nome, CNPJ ou CPF…"
        className="field"
        style={{ borderRadius: "2px 0 0 2px", borderRight: "none" }}
      />
      <button type="submit" style={{
        padding: "0 14px", border: "2px solid var(--preto)", borderLeft: "none",
        background: "var(--preto)", color: "var(--papel)", borderRadius: "0 2px 2px 0",
        cursor: "pointer", display: "flex", alignItems: "center"
      }}>
        <Search size={16} />
      </button>
    </form>
  );
}
