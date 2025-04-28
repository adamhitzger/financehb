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

async function getUserFromDB(id: number): Promise<FullUser | null>{
    const rawUser = await turso.execute({
        sql: "SELECT id, name, email, role, tel, two_fa FROM users WHERE id = ?",
        args: [id]
    })
    const user = rawUser?.rows[0];
    if(user && user?.id){
        return {
            id: Number(user.id),
            name: String(user.name),
            email: String(user.email),
            role: String(user.role),
            tel: user?.tel ? String(user.tel): null,
            two_fa: user?.two_fa ? String(user.two_fa): null,
        };
    }
   return null
}