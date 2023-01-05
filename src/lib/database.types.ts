export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      guests_owners: {
        Row: {
          created_at: string | null
          id: string
          profile_id: string
          property_id: string
          role_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile_id: string
          property_id: string
          role_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_id?: string
          property_id?: string
          role_id?: string
        }
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          last_sign_in_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          last_sign_in_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_sign_in_at?: string | null
          updated_at?: string | null
        }
      }
      properties: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
      }
      roles: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
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
  }
}

