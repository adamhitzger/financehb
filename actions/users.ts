"use server";


import { createSupabaseClient, getUser, protectedRoute } from "../auth/server";
import { getErrorMessage, stripe } from "../lib/utils";
import { redirect } from "next/navigation";

export async function createCustomerPortal(stripeId: FormData) {

  
  const session = await stripe.billingPortal.sessions.create({
      customer: String(stripeId.get("stripeId")) ,
      return_url:
          process.env.NODE_ENV === "production"
              ? "https://financehb.vercel.app/user"
              : "http://localhost:3000/user",
  });

  return redirect(session.url);
}
export async function signUp(formData: FormData){
  
    try {
        const name = formData.get("name") as string;
        const surname = formData.get("surname") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const { auth } = await createSupabaseClient();
        
   const { data, error } = await auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: name,
              last_name: surname,
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
    
        const { auth } = await createSupabaseClient();
    
        const { data, error } = await auth.signInWithPassword({
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
      const {auth} = await createSupabaseClient();
  
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
      const {auth} = await createSupabaseClient();
      
      
  
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
  
      const { auth } = await createSupabaseClient();
  
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
      const {auth} = await createSupabaseClient();
      
      
  
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
      const {auth} = await createSupabaseClient();
  
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
    const { auth } = await createSupabaseClient("deleteAccount");
    const signOut = await auth.signOut();
    if(signOut.error) throw signOut.error;

    const {data, error} = await auth.admin.deleteUser(userId);
    return {errorMessage: null};
  }catch(error){
    return { errorMessage: getErrorMessage(error) };
  }
}

export async function createPayment(formData: FormData){
  await protectedRoute();
  const user = await getUser();
  const stripeId = formData.get("stripeId") as string;
  if (!stripeId) {
    throw new Error("Stripe ID is missing.");
  }
  const client = await createSupabaseClient();
  let customerStripeId;
  if(user?.id){
    const {data, error} = await client.from("profiles").select("stripeId").eq("id", user.id).single();
  
    if (error) {
      throw new Error(`Error fetching profile: ${error.message}`);
    }

    customerStripeId = data?.stripeId;
  }  

  if(!customerStripeId && user?.email){
    const stripeCustomer = await stripe.customers.create({
      email: user.email,
      name: `${user.name} ${user.surname}`,
    });
    customerStripeId = stripeCustomer.id;
    console.log("Stripe customer created:", customerStripeId);
    
    const {data, error} = await client.from("profiles").update({
          stripeId: customerStripeId,
      }).eq("id", user?.id)
      if (error) {
        throw new Error(`${error}`);
      }else {
        console.log(data);
      }
  }
    const session = await stripe.checkout.sessions.create({
      customer: customerStripeId as string,
      mode: "subscription",
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      line_items: [{ price: stripeId, quantity: 1 }],
      customer_update: {
        address: "auto",
        name: "auto",
      },
      success_url:process.env.NODE_ENV === "production"
      ? "https://financehb-ifkh.vercel.app/payment/success"
      : "http://localhost:3000/payment/success",
  cancel_url:
    process.env.NODE_ENV === "production"
      ? "https://financehb-ifkh.vercel.app/payment/cancelled"
      : "http://localhost:3000/payment/cancelled",
});
    console.log("Stripeid:", customerStripeId);
    
    return redirect(session.url as string);
}