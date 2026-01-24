'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { LanguageSwitcher } from '@/components/layout/language-switcher';

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      
      if (!supabase) {
        setError('Supabase configuration error. Please check your environment variables.');
        setLoading(false);
        return;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        // Supabase automatically handles cookies with persistSession: true
        // Also manually set cookies as fallback for server-side access
        const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0] || 'lieailmnmczmxiqwdaai';
        const cookieValue = JSON.stringify({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
          expires_in: data.session.expires_in,
          token_type: data.session.token_type,
          user: data.session.user,
        });
        
        // Set Supabase's own cookie format (7 days)
        const cookieMaxAge = 60 * 60 * 24 * 7; // 7 days in seconds
        document.cookie = `sb-${projectRef}-auth-token=${encodeURIComponent(cookieValue)}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`;
        
        // Also set our custom cookies for middleware
        // Access token: 1 day, Refresh token: 7 days
        document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
        document.cookie = `sb-refresh-token=${data.session.refresh_token}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`;
        
        // Wait a bit for cookies to be set, then redirect
        await new Promise(resolve => setTimeout(resolve, 200));
        window.location.href = '/admin';
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-6">
      <div className="w-full max-w-md">
        <div className="glass bg-card-light dark:bg-card-dark border border-white/40 dark:border-white/5 rounded-xl p-8 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-display font-light text-primary dark:text-white mb-2">
                {t.admin.login.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                {t.admin.login.subtitle}
              </p>
            </div>
            <LanguageSwitcher />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.admin.login.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
                placeholder="admin@cervuslabs.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.admin.login.password}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.admin.login.signingIn}
                </>
              ) : (
                t.admin.login.signIn
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
