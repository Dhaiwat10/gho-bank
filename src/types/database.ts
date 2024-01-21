export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Accounts: {
        Row: {
          account: string
          created_at: string
          last_bookkeep_id: number | null
        }
        Insert: {
          account: string
          created_at?: string
          last_bookkeep_id?: number | null
        }
        Update: {
          account?: string
          created_at?: string
          last_bookkeep_id?: number | null
        }
        Relationships: []
      }
      BookKeep: {
        Row: {
          account: string | null
          amount: string | null
          asset: string | null
          created_at: string
          deadline: number | null
          id: number
          isPermit: boolean | null
          r: string | null
          s: string | null
          v: number | null
        }
        Insert: {
          account?: string | null
          amount?: string | null
          asset?: string | null
          created_at?: string
          deadline?: number | null
          id?: number
          isPermit?: boolean | null
          r?: string | null
          s?: string | null
          v?: number | null
        }
        Update: {
          account?: string | null
          amount?: string | null
          asset?: string | null
          created_at?: string
          deadline?: number | null
          id?: number
          isPermit?: boolean | null
          r?: string | null
          s?: string | null
          v?: number | null
        }
        Relationships: []
      }
      PendingTransactions: {
        Row: {
          account: string
          amount: string
          asset: string
          created_at: string
          id: number
          isCompleted: boolean
          isRevoked: number
          transactionHash: string
        }
        Insert: {
          account: string
          amount: string
          asset: string
          created_at?: string
          id?: number
          isCompleted?: boolean
          isRevoked?: number
          transactionHash: string
        }
        Update: {
          account?: string
          amount?: string
          asset?: string
          created_at?: string
          id?: number
          isCompleted?: boolean
          isRevoked?: number
          transactionHash?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
