"use server";


import { createSupabaseClient, getUser, protectedRoute } from "../auth/server";
import { getErrorMessage, stripe } from "../lib/utils";
import { redirect } from "next/navigation";
import { GetRaynetResponse } from "@/types";
import { SanityDocument } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";
import {createTransport, SendMailOptions } from "nodemailer"
const axios = require("axios")

export async function generateEmailTemplate(documentData: SanityDocument, email: string) {
  // Extract article data
  const { name, overview, slug, image } = documentData
  const articleUrl = `https://finance-ifkh.vercel.app/paywall/${slug?.current || ""}`
  const imageUrl = urlForImage(image)

  // Format date
  const formattedDate = new Date().toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Benefits of being a supporter
  const benefits = [
    "Exkluzivní přístup k prémiového obsahu",
    "Detailní analýzy kapitálových trhů",
    "Přednostní přístup k novým článkům",
    "Možnost stahování doplňkových materiálů",
    "Konzultace s našimi odborníky",
  ]

  // Convert the HTML string to a format that can be used in the email
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Novinky ze světa kapitálových trhů</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding: 20px 0;
          }
          .logo {
            max-width: 200px;
            height: auto;
          }
          .content {
            padding: 20px 0;
          }
          .article-title {
            font-size: 24px;
            font-weight: bold;
            color: #1a365d;
            margin-bottom: 10px;
          }
          .article-date {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
          }
          .article-image {
            width: 100%;
            height: auto;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            background-color: #1a365d;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin-right: 10px;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .benefits {
            background-color: #f0f4f8;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .benefits-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .benefits-list {
            padding-left: 20px;
          }
          .footer {
            border-top: 1px solid #eee;
            padding-top: 20px;
            font-size: 12px;
            color: #666;
          }
          .legal {
            font-size: 11px;
            color: #999;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .contact-info {
            margin-top: 15px;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 4px;
            text-align: center;
          }
          .contact-info p {
            margin: 5px 0;
          }
          .main-image {
            width: 100%;
            max-width: 300px;
            height: auto;
            margin: 0 auto 20px;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img alt="Logo Financehb.cz" width="220" height="220" src="https:/financehb-ifkh.vercel.app/_next/image?url=%2Flogo.png&amp;w=640&amp;q=75">
            <h1>Novinky ze světa kapitálových trhů</h1>
          </div>
          
          <div class="content">
            <p>Vážený čtenáři,</p>
            <p>máme pro Vás nový článek z oblasti kapitálových trhů.</p>
            
            <div class="article-title">${name}</div>
            <div class="article-date">${formattedDate}</div>
            
            <img src="${imageUrl}" alt="${name}" class="article-image">
            
            <div class="article-overview">
              ${
                typeof overview === "string"
                  ? overview
                  : "Přečtěte si náš nejnovější článek o aktuálním dění na kapitálových trzích."
              }
            </div>
            
            <p style="margin-top: 20px;">
              <a href="${articleUrl}" class="button">Přečíst článek</a>
              <a href="https://financehb-ifkh.vercel.app/paywall" class="button">Aktivovat předplatné</a>
            </p>
            
            <div class="benefits">
              <div class="benefits-title">Proč se stát naším předplatitelem?</div>
              <ul class="benefits-list">
                ${benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
              </ul>
            </div>
            
            <p>Děkujeme za Vaši podporu a přejeme příjemné čtení!</p>
            <p>S pozdravem,<br>Petr Krajcigr</p>
            
            <img alt="Logo Financehb.cz" width="300" height="300" src="https:/financehb-ifkh.vercel.app/_next/image?url=%2Fmain.jpg&amp;w=640&amp;q=75">
            <div class="contact-info">
              <p><strong>Kontaktní informace:</strong></p>
              <p>Tel: +420 222 161 188</p>
              <p>Email: <a href="mailto:petr@efekta-iz.cz">petr@efekta-iz.cz</a></p>
              <p>Email: <a href="mailto:info@financehb.cz">info@financehb.cz</a></p>
            </div>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Financehb.cz s.r.o. Všechna práva vyhrazena.</p>
            <p>Pokud si nepřejete dostávat tyto e-maily, můžete se <a href="https://financehb-ifkh.vercel.app/sign-out?mail=${email}">Odhlásit zde</a>.</p>
          </div>
          
          <div class="legal">
            <p>Finanční služby propagované a nabízené na tomto webu poskytuje společnost Financehb.cz s.r.o a zde uvedení poradci jako fyzické osoby: Petr Krajcigr, kteří jsou v oblasti:</p>
            <hr style="border: 1px solid #eee; margin: 10px 0;">
            <ul>
              <li>pojištění registrovaní podle zákona č. 170/2018 Sb. jako vázaní zástupci samostatného zprostředkovatele pojištění,</li>
              <li>doplňkového penzijního spoření podle zákona č. 256/2004 Sb. jako vázaní zástupci investičního zprostředkovatele,</li>
              <li>spotřebitelských úvěrů podle zákona č. 257/2016 Sb. jako vázaní zástupci samostatného zprostředkovatele spotřebitelského úvěru, společnosti Chytrý Honza a.s. Jungmannova Plaza, Jungmannova 745/24,110 00 Praha 1. Tuto skutečnost je možné ověřit v Seznamu regulovaných a registrovaných subjektů finančního trhu České národní banky na <a href="http://www.cnb.cz/cnb/jerrs">http://www.cnb.cz/cnb/jerrs</a>, kde také najdete aktuální podrobnosti o registraci a jejím rozsahu.</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `
}

export const handleSendMails = async (formData: FormData, documentData: SanityDocument) => {
  const tags = formData.getAll("tags") as Array<string>
  let emails: string[] = []
  const transporter = createTransport({
      service: "gmail",
      auth: {
       user: process.env.FROM_EMAIL,
       pass: process.env.FROM_EMAIL_PASSWORD,
      }
     });

     const mailOptions: any = {
      from: process.env.FROM_EMAIL,
      subject: "Nové přihlášení - Měsíční aktuality z KPT",
     }
     
  const raynetAPIUrl = `https://app.raynet.cz/api/v2/company/?tags[LIKE]=${tags.map(t => t)}`
  const headers = {
      "Content-Type": "application/json",
      "Authorization": "Basic " + Buffer.from(process.env.RAYNET_EMAIL +":"+process.env.RAYNET_API_KEY).toString("base64"),
      "X-Instance-Name": "financehb"
    };
  console.log(raynetAPIUrl)
      try{
          const getEmails = await axios.get(raynetAPIUrl, {headers})
          console.log(`Found ${getEmails.data.totalCount} recipients`)
          for(let i = 0; i<getEmails.data.totalCount;i++){
              const email: string = getEmails.data.data[i].primaryAddress.contactInfo.email
              
              if (!email) {
                console.log(`Skipping recipient ${i + 1} - no email address`)
                continue
              }
              emails.push(email)
              const htmlContent = await generateEmailTemplate(documentData, email)

      // Send the email
      const sendResult = await transporter.sendMail({
        ...mailOptions,
        to: email,
        html: htmlContent,
      })
      if (sendResult.rejected && sendResult.rejected.length > 0) {
        console.error(`Email to ${email} was rejected, stopping send process`)
        break
      }

      // Add a small delay between emails to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    return {
      success: true,
      emails,
    }
     }catch(error) {
          console.log("Error v akci sendMails(): ", error)
      } 
}

export async function signOutFromMailsUnregistered(formData: FormData): Promise<{success: boolean, message: string}>{
  try{
    const idS: number[] = [];
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(process.env.RAYNET_EMAIL + ":" + process.env.RAYNET_API_KEY).toString("base64"),
      "X-Instance-Name": "financehb",
  }
  const body = { rating: "B"}
    const mail = formData.get("email") as string;
    const getSignOut = await axios.get(`https://app.raynet.cz/api/v2/company/?primaryAddress-contactInfo.email=${mail}`, {headers})
    
    if(getSignOut.status !== 200){
      return {
        success: false,
        message: "Nebyl jste odhlášen. Vyskytla se chyba."
      }
    }
    console.log(getSignOut.data.data[0]?.id)
    for(let i=0; i<getSignOut.data.totalCount;i++){
      idS.push(getSignOut.data.data[i]?.id)
    }
    console.log(idS)
    for(let i=0; i<getSignOut.data.totalCount;i++){
      const signOut = await axios.post(`https://app.raynet.cz/api/v2/company/${idS[i]}`,body, {headers})
      console.log(signOut)
      if(signOut.status !== 200){
        return {
          success: false,
          message: "Nebyl jste odhlášen. Vyskytla se chyba."
        }
      }
    }
    return {
      success: true,
      message: "Byl jste odhlášen."
    }

  }catch(error){
    console.log("Chyba při odhlašování emailu z Raynetu: ", error)
    return {
      success: false,
      message: "Nebyl jste odhlášen. Vyskytla se chyba."
    }
  }
}

export async function signOutFromMails(formData: FormData): Promise<{success: boolean, message: string}>{
  try{
    const client = await createSupabaseClient()
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(process.env.RAYNET_EMAIL + ":" + process.env.RAYNET_API_KEY).toString("base64"),
      "X-Instance-Name": "financehb",
  }
  const body = { rating: "B"}
    const rId = Number(formData.get("raynetId"));
    const id = formData.get("dbId") as string;
    const signOut = await axios.post(`https://app.raynet.cz/api/v2/company/${rId}`,body, {headers})
    console.log(signOut)
    if(signOut.status === 200){
      const {data, error} = await client.from("profiles").update({
        isMailSub: false
      }).eq("id", id)
      console.log(error)
      if(error) return{
        success: false,
        message: "Chyba při ukládání dat"
      }
      else return {
        success: true,
        message: "Byl jste odhlášen."
      }
    }else{
      return {
        success: false,
        message: "Nebyl jste odhlášen. Vyskytla se chyba."
      }
    }
    
  }catch(error){
    console.log("Chyba při odhlašování emailu z Raynetu: ", error)
    return {
      success: false,
      message: "Nebyl jste odhlášen. Vyskytla se chyba."
    }
  }
}

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
          raynet_id: raynet_id.data[0].id,
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
        email,
      );
      console.log(data)
      if (error) throw error;
  
      return { errorMessage: null };
  } catch (error) {
      return { errorMessage: getErrorMessage(error) };
  }
}

export async function updateForgotUser(formData: FormData, code: string) {
  try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const {auth} = await createSupabaseClient();

      const codeEx = await auth.exchangeCodeForSession(code)
      if(codeEx.error) return {errorMessage: "Nepodařilo se Vás ověřit"}
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
  const total = Number(formData.get("total"))
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

async function getAccessToken() {
  const url = "https://identity.idoklad.cz/server/connect/token";

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "identity.idoklad.cz"
  };

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.IDOKLAD_CLIENT_ID!,
    client_secret: process.env.IDOKLAD_CLIENT_SECRET!,
    scope: "idoklad_api",
  });

  try {
    const response = await axios.post(url, body, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createInvoice(total: number,fname: string, lname: string, discount: number | null | undefined ){
  
  const date = new Date();
  const now = date.toISOString().split('T')[0];
  const invoiceUrl = "https://api.idoklad.cz/v3/IssuedInvoices";
  const contactUrl = "https://api.idoklad.cz/v3/Contacts"
  if(discount === null || discount == undefined) discount = 0;

  const accesToken = await getAccessToken()
console.log(accesToken)
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${accesToken}`,
  "Host": "api.idoklad.cz"
};


  const contactBody ={
    CompanyName: `${fname} ${lname}`,
    CountryId: 2,
    DeliveryAddresses: [
      {
      Name: `${fname} ${lname}`,
      }
    ],
  }
  
  try{
    const userId = await axios.post(contactUrl, contactBody,{headers})
    console.log("Contact response:", userId.data.Data.Id);
    const invoices = await axios.get(invoiceUrl, {headers})
    console.log("Invoices response:", invoices.data.Data.Items.length+1);
    const body = {
      CurrencyId: 2,//
      DateOfIssue: now,
      DateOfMaturity: now,
      DateOfPayment: now,
      DateOfTaxing: now,
      Description: `Faktura za předplatné - ${now} - ${fname} ${lname}`,
      DocumentSerialNumber: invoices.data.Data.Items.length+1,//
      IsEet: false,
      IsIncomeTax: true,
      Items: [
        {
          Amount: 1,
          DiscountPercentage: discount,
          PriceType: 1,
          VatRateType: 2,
          IsTaxMovement: false,
          Name: `Faktura za předplatné - ${now} - ${fname} ${lname}`,
          UnitPrice: total
        }
      ],
      NumericSequenceId: 5034542,
      PartnerId: userId.data.Data.Id, //
      PaymentOptionId: 1, //
    };
    

    const idoklad = await axios.post(invoiceUrl, body, {headers})
  console.log("Faktura vytvořena",idoklad.data)
  return idoklad.data

}  catch(error: any){
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    console.error("Request made, no response received:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
  throw new Error(`iDoklad error: ${error}`)
}

} 