"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SpinGear from "@/components/ui/SpinGear";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setLoading(false);
    if (error) return setErro(error.message);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="login-wrap hazard-stripes">
      <div className="login-brand">
        <div style={{ background: "var(--preto)", color: "var(--papel)", padding: "40px", border: "2px solid var(--preto)", maxWidth: 420, boxShadow: "var(--shadow-md)" }}>
          <div className="eyebrow" style={{ color: "var(--laranja)" }}>Fabio Mecânica Diesel</div>
          <h1 style={{ fontFamily: "Oswald", fontSize: 44, fontWeight: 700, textTransform: "uppercase", lineHeight: 1, margin: "12px 0" }}>
            A gente cuida do seu caminhão.
          </h1>
          <p style={{ color: "#B8B6B0", fontFamily: "JetBrains Mono", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Sistema interno · Acesso restrito
          </p>
        </div>
      </div>

      <div className="login-form-side">
        <form onSubmit={entrar} className="panel" style={{ width: "100%", maxWidth: 420, padding: 0 }}>
          <div className="panel-head"><span className="panel-title">Entrar</span></div>
          <div className="panel-body pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label className="field-label">E-mail</label>
              <input className="field" type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div>
              <label className="field-label">Senha</label>
              <input className="field" type="password" required value={senha} onChange={e => setSenha(e.target.value)} autoComplete="current-password" />
            </div>
            {erro && <div style={{ color: "var(--vermelho)", fontSize: 13 }}>{erro}</div>}
            <button className="btn" type="submit" disabled={loading}>
              {loading ? <><SpinGear size={15} /> Entrando…</> : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
