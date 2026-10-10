import { createClient } from '@supabase/supabase-js';
import {
  clearSupabaseAuthStorage,
  createRememberAwareStorage,
  setSupabaseRememberSession,
  shouldRememberSupabaseSession,
  SUPABASE_AUTH_STORAGE_KEY,
} from '@/features/auth/services/supabase-auth-storage';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://shjbchvmwrtfmtrdwlum.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoamJjaHZtd3J0Zm10cmR3bHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyOTA0NjEsImV4cCI6MjA5Njg2NjQ2MX0.PAZAxNc67GqyXnnKPPD2sTkBacRnLDLaaDFg3-ikATk';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment configuration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: SUPABASE_AUTH_STORAGE_KEY,
    storage: createRememberAwareStorage(),
    persistSession: true,
    autoRefreshToken: true,
  },
});

export {
  clearSupabaseAuthStorage,
  setSupabaseRememberSession,
  shouldRememberSupabaseSession,
};
