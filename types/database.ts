export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      clientes: {
        Row: {
          cidade: string | null
          cnpj: string | null
          contato: string | null
          cpf: string | null
          created_at: string
          email: string | null
          endereco: string | null
          id: string
          nome: string
          observacoes: string | null
          status: string
          telefone: string | null
          tipo: string
          uf: string | null
          updated_at: string
        }
        Insert: {
          cidade?: string | null
          cnpj?: string | null
          contato?: string | null
          cpf?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          id: string
          nome: string
          observacoes?: string | null
          status?: string
          telefone?: string | null
          tipo: string
          uf?: string | null
          updated_at?: string
        }
        Update: {
          cidade?: string | null
          cnpj?: string | null
          contato?: string | null
          cpf?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          status?: string
          telefone?: string | null
          tipo?: string
          uf?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ordens_servico: {
        Row: {
          cliente_id: string
          conclusao: string | null
          created_at: string
          entrada: string
          forma_pagamento: string | null
          garantia_dias: number | null
          mecanico_id: string | null
          num: string
          observacoes: string | null
          placa: string
          previsao: string | null
          problema: string | null
          status: string
          updated_at: string
          urgente: boolean
          valor_total: number
        }
        Insert: {
          cliente_id: string
          conclusao?: string | null
          created_at?: string
          entrada?: string
          forma_pagamento?: string | null
          garantia_dias?: number | null
          mecanico_id?: string | null
          num: string
          observacoes?: string | null
          placa: string
          previsao?: string | null
          problema?: string | null
          status?: string
          updated_at?: string
          urgente?: boolean
          valor_total?: number
        }
        Update: {
          cliente_id?: string
          conclusao?: string | null
          created_at?: string
          entrada?: string
          forma_pagamento?: string | null
          garantia_dias?: number | null
          mecanico_id?: string | null
          num?: string
          observacoes?: string | null
          placa?: string
          previsao?: string | null
          problema?: string | null
          status?: string
          updated_at?: string
          urgente?: boolean
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "ordens_servico_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ordens_servico_mecanico_id_fkey"
            columns: ["mecanico_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ordens_servico_placa_fkey"
            columns: ["placa"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["placa"]
          }
        ]
      }
      os_fotos: {
        Row: {
          autor_id: string | null
          created_at: string
          descricao: string | null
          id: string
          os_num: string
          path: string
        }
        Insert: {
          autor_id?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          os_num: string
          path: string
        }
        Update: {
          autor_id?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          os_num?: string
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "os_fotos_autor_id_fkey"
            columns: ["autor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "os_fotos_os_num_fkey"
            columns: ["os_num"]
            isOneToOne: false
            referencedRelation: "ordens_servico"
            referencedColumns: ["num"]
          }
        ]
      }
      os_itens: {
        Row: {
          created_at: string
          descricao: string
          id: string
          ordem: number
          os_num: string
          quantidade: number
          tipo: string
          unidade: string
          valor_total: number | null
          valor_unit: number
        }
        Insert: {
          created_at?: string
          descricao: string
          id?: string
          ordem?: number
          os_num: string
          quantidade?: number
          tipo: string
          unidade?: string
          valor_total?: number | null
          valor_unit?: number
        }
        Update: {
          created_at?: string
          descricao?: string
          id?: string
          ordem?: number
          os_num?: string
          quantidade?: number
          tipo?: string
          unidade?: string
          valor_total?: number | null
          valor_unit?: number
        }
        Relationships: [
          {
            foreignKeyName: "os_itens_os_num_fkey"
            columns: ["os_num"]
            isOneToOne: false
            referencedRelation: "ordens_servico"
            referencedColumns: ["num"]
          }
        ]
      }
      os_timeline: {
        Row: {
          acao: string
          autor_id: string | null
          id: string
          observacao: string | null
          os_num: string
          quando: string
        }
        Insert: {
          acao: string
          autor_id?: string | null
          id?: string
          observacao?: string | null
          os_num: string
          quando?: string
        }
        Update: {
          acao?: string
          autor_id?: string | null
          id?: string
          observacao?: string | null
          os_num?: string
          quando?: string
        }
        Relationships: [
          {
            foreignKeyName: "os_timeline_autor_id_fkey"
            columns: ["autor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "os_timeline_os_num_fkey"
            columns: ["os_num"]
            isOneToOne: false
            referencedRelation: "ordens_servico"
            referencedColumns: ["num"]
          }
        ]
      }
      profiles: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          nome: string
          papel: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id: string
          nome: string
          papel?: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          nome?: string
          papel?: string
          updated_at?: string
        }
        Relationships: []
      }
      veiculos: {
        Row: {
          ano: number | null
          cliente_id: string
          created_at: string
          km_atual: number | null
          marca: string
          modelo: string
          observacoes: string | null
          placa: string
          tipo: string | null
          updated_at: string
        }
        Insert: {
          ano?: number | null
          cliente_id: string
          created_at?: string
          km_atual?: number | null
          marca: string
          modelo: string
          observacoes?: string | null
          placa: string
          tipo?: string | null
          updated_at?: string
        }
        Update: {
          ano?: number | null
          cliente_id?: string
          created_at?: string
          km_atual?: number | null
          marca?: string
          modelo?: string
          observacoes?: string | null
          placa?: string
          tipo?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "veiculos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gerar_numero_os: { Args: Record<string, never>; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
