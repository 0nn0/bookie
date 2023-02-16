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
      bookings: {
        Row: {
          created_at: string | null
          end_date: string
          guests_owners_id: string
          id: string
          property_id: string
          start_date: string
          status: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          guests_owners_id: string
          id?: string
          property_id: string
          start_date: string
          status: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          guests_owners_id?: string
          id?: string
          property_id?: string
          start_date?: string
          status?: string
        }
      }
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
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          last_sign_in_at: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          last_sign_in_at?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
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
          description: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
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
      booking_exists: {
        Args: { sdate: string; edate: string; propid: string }
        Returns: { property_id: string; start_date: string; end_date: string }[]
      }
      delete_avatar: {
        Args: { avatar_url: string }
        Returns: Record<string, unknown>[]
      }
      delete_storage_object: {
        Args: { bucket: string; object: string }
        Returns: Record<string, unknown>[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

