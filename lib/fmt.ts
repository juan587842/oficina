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
  return new Date(s).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

export const fmtDataSimples = (s: string | null | undefined) => {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("pt-BR");
};
