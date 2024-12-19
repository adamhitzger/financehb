import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request,
      })
      const path = new URL(request.url).pathname;

      const protectedRoutes = [/^\/paywall(\/.*)?$/, "/user"];
      const authRoutes = ["/log-in", "/sign-in", "/update-pass"];
    
      const isProtectedRoute = protectedRoutes.some(route =>
        route instanceof RegExp ? route.test(path) : route === path
      );
      const isAuthRoute = authRoutes.includes(path);
    
      if (isProtectedRoute || isAuthRoute) {
        const user = await getUser(response,request );
    
        if (isProtectedRoute && !user) {
          return NextResponse.redirect(new URL("/log-in", request.url));
        }
    
        if (isAuthRoute && user) {
          return NextResponse.redirect(new URL("/paywall", request.url));
        }
      }
    
      return response;
}

export const config = {
  matcher: [
    
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

async function getUser(response: NextResponse,request: NextRequest) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            response = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const {
        data: { user },
      } = await supabase.auth.getUser();
    return user;
  }