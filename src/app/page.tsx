
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold">Dental SaaS Starter</h1>
      {user ? (
        <p className="mt-4">Signed in as {user?.email}</p>
      ) : (
        <p className="mt-4">No active session</p>
      )}
    </main>
  );
}
