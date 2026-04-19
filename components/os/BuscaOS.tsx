"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, X } from "lucide-react";

export default function BuscaOS() {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const atual = params.get("q") ?? "";

  const buscar = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value.trim();
    const url = new URLSearchParams();
    if (q) url.set("q", q);
    startTransition(() => router.push(`/os${url.toString() ? `?${url}` : ""}`));
  }, [router]);

  const limpar = useCallback(() => {
    startTransition(() => router.push("/os"));
  }, [router]);

  return (
    <form onSubmit={buscar} style={{ display: "flex", gap: 0, flex: 1, minWidth: 0, maxWidth: 400 }}>
      <input
        name="q"
        defaultValue={atual}
        placeholder="Buscar por OS, placa ou cliente…"
        className="field"
        style={{ borderRadius: "2px 0 0 2px", borderRight: "none" }}
      />
      {atual && (
        <button type="button" onClick={limpar} title="Limpar" style={{
          padding: "0 10px", border: "2px solid var(--preto)", borderLeft: "none", borderRight: "none",
          background: "var(--papel)", color: "var(--preto)", cursor: "pointer",
          display: "flex", alignItems: "center"
        }}>
          <X size={14} />
        </button>
      )}
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
