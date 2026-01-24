import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please create a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  const cookieStore = await cookies();
  
  // Get auth tokens from cookies - check multiple cookie names
  const projectRef = supabaseUrl.split('//')[1]?.split('.')[0] || 'lieailmnmczmxiqwdaai';
  const supabaseCookie = cookieStore.get(`sb-${projectRef}-auth-token`)?.value;
  const accessToken = cookieStore.get('sb-access-token')?.value;
  const refreshToken = cookieStore.get('sb-refresh-token')?.value;

  // Try to parse Supabase cookie if it exists
  let parsedSession = null;
  if (supabaseCookie) {
    try {
      parsedSession = JSON.parse(decodeURIComponent(supabaseCookie));
    } catch {
      // Cookie is not JSON, ignore
    }
  }

  const finalAccessToken = parsedSession?.access_token || accessToken;
  const finalRefreshToken = parsedSession?.refresh_token || refreshToken;

  const supabase = createSupabaseClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: finalAccessToken ? {
          Authorization: `Bearer ${finalAccessToken}`,
        } : {},
      },
    }
  );

  // Set session if tokens exist
  if (finalAccessToken && finalRefreshToken) {
    await supabase.auth.setSession({
      access_token: finalAccessToken,
      refresh_token: finalRefreshToken,
    });
  }

  return supabase;
}
