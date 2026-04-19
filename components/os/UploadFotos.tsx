"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ImagePlus, Trash2 } from "lucide-react";
import SpinGear from "@/components/ui/SpinGear";

export default function UploadFotos({ osNum, fotos }: {
  osNum: string;
  fotos: { id: string; path: string; descricao: string | null; signedUrl: string }[];
}) {
  const router = useRouter();
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [descricao, setDescricao] = useState("");

  async function enviarArquivos(files: FileList | null) {
    if (!files || files.length === 0) return;
    setErro(null);
    setUploading(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${osNum}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("os-fotos").upload(path, file, {
          contentType: file.type || "image/jpeg",
          upsert: false,
        });
        if (upErr) throw new Error(upErr.message);
        const { error: insErr } = await supabase.from("os_fotos").insert({
          os_num: osNum, path, descricao: descricao || null, autor_id: auth.user?.id ?? null
        });
        if (insErr) throw new Error(insErr.message);
      }
      setDescricao("");
      if (inputRef.current) inputRef.current.value = "";
      router.refresh();
    } catch (e: any) {
      setErro(e.message ?? "Falha no upload");
    } finally {
      setUploading(false);
    }
  }

  async function excluir(id: string, path: string) {
    if (!confirm("Remover esta foto?")) return;
    setUploading(true);
    try {
      await supabase.storage.from("os-fotos").remove([path]);
      await supabase.from("os_fotos").delete().eq("id", id);
      router.refresh();
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="panel">
      <div className="panel-head"><span className="panel-title">Fotos</span></div>
      <div className="panel-body pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "end" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label className="field-label">Descrição (opcional)</label>
            <input
              className="field"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Ex.: bico injetor antes"
              disabled={uploading}
            />
          </div>
          <label className="btn sm" style={{ cursor: uploading ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            {uploading ? <><SpinGear size={14} /> Enviando…</> : <><ImagePlus size={14} /> Adicionar fotos</>}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              disabled={uploading}
              onChange={e => enviarArquivos(e.target.files)}
            />
          </label>
        </div>
        {erro && <div style={{ color: "var(--vermelho)", fontSize: 13 }}>{erro}</div>}

        {fotos.length === 0 ? (
          <div style={{ textAlign: "center", padding: 16, color: "var(--graxa)", fontSize: 13 }}>
            Nenhuma foto ainda.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
            {fotos.map(f => (
              <div key={f.id} style={{ border: "2px solid var(--preto)", borderRadius: 3, overflow: "hidden", background: "var(--papel)", position: "relative" }}>
                <a href={f.signedUrl} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.signedUrl} alt={f.descricao ?? `Foto da OS ${osNum}`} style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }} />
                </a>
                {f.descricao && (
                  <div style={{ padding: "4px 8px", fontSize: 11, borderTop: "1px solid var(--border-soft)", fontFamily: "JetBrains Mono, monospace" }}>{f.descricao}</div>
                )}
                <button
                  type="button"
                  onClick={() => excluir(f.id, f.path)}
                  disabled={uploading}
                  title="Remover"
                  style={{
                    position: "absolute", top: 4, right: 4,
                    background: "var(--vermelho)", color: "white", border: 0, borderRadius: 2,
                    padding: 4, cursor: uploading ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center"
                  }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
