import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          tier: 'free' | 'premium' | 'enterprise';
          ai_quota_used: number;
          ai_quota_limit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          tier?: 'free' | 'premium' | 'enterprise';
          ai_quota_used?: number;
          ai_quota_limit?: number;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          tier?: 'free' | 'premium' | 'enterprise';
          ai_quota_used?: number;
          ai_quota_limit?: number;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          project_type: string | null;
          config: Record<string, unknown>;
          generated_prompt: string | null;
          is_favorite: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          description?: string | null;
          project_type?: string | null;
          config?: Record<string, unknown>;
          generated_prompt?: string | null;
          is_favorite?: boolean;
        };
        Update: {
          name?: string;
          description?: string | null;
          project_type?: string | null;
          config?: Record<string, unknown>;
          generated_prompt?: string | null;
          is_favorite?: boolean;
        };
      };
      ai_usage: {
        Row: {
          id: string;
          user_id: string;
          project_id: string | null;
          feature: 'analysis' | 'compatibility' | 'enhancement' | 'chat';
          tokens_used: number;
          response_time_ms: number | null;
          success: boolean;
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          project_id?: string | null;
          feature: 'analysis' | 'compatibility' | 'enhancement' | 'chat';
          tokens_used?: number;
          response_time_ms?: number | null;
          success?: boolean;
          error_message?: string | null;
        };
      };
    };
  };
};
