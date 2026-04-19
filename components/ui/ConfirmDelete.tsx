"use client";
import { useState } from "react";
import SpinGear from "./SpinGear";

export default function ConfirmDelete({
  action,
  label = "Excluir",
  title,
  description,
  confirmText,
}: {
  action: () => Promise<void>;
  label?: string;
  title: string;
  description?: string;
  confirmText: string;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ok = input.trim().toUpperCase() === confirmText.toUpperCase();

  async function submit() {
    if (!ok || loading) return;
    setLoading(true);
    try {
      await action();
    } finally {
      setLoading(false);
    }
  }

  function close() {
    if (loading) return;
    setOpen(false);
    setInput("");
  }

  return (
    <>
      <button type="button" className="btn xs secondary" onClick={() => setOpen(true)}>
        {label}
      </button>
      {open && (
        <div className="confirm-overlay" onClick={close}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="confirm-title">{title}</div>
            {description && <p className="confirm-desc">{description}</p>}
            <p className="confirm-desc">
              Para confirmar, digite <strong className="mono">{confirmText}</strong>:
            </p>
            <input
              className="field mono"
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              disabled={loading}
              onKeyDown={e => { if (e.key === "Enter") submit(); }}
            />
            <div className="confirm-actions">
              <button type="button" className="btn xs ghost" onClick={close} disabled={loading}>
                Cancelar
              </button>
              <button type="button" className="btn xs danger" onClick={submit} disabled={!ok || loading}>
                {loading ? <><SpinGear size={13} /> Excluindo…</> : "Excluir definitivamente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
