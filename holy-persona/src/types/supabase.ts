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
      bible_characters: {
        Row: {
          id: string
          type: string
          name: string
          title: string
          description: string
          image: string
          characteristics: string[]
          blessing: string
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          name: string
          title: string
          description: string
          image: string
          characteristics: string[]
          blessing: string
          created_at?: string
        }
        Update: {
          id?: string
          type?: string
          name?: string
          title?: string
          description?: string
          image?: string
          characteristics?: string[]
          blessing?: string
          created_at?: string
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