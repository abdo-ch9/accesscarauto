import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://zvacorxebezndxsukrlt.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2YWNvcnhlYmV6bmR4c3Vrcmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMjg1ODksImV4cCI6MjA3NjkwNDU4OX0.RvthzYND4sfBzhtZ_bWZ3XbG16r3PZCliDiGfuhq1v8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'implicit'
  }
});

// Supabase client configured for reliable authentication