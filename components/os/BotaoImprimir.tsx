"use client";
import { Printer } from "lucide-react";

export default function BotaoImprimir() {
  return (
    <button type="button" className="btn sm" onClick={() => window.print()}>
      <Printer size={14} /> Imprimir / Salvar PDF
    </button>
  );
}
