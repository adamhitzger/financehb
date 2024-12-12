import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react';
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
let lastCallTime = 0;
export  function useGetUser() {
  const [user, setUser] = useState<User | null>(() => {
    const cachedUser = localStorage.getItem("user");
    return cachedUser ? JSON.parse(cachedUser) :null;
  });
  const auth = getAuth()
  
  useEffect(() => {
    const {data: subscription} = auth.onAuthStateChange(async (event, session) => {
      if (event === "INITIAL_SESSION" && session) {
        const now = Date.now();
        if (now - lastCallTime > 60000) { 
          lastCallTime = now;
          const userData = fetch("/api/get-user").then((res) => res.json());
          setUser(user);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      }else if (event === "SIGNED_OUT"){
          setUser(null);
          localStorage.removeItem("user")
        }
      })
      return () => subscription.subscription.unsubscribe()
  }, [auth] );

  return user;
}