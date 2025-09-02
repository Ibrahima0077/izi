import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string;
          client_code: string;
          loyalty_points: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone: string;
          client_code: string;
          loyalty_points?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string;
          client_code?: string;
          loyalty_points?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      convoys: {
        Row: {
          id: string;
          departure_date: string;
          price_per_kg: number;
          carrier_address: string;
          carrier_name: string;
          destination: string;
          available_space: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          departure_date: string;
          price_per_kg: number;
          carrier_address: string;
          carrier_name: string;
          destination?: string;
          available_space?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          departure_date?: string;
          price_per_kg?: number;
          carrier_address?: string;
          carrier_name?: string;
          destination?: string;
          available_space?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      loyalty_transactions: {
        Row: {
          id: string;
          user_id: string;
          points: number;
          type: 'earned' | 'spent' | 'converted';
          description: string;
          reference_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          points: number;
          type: 'earned' | 'spent' | 'converted';
          description: string;
          reference_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          points?: number;
          type?: 'earned' | 'spent' | 'converted';
          description?: string;
          reference_id?: string | null;
          created_at?: string;
        };
      };
      point_conversions: {
        Row: {
          id: string;
          user_id: string;
          points_converted: number;
          fcfa_amount: number;
          conversion_rate: number;
          status: 'pending' | 'completed' | 'cancelled';
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          points_converted: number;
          fcfa_amount: number;
          conversion_rate?: number;
          status?: 'pending' | 'completed' | 'cancelled';
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          points_converted?: number;
          fcfa_amount?: number;
          conversion_rate?: number;
          status?: 'pending' | 'completed' | 'cancelled';
          created_at?: string;
          completed_at?: string | null;
        };
      };
    };
  };
};