import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react';
import { User } from "@/types/index";
export function createSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export function getAuth() {
  const { auth } = createSupabaseClient();
  return auth;
}

export function useGetUser() {
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();

  auth.onAuthStateChange(async (event, session) => {
    const sessionUser = session?.user;
    const shouldUpdate = sessionUser?.updated_at !== user?.updated_at;
    if (shouldUpdate) {
      if (sessionUser) {
        const user = await fetch("/api/get-user").then((res) =>
          res.json()
        );
        setUser(user);
      } else {
        setUser(null);
      }
    }
  });
  return user;
}