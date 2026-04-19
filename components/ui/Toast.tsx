"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const MENSAGENS: Record<string, string> = {
  criado: "Cadastro criado com sucesso.",
  atualizado: "Alterações salvas.",
  excluido: "Registro excluído.",
};

export default function Toast() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const ok = params.get("ok");
  const [visible, setVisible] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!ok) return;
    setMensagem(MENSAGENS[ok] ?? "Operação concluída.");
    setVisible(true);

    const kept = new URLSearchParams(params.toString());
    kept.delete("ok");
    const qs = kept.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });

    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t);
  }, [ok, pathname, params, router]);

  if (!visible) return null;
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      <div className="toast">
        <span className="toast-dot" />
        {mensagem}
      </div>
    </div>
  );
}
