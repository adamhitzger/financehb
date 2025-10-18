import { cache } from "react";
import { getUserFromSession } from "./session";
import { cookies } from "next/headers";
import { turso } from "./client";
import { redirect } from "next/navigation";
import { FullUser } from "@/types";

async function _getCurrentUser({
    withFullUser = false,
    redirectIfNotFound = false,
  }: {
    withFullUser?: boolean;
    redirectIfNotFound?: boolean;
  } = {}): Promise<FullUser | null | undefined> {
    const user = await getUserFromSession(await cookies());
  
    if (user == null) {
      if (redirectIfNotFound) return redirect("/sign-in");
      return null;
    }
  
    if (withFullUser) {
      const fullUser = await getUserFromDB(user);
      if (fullUser == null) throw new Error("User not found in database");
      return fullUser;
    }
  }

  export const getCurrentUser = cache(_getCurrentUser)

async function getUserFromDB(id: number): Promise<FullUser | null | undefined>{
    const rawUser = await turso.execute({
        sql: "SELECT id, first_name, last_name,email, raynet_id,stripe_id, is_mail_sub FROM users WHERE id = ?",
        args: [id]
    })
    const user = rawUser?.rows[0];
    
    if(user && user?.id){
        return {
            id: Number(user.id),
            first_name: String(user.first_name),
            last_name: String(user.last_name),
            email: String(user.email),
            raynet_id: user?.raynet_id ? Number(user.raynet_id): null,
            stripe_id: user?.stripe_id ? String(user.stripe_id): null,
            is_mail_sub: Boolean(user.is_mail_sub)
        };
    }
   return null
}