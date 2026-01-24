'use client';

import { createClient } from '@/lib/supabase/client';

export async function refreshAuthToken(): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = createClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return { success: false, error: 'No session found' };
    }

    // Try to refresh the session using client-side Supabase
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
    
    if (refreshError || !refreshData?.session) {
      return { success: false, error: refreshError?.message || 'Failed to refresh session' };
    }

    // Update cookies with new tokens (client-side)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const projectRef = supabaseUrl?.split('//')[1]?.split('.')[0] || 'lieailmnmczmxiqwdaai';
    
    const newCookieValue = JSON.stringify({
      access_token: refreshData.session.access_token,
      refresh_token: refreshData.session.refresh_token,
      expires_at: refreshData.session.expires_at,
      expires_in: refreshData.session.expires_in,
      token_type: refreshData.session.token_type,
      user: refreshData.session.user,
    });
    
    const cookieMaxAge = 60 * 60 * 24 * 7; // 7 days
    document.cookie = `sb-${projectRef}-auth-token=${encodeURIComponent(newCookieValue)}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`;
    document.cookie = `sb-access-token=${refreshData.session.access_token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
    document.cookie = `sb-refresh-token=${refreshData.session.refresh_token}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`;

    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
