"use client";
import { MessageCircle } from "lucide-react";

type Item = { tipo: string; descricao: string; quantidade: number | string; valor_total: number | string | null };

function limpaTelefone(tel?: string | null) {
  if (!tel) return "";
  const d = tel.replace(/\D/g, "");
  if (!d) return "";
  return d.startsWith("55") ? d : `55${d}`;
}

function BRL(n: number) {
  return "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function BotaoWhatsApp({
  num, problema, placa, clienteNome, telefone, valorTotal, itens
}: {
  num: string;
  problema: string;
  placa: string;
  clienteNome: string;
  telefone?: string | null;
  valorTotal: number;
  itens: Item[];
}) {
  const tel = limpaTelefone(telefone);
  if (!tel) return (
    <span className="mono" style={{ fontSize: 11, color: "var(--graxa)", padding: "6px 10px", border: "1px dashed var(--graxa)", borderRadius: 3 }}>
      Cliente sem telefone
    </span>
  );

  const linhas = [
    `*OS ${num}* — Fabio Mecânica Diesel`,
    `Olá, ${clienteNome.split(" ")[0] || clienteNome}!`,
    `Segue o orçamento do veículo placa *${placa}*:`,
    ``,
    `*Problema:* ${problema}`,
    ``
  ];
  if (itens.length) {
    linhas.push(`*Itens:*`);
    itens.forEach(i => {
      const tot = Number(i.valor_total ?? 0);
      const label = i.tipo === "mao_obra" ? "MO" : "Peça";
      linhas.push(`• ${label} — ${i.descricao} (${i.quantidade}x) — ${BRL(tot)}`);
    });
    linhas.push(``);
  }
  linhas.push(`*Total: ${BRL(valorTotal)}*`);
  linhas.push(``);
  linhas.push(`Qualquer dúvida, estamos à disposição.`);

  const url = `https://wa.me/${tel}?text=${encodeURIComponent(linhas.join("\n"))}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="btn xs" style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "#25D366", color: "#000", boxShadow: "4px 4px 0 0 var(--preto)"
    }}>
      <MessageCircle size={13} /> Enviar WhatsApp
    </a>
  );
}
