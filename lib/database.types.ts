/**
 * TypeScript types mirroring supabase/migrations/0001_initial_schema.sql.
 *
 * IMPORTANT: this file matches the canonical shape that @supabase/supabase-js
 * v2 expects (Tables / Views / Functions / Enums / CompositeTypes plus a
 * Relationships array per table). If you don't include all of them, query
 * results infer as `never` and TypeScript can't see column names.
 *
 * In production this file should be REGENERATED via the Supabase CLI:
 *   supabase gen types typescript --linked > lib/database.types.ts
 * which keeps types in sync with migrations automatically. The hand-written
 * version below is a stand-in until the CLI is set up.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type GameChannelDb = "standard" | "ussd" | "pos";
export type DrawSourceDb = "nla" | "manual" | "admin";
export type PostCategoryDb = "charity" | "winners" | "company";

export type GameRow = {
  id: string;
  slug: string;
  name: string;
  hook: string;
  long_description: string;
  schedule: string[];
  schedule_label: string;
  draw_time: string | null;
  price_ghs: number | null;
  channel: GameChannelDb;
  channel_detail: string | null;
  prize_structure: string | null;
  featured: boolean;
  introduced_year: number | null;
  logo_url: string | null;
  sort_order: number;
  external_event_ids: number[];
  created_at: string;
  updated_at: string;
};

export type DrawRow = {
  id: string;
  game_id: string;
  draw_number: number;
  draw_date: string;
  drawn_at: string | null;
  numbers: number[];
  bonus_numbers: number[];
  source: DrawSourceDb;
  published: boolean;
  external_id: string | null;
  created_at: string;
  updated_at: string;
};

export type WinningNumberRow = {
  draw_id: string;
  position: number;
  value: number;
  is_bonus: boolean;
};

export type AgentRow = {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string | null;
  hours_json: Json | null;
  lat: number | null;
  lng: number | null;
  approved: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_mdx: string;
  hero_image_url: string | null;
  category: PostCategoryDb;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactMessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      games: {
        Row: GameRow;
        Insert: Omit<GameRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<GameRow>;
        Relationships: [];
      };
      draws: {
        Row: DrawRow;
        Insert: Omit<DrawRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<DrawRow>;
        Relationships: [
          {
            foreignKeyName: "draws_game_id_fkey";
            columns: ["game_id"];
            isOneToOne: false;
            referencedRelation: "games";
            referencedColumns: ["id"];
          },
        ];
      };
      winning_numbers: {
        Row: WinningNumberRow;
        Insert: WinningNumberRow;
        Update: Partial<WinningNumberRow>;
        Relationships: [
          {
            foreignKeyName: "winning_numbers_draw_id_fkey";
            columns: ["draw_id"];
            isOneToOne: false;
            referencedRelation: "draws";
            referencedColumns: ["id"];
          },
        ];
      };
      agents: {
        Row: AgentRow;
        Insert: Omit<AgentRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<AgentRow>;
        Relationships: [];
      };
      posts: {
        Row: PostRow;
        Insert: Omit<PostRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<PostRow>;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessageRow;
        Insert: Omit<ContactMessageRow, "id" | "read" | "created_at" | "updated_at"> & {
          id?: string;
          read?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ContactMessageRow>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
