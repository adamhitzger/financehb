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

export  function useGetUser() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth()
  let lastCallTime = 0;
  auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN") {
      const now = Date.now();
      if (now - lastCallTime > 60000) { // 5 seconds interval
        lastCallTime = now;
        fetch("/api/get-user")
          .then((res) => res.json())
          .then((user) => setUser(user));
      }
    }else if (event === "SIGNED_OUT"){
        setUser(null);
      }
  });

  return user;
}