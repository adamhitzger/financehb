"use server";


import { createSupabaseClient, getUser, protectedRoute } from "../auth/server";
import { getErrorMessage, stripe } from "../lib/utils";
import { redirect } from "next/navigation";
import { GetRaynetResponse } from "@/types";
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
        const client = await createSupabaseClient("deleteAccount");
        const raynetAPIUrl = `https://app.raynet.cz/api/v2/company/?primaryAddress-contactInfo.email=${email}`;
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
        const raynet = await fetch(raynetAPIUrl, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + Buffer.from(process.env.RAYNET_EMAIL + ":" + process.env.RAYNET_API_KEY).toString("base64"),
              "X-Instance-Name": "financehb",
          },
      });
      if(!raynet.ok){
        throw new Error(`Request failed with status: ${raynet.status}`);
      }
        const raynet_id = await raynet.json() as GetRaynetResponse;
        if(raynet_id.data[0].id && data.user?.id){
        console.log(raynet_id.data[0].id)
        const insert_id = await client.from("profiles").update({
          raynet_id: raynet_id.data[0].id
      }).eq("id", data.user.id)
      if(insert_id.error) throw new Error(insert_id.error.message);
      if(insert_id.data) console.log(insert_id.data);
      }
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

export async function deleteAction(raynet_id:number | null, userId: string) {
  const raynetAPIUrl = `https://app.raynet.cz/api/v2/company/${raynet_id}`;
  try{
    await protectedRoute();

    const { auth } = await createSupabaseClient("deleteAccount");
    const client = await createSupabaseClient();
    if(raynet_id){
    const raynetDel = await fetch(raynetAPIUrl , {
      method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(process.env.RAYNET_EMAIL + ":" + process.env.RAYNET_API_KEY).toString("base64"),
        "X-Instance-Name": "financehb",
    },
    })
  
    if(!raynetDel.ok){
      throw Error("Error while deleting user from Raynet ")
    }
  }
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
      allow_promotion_codes: true,
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

export async function createInvoice(total: number,fname: string, lname: string, discount: number | null | undefined ){
  const date = new Date();
  const invoiceUrl = "tps://api.idoklad.cz/v3/IssuedInvoices";
  if(discount === null || discount == undefined) discount = 0;
  else discount;
  const idoklad = await fetch(invoiceUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(process.env.IDOKALD_TOKEN!).toString("base64"),
        body: JSON.stringify({
            ConstantSymbolId: 7,
            CurrencyId: 1,
            DateOfIssue:`${date.getFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`,
            DateOfMaturity:`${date.getFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()+1}`,
            DocumentSerialNumber: 0,
            IsEet: false,
            IsIncomeTax: true,
            Items: [
                {
                    amount: total/100,
                    DiscountPercentage: discount,
                    PriceType: 1,
                    VatRateType: 2,
                    Name: `Faktura za předplatné - ${date.getFullYear()}/${date.getUTCMonth()+1}/${date.getUTCDate()} - ${fname} ${lname}`,

                }
            ],
            NumericSequenceId: Number(`${date.getFullYear()}${date.getUTCMonth()+1}${date.getUTCDate()}`),
            PartnerId:10025124,
            PaymentOptionId:1,
        }
    ),
    },
   }
);  
if(!idoklad.ok) return console.log(`Problem with iDoklad Invoice - Status: ${idoklad.status}; MEssage: ${idoklad.statusText}`);
if(idoklad.ok) return console.log("iDoklad Invoice succefully created") ;
} 