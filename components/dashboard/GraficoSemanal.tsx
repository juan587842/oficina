"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

type Ponto = { dia: string; os: number; valor: number };

interface Props {
  dados: Ponto[];
}

const TooltipCustom = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--preto)", border: "1px solid var(--aco)", borderRadius: 4,
      padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: 13
    }}>
      <p style={{ color: "var(--concreto)", marginBottom: 4, fontWeight: 600 }}>{label}</p>
      <p style={{ color: "var(--laranja)" }}>OS: <strong>{payload[0]?.value ?? 0}</strong></p>
      <p style={{ color: "var(--verde)" }}>
        Valor: <strong>
          {(payload[1]?.value ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
        </strong>
      </p>
    </div>
  );
};

export default function GraficoSemanal({ dados }: Props) {
  if (!dados.length) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, color: "var(--graxa)", fontSize: 14 }}>
        Nenhum dado disponível ainda.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={dados} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barCategoryGap="28%">
        <CartesianGrid vertical={false} stroke="var(--aco)" strokeDasharray="3 3" />
        <XAxis
          dataKey="dia"
          tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--graxa)" }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          yAxisId="os"
          orientation="left"
          tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--graxa)" }}
          axisLine={false} tickLine={false}
          width={24}
          allowDecimals={false}
        />
        <YAxis
          yAxisId="valor"
          orientation="right"
          tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--graxa)" }}
          axisLine={false} tickLine={false}
          width={60}
          tickFormatter={(v) => `R$${Math.round(v / 1000)}k`}
        />
        <Tooltip content={<TooltipCustom />} cursor={{ fill: "rgba(255,106,26,0.06)" }} />
        <Bar yAxisId="os" dataKey="os" fill="var(--laranja)" radius={[2, 2, 0, 0]} maxBarSize={36} />
        <Bar yAxisId="valor" dataKey="valor" fill="var(--verde)" radius={[2, 2, 0, 0]} maxBarSize={36} opacity={0.75} />
      </BarChart>
    </ResponsiveContainer>
  );
}
