import { DBUser } from '@/types'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseClient(deleteAccount: "" | "deleteAccount" = "") {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    deleteAccount === "deleteAccount"
    ? process.env.SUPABASE_ROLE_KEY!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {}
        },
      },
    }
  )
}

export function getAuth() {
  const { auth } = createSupabaseClient();
  return auth;
}

export async function getUser() {
    const {auth} = createSupabaseClient();
    const supabase = createSupabaseClient();
    const authUser = (await auth.getUser()).data.user;
    const dbUser = await supabase.from("profiles").select().eq("id", authUser?.id).single();
    if (!dbUser) return null; 

    const user: DBUser = {
      id: dbUser.data?.id,
      email: authUser?.email,
      name: dbUser.data?.first_name,
      surname: dbUser.data?.last_name,
    }

    return user
}


export async function protectedRoute() {
    const user = await getUser();
    if (!user) throw Error("Unauthorized");
}