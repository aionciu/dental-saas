"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold">Dental SaaS Starter</h1>
      {session ? (
        <p className="mt-4">Signed in as {session.user.email}</p>
      ) : (
        <p className="mt-4">No active session</p>
      )}
    </main>
  );
}
