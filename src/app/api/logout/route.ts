// app/api/logout/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error.message)
    return new NextResponse('Logout failed', { status: 500 })
  }

  return NextResponse.redirect(new URL('/', request.url))
}
