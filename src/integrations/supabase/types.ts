export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ebooks: {
        Row: {
          id: string
          title: string
          description: string | null
          author: string | null
          cover_image_url: string | null
          file_url: string
          file_type: string
          file_size: number | null
          is_premium: boolean | null
          tags: string[] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          author?: string | null
          cover_image_url?: string | null
          file_url: string
          file_type: string
          file_size?: number | null
          is_premium?: boolean | null
          tags?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          author?: string | null
          cover_image_url?: string | null
          file_url?: string
          file_type?: string
          file_size?: number | null
          is_premium?: boolean | null
          tags?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ebook_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      ebook_category_junction: {
        Row: {
          ebook_id: string
          category_id: string
        }
        Insert: {
          ebook_id: string
          category_id: string
        }
        Update: {
          ebook_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ebook_category_junction_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ebook_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ebook_category_junction_ebook_id_fkey"
            columns: ["ebook_id"]
            isOneToOne: false
            referencedRelation: "ebooks"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_posts: {
        Row: {
          content: string
          created_at: string
          excerpt: string | null
          id: string
          title: string
          updated_at: string
          user_id: string
          image_url: string | null
          tags: string[] | null
          featured: boolean | null
          author: string | null
        }
        Insert: {
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id: string
          image_url?: string | null
          tags?: string[] | null
          featured?: boolean | null
          author?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
          image_url?: string | null
          tags?: string[] | null
          featured?: boolean | null
          author?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          created_at?: string
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      featured_herbs: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number
          herb_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order: number
          herb_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number
          herb_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_herb"
            columns: ["herb_id"]
            isOneToOne: false
            referencedRelation: "herbs"
            referencedColumns: ["id"]
          },
        ]
      }
      herbs: {
        Row: {
          common_name: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          images: Json | null
          modern_uses: string[] | null
          region: string[] | null
          safety_precautions: string[] | null
          scientific_name: string
          traditional_uses: string[] | null
          updated_at: string | null
        }
        Insert: {
          common_name: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          images?: Json | null
          modern_uses?: string[] | null
          region?: string[] | null
          safety_precautions?: string[] | null
          scientific_name: string
          traditional_uses?: string[] | null
          updated_at?: string | null
        }
        Update: {
          common_name?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          images?: Json | null
          modern_uses?: string[] | null
          region?: string[] | null
          safety_precautions?: string[] | null
          scientific_name?: string
          traditional_uses?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      saved_herbs: {
        Row: {
          artifaks: string
          created_at: string | null
          herb_id: string
          id: string
          notes: string | null
        }
        Insert: {
          artifaks: string
          created_at?: string | null
          herb_id: string
          id?: string
          notes?: string | null
        }
        Update: {
          artifaks?: string
          created_at?: string | null
          herb_id?: string
          id?: string
          notes?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          ended_at: string | null
          id: string
          price_id: string | null
          status: string
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          ended_at?: string | null
          id?: string
          price_id?: string | null
          status: string
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          ended_at?: string | null
          id?: string
          price_id?: string | null
          status?: string
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_duplicate_herbs: {
        Args: {
          p_common_name: string
          p_scientific_name: string
        }
        Returns: {
          exists_common_name: boolean
          exists_scientific_name: boolean
        }[]
      }
      is_subscribed: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      update_herb: {
        Args: {
          herb_id: string
          herb_data: Json
        }
        Returns: {
          common_name: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          images: Json | null
          modern_uses: string[] | null
          region: string[] | null
          safety_precautions: string[] | null
          scientific_name: string
          traditional_uses: string[] | null
          updated_at: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
