'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function signOut() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const projectRef = supabaseUrl?.split('//')[1]?.split('.')[0] || 'lieailmnmczmxiqwdaai';

  try {
    const cookieStore = await cookies();
    cookieStore.delete('sb-access-token');
    cookieStore.delete('sb-refresh-token');
    // Also delete the specific project cookie if it exists
    if (projectRef) {
      cookieStore.delete(`sb-${projectRef}-auth-token`);
    }

    // Attempt to sign out from Supabase as well
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error: any) {
    console.error('SignOut error:', error);
    // Continue with redirect even if Supabase signOut fails
  }

  redirect('/login');
}

export async function getSession() {
  try {
    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session, error: null };
  } catch (error: any) {
    return { session: null, error: error.message };
  }
}
