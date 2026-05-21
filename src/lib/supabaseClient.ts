import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please check your .env file.');
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,     // Disable local storage auth persistence to prevent browser multi-tab lock collisions
    autoRefreshToken: false,   // Disable automatic background token refresh loops
    detectSessionInUrl: false, // Disable URL hash parsing for tokens on client-side startup
  },
  global: {
    fetch: (url, options) => {
      return fetch(url, options).catch((err) => {
        // Intercept network failures (e.g. offline TypeError: Failed to fetch) 
        // and return a silent 503 response instead of letting the error bubble up as an unhandled promise rejection
        return new Response(
          JSON.stringify({
            error: {
              message: "Supabase service unreachable. Using offline database fallback.",
              status: 503
            }
          }),
          {
            status: 503,
            statusText: "Service Unavailable",
            headers: { 'Content-Type': 'application/json' }
          }
        );
      });
    }
  }
});
