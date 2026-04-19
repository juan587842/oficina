export const BRL = (n: number | null | undefined) =>
  "R$ " + (n ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const statusLabel = (s: string) =>
  ({
    aberta: "ABERTA",
    andamento: "EM ANDAMENTO",
    aguardando: "AGUARDANDO",
    concluida: "CONCLUÍDA",
    faturada: "FATURADA",
    cancelada: "CANCELADA"
  }[s] ?? s.toUpperCase());

export const fmtData = (s: string | null | undefined) => {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

export const fmtDataSimples = (s: string | null | undefined) => {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR");
};
