import { z } from "zod";

export const clienteSchema = z.object({
  id: z.string().min(2, "Código obrigatório").max(20),
  tipo: z.enum(["frota", "autonomo"]),
  nome: z.string().min(2, "Nome obrigatório"),
  cnpj: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  contato: z.string().optional().nullable(),
  telefone: z.string().optional().nullable(),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")).nullable(),
  cidade: z.string().optional().nullable(),
  uf: z.string().max(2).optional().nullable(),
  endereco: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable(),
  status: z.enum(["ativo", "inativo"]).default("ativo")
});

export type ClienteInput = z.infer<typeof clienteSchema>;
