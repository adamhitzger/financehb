"use server";

import { createSupabaseClient, protectedRoute } from "../auth/server";
import { getErrorMessage } from "../lib/utils";

export async function signUp(formData: FormData){
    try {
        const name = formData.get("name") as string;
        const surname = formData.get("surname") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
    
        const { auth } = createSupabaseClient();
    
        const { error } = await auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: name,
              last_name: surname
            }
          }
        });
        if (error) throw error;
        return { errorMessage: null };
      } catch (error) {
        return { errorMessage: getErrorMessage(error) };
      }
}

export async function logIn(formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
    
        const { auth } = createSupabaseClient();
    
        const { error } = await auth.signInWithPassword({
          email,
          password,
        });
    
        if (error) throw error;
    
        return { errorMessage: null };
      } catch (error) {
        return { errorMessage: getErrorMessage(error) };
      }
}

export async function updateUser(formData: FormData) {
  try {
      const name = formData.get("name") as string;
      const surname = formData.get("surname") as string;
      const email = formData.get("email") as string;
      const {auth} = createSupabaseClient();
  
      const { data,error } = await auth.updateUser({
        email: email,
        data: {
          first_name: name,
          last_name: surname,
        }
      });
      console.log(data)
      if (error) throw error;
  
      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
}

export async function updatePassword(formData: FormData) {
  try {
      await protectedRoute();
    
      const password = formData.get("password") as string;
      const {auth} = createSupabaseClient();
      
      
  
      const { data,error } = await auth.updateUser({
        password
      });
      const signOut = await auth.signOut();
      if(signOut.error) throw Error;
      console.log(data)
      if (error) throw error;
  
      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
}

export const signOutAction = async () => {
    try {
      await protectedRoute();
  
      const { auth } = createSupabaseClient();
  
      const { error } = await auth.signOut();
  
      if (error) throw error;
  
      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  };

  
  

  
export async function forgotPassword(formData: FormData) {
  try {
    
      const email = formData.get("email") as string;
      const {auth} = createSupabaseClient();
      
      
  
      const { data,error } = await auth.resetPasswordForEmail(
        email
      );
      console.log(data)
      if (error) throw error;
  
      return { errorMessage: null };
  } catch (error) {
      return { errorMessage: getErrorMessage(error) };
  }
}

export async function updateForgotUser(formData: FormData) {
  try {
    await protectedRoute();
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const {auth} = createSupabaseClient();
  
      const { data,error } = await auth.updateUser({
        email,
        password,
      });
      if(error) throw error;
      
      return { errorMessage: null };
  } catch (error) {
      return { errorMessage: getErrorMessage(error) };
  }
}

export async function deleteAction(userId: string) {
  try{
    await protectedRoute();
    const { auth } = createSupabaseClient("deleteAccount");
    const signOut = await auth.signOut();
    if(signOut.error) throw signOut.error;

    const {data, error} = await auth.admin.deleteUser(userId);
    return {errorMessage: null};
  }catch(error){
    return { errorMessage: getErrorMessage(error) };
  }
}