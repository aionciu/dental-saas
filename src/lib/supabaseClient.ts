import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient;

if (process.env.NODE_ENV === "test") {
  supabase = {} as any;
} else {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
