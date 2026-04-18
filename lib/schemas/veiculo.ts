import { z } from "zod";

export const veiculoSchema = z.object({
  placa: z.string().min(5, "Placa obrigatória").max(10).transform(s => s.toUpperCase()),
  cliente_id: z.string().min(1, "Cliente obrigatório"),
  marca: z.string().min(1, "Marca obrigatória"),
  modelo: z.string().min(1, "Modelo obrigatório"),
  ano: z.coerce.number().int().min(1950).max(2100).optional().nullable(),
  km_atual: z.coerce.number().int().min(0).optional().nullable(),
  tipo: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable()
});

export type VeiculoInput = z.infer<typeof veiculoSchema>;
