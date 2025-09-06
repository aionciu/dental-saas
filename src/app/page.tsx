"use client";

import { useSupabaseSession } from "../hooks/useSupabaseSession";

export default function Home() {
  const session = useSupabaseSession();

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
