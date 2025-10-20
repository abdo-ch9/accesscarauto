import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://ilsdfangzmyxtofidjii.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlsc2RmYW5nem15eHRvZmlkamlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDY5MjAsImV4cCI6MjA3NjE4MjkyMH0.UPp5WvMECnwN71TixcwRMz5P8B_axfEsj0TGEdJEENo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);