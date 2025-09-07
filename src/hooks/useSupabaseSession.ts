"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/__supabaseClient";
import type { Session } from "@supabase/supabase-js";

export function useSupabaseSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription?.subscription?.unsubscribe?.();
  }, []);

  return session;
}
