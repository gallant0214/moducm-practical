/**
 * Minimal Database type definitions for tables used by the practical/oral notice feature.
 * Matches the modu-community Supabase schema for shared data.
 */
export interface Database {
  public: {
    Tables: {
      practical_oral_notices: {
        Row: {
          id: number;
          audience: string;
          slug: string;
          icon: string | null;
          badge: string | null;
          title: string;
          summary: string | null;
          content: string;
          display_order: number | null;
          is_active: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["practical_oral_notices"]["Row"]> & {
          slug: string;
          title: string;
          content: string;
        };
        Update: Partial<Database["public"]["Tables"]["practical_oral_notices"]["Row"]>;
        Relationships: [];
      };
      sport_organizations: {
        Row: {
          id: number;
          audience: string;
          sport_name: string;
          org_name: string;
          phone: string | null;
          zipcode: string | null;
          address: string | null;
          website: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["sport_organizations"]["Row"]> & {
          audience: string;
          sport_name: string;
          org_name: string;
        };
        Update: Partial<Database["public"]["Tables"]["sport_organizations"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
