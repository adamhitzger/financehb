"use server";

import { getErrorMessage, stripe } from "../lib/utils";
import { redirect } from "next/navigation";
import { GetRaynetResponse } from "@/types";
import { SanityDocument } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";
import {createTransport } from "nodemailer"
const axios = require("axios")
import { get_email, signSchema, changeDetailsSchema, updatePass, changePass} from "@/database/schema";
import { turso } from "@/database/client";
import { generateSalt, hashPassword } from "@/database/password";
import { createUserSession, removeUserFromSession } from "@/database/session";
import { cookies } from "next/headers";
import { comparePasswords } from "@/database/password";
import { getCurrentUser } from "@/database/currentUser";
import { revalidatePath } from "next/cache";
import { ErrorMessage } from "sanity";

//hotovo
//iDoklad
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
      NumericSequenceId: 2489511,
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
//kod do db
async function generateCode(): Promise<{code?: string| null, success: boolean}>{
  const verifyCode = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

  const insertVerifyCode = await turso.execute({
      sql: "INSERT INTO verify (verify_code) VALUES(?)",
      args: [verifyCode]
  })

  if(insertVerifyCode.rowsAffected===0){
      return{
      success: false,
  }
  }
  return {
    success: true,
    code: verifyCode
  }
}
//emaily
async function smtp(){
  return createTransport({
      service: "gmail",
      auth: {
       user: process.env.FROM_EMAIL!,
       pass: process.env.FROM_EMAIL_PASSWORD!,
      }
    });
}

async function generateVerifySignUpHTML(code: string){
  return `<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Potvrzení registrace</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 0;">
                <table role="presentation" style="width: 602px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 40px 30px; background-color: #0A1a49;">
                            <h1 style="margin: 0; font-size: 24px; color: #ffffff; text-align: center;">Vítejte v členské sekci!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #0A1a49;">Děkuji že jste se registroval!</h2>
                            <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; color: #0A1a49;">
                                We're excited to have you on board. Your account has been successfully created, and you're now ready to get started.
                            </p>
                            <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; color: #0A1a49;">
                                K dokončení registrace prosím klikněte na tlačítko níže, které Vás ověří a přesměruje zpět na stránku
                            </p>
                            <p style="text-align: center;">
                                <a href="https://financehb.cz/full-up?code=${code}" style="display: inline-block; padding: 12px 20px; background-color: #C2B067; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Potvrdit registraci</a>
                            </p>
                            <p style="margin: 20px 0 12px 0; font-size: 16px; line-height: 24px; color: #0A1a49;">
                                If you have any questions or need assistance, please don't hesitate to contact our support team.
                            </p>
                            <p style="margin: 0; font-size: 16px; line-height: 24px; color: #0A1a49;">
                                S pozdravem,<br>
                                Petr Krajicgr
                            </p>
                        </td>
                    </tr>
                  
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
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
     
  const raynetAPIUrl = `https://app.raynet.cz/api/v2/company/?tags[LIKE]=${tags.map(t => t)}&rating=A`
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

export async function generateEmailTemplate(documentData: SanityDocument, email: string) {
  // Extract article data
  const { name, emailText, slug, image } = documentData
  const articleUrl = `https://financehb.cz/paywall/${slug?.current || ""}`
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
            <img alt="Logo Financehb.cz" width="220" height="140" src="https:/financehb-ifkh.vercel.app/_next/image?url=%2Flogo.png&amp;w=640&amp;q=75">
            <h1>Novinky ze světa kapitálových trhů</h1>
          </div>
          
          <div class="content">
            <p>Vážený čtenáři,</p>
            <p>máme pro Vás nový článek z oblasti kapitálových trhů.</p>
            
            <div class="article-title">${name}</div>
            <div class="article-date">${formattedDate}</div>
            
            <img src="${imageUrl}" alt="${name}" class="article-image">
            
            <div class="article-emailText">
              ${
                typeof emailText === "string"
                  ? emailText
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
            
            <img alt="petr Krajcigr, EFA" width="300" height="300" src="	https://financehb-ifkh.vercel.app/_next/image?url=%2Fimages%2Fgallery.jpg&w=1080&q=75">
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
              <li>spotřebitelských úvěrů podle zákona č. 257/2016 Sb. jako vázaní zástupci samostatného zprostředkovatele spotřebitelského úvěru, společnosti Chytrý Honza a.s. sídlem Radlická 365/154, Radlice, 158 00 Praha. Tuto skutečnost je možné ověřit v Seznamu regulovaných a registrovaných subjektů finančního trhu České národní banky na <a href="http://www.cnb.cz/cnb/jerrs">http://www.cnb.cz/cnb/jerrs</a>, kde také najdete aktuální podrobnosti o registraci a jejím rozsahu.</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `
}

async function generateVerifyUpdatePassHTML(code: string) {
  return `<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Změna hesla</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a1a49;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 0;">
                <table role="presentation" style="width: 602px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
                   
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #0A1a49;">Změna hesla</h2>
                            <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; color: #0A1a49;">
                                Kliknutím na tlačítko níže potvrdíte změnu hesla:
                                </p>
                            <p style="text-align: center;">
                                <a href="https://financehb.cz/update-pass?code=${code}" style="display: inline-block; padding: 12px 20px; background-color: #C2B067; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Změnit heslo</a>
                            </p>
                        </td>
                    </tr>
                  
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
}

//user
export async function deleteAction(raynet_id:number | null, userId: number) {
  try{
    const userId = await getCurrentUser({withFullUser: true})
    if(!userId?.id){
      return{
        errorMessage: "Nelze najít ID účtu"
      }
    }
        console.log(userId.id)
        await removeUserFromSession(await cookies());
    
        const {rowsAffected} = await turso.execute({
            sql: "DELETE FROM users WHERE id = ?",
            args: [Number(userId?.id)]
        })
        if(rowsAffected===0){
          return{
            errorMessage: "Nelze vymazat účet"
          }
        }
  }catch(error){
    return { errorMessage: getErrorMessage(error) };
  }
}

export const signOutAction = async () => {
  await removeUserFromSession(await cookies());
     revalidatePath("/", "layout")
     return{
      errorMessage: null
     }
     
};

export async function signUp(formData: FormData){
  try {
    const rawData = {
      first_name: formData.get("name"),
      last_name: formData.get("surname"),
      email: formData.get("email"),
      password: formData.get("password"),
      code: formData.get("code")
  }
  const {success, data, error} = signSchema.safeParse(rawData);
  if(error || !success){
    return{
      errorMessage: "Špatně zadaná data"
    }
  }
  const raynetAPIUrl = `https://app.raynet.cz/api/v2/company/?primaryAddress-contactInfo.email=${data.email}`;
  const getCode = await turso.execute({
    sql: "SELECT id,verify_code FROM verify WHERE verify_code = ?",
    args: [data.code as string]
})
if(!getCode.rows[0].verify_code){
  return{
     errorMessage: "Nenalezen kód!",
  }
}
if(getCode.rows[0].verify_code !== data.code){
return{
   errorMessage: "Nesprávný kód!",
    }
}
const delCode = await turso.execute({
sql: "DELETE FROM verify WHERE verify_code = ?",
args: [data.code]
})

if(!delCode.rowsAffected){
return{
   errorMessage: "Unable to delete verify code!",
    }
}
      const salt = generateSalt()

      const hashedPassword = await hashPassword(data.password, salt)
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
      console.log(raynet_id)
      console.log(raynet_id.data[0].id)
      const insertUser = await turso.execute({
        sql: "INSERT INTO users (first_name ,last_name,email, password, salt, raynet_id, is_mail_sub) VALUES (?,?,?,?,?,?,?) RETURNING ID",
        args: [data.first_name as string,data.last_name as string,data.email, hashedPassword, salt, raynet_id.data[0].id, true]
    })
      if(!insertUser.rows[0]?.id) {
                  return {
                      success: false,
                      message: "Unable to create account, try again!",
                      submitted: true,
                      inputs: data
                  }
              }
              const userId = insertUser.rows[0]?.id as number;
              await createUserSession(userId, await cookies())
              return{
                errorMessage:null
              }
      
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
}

export async function verifySignUp(formData: FormData){
try{
  const rawData = {
  email: formData.get("email")
  }
  const {success, error, data} = get_email.safeParse(rawData)
  if(error || !success){
    return{
      errorMessage: "Špatně zadaný e-mail"
    }
  }
  const existingUser = await turso.execute({
          sql: "SELECT * FROM users WHERE email = ? LIMIT 1",
          args: [data.email]
    })
    if(existingUser.rows.length > 0){
      return{
          errorMessage: "Účet pod tímto e-mailem existuje",
      }
  }
  const code = await generateCode()
      if(!code.success || !code.code){
          return {
              errorMessage: "Chyba pří generování kódu!",
          }
      }
      const transporter = await smtp()
      const html = await generateVerifySignUpHTML(code.code)
      const sendCode = await transporter.sendMail({
      subject: "2FA Code",
      from: process.env.FROM_EMAIL,
      to: data.email as string,
      html
  })
      if(!sendCode.accepted){
        return{
          errorMessage: "Chyba při odesílání mailu"
        }
      }
      return{
        errorMessage: null
      }
}catch(error){
  console.log("Error while veryfying setup!: ", error)
      return {
          errorMessage: "problém s vytvořením účtu!",
      }
}
}

export async function logIn(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password")
  }
  const {success, data, error} = signSchema.safeParse(rawData);
  console.log(error)
  if(!success) {
    return{
    errorMessage: "Nesprávná data!",
    }
}
const user = await turso.execute({
  sql: "SELECT password, salt, id, email FROM users WHERE email = ?",
  args: [data.email]
})

if(!user.rows[0] || !user.rows[0]?.password || !user.rows[0]?.salt){
  return {
      errorMessage: "Unable to log in!"
  }
}
const passIsCorrect = await comparePasswords({
        hashedPassword: user.rows[0]?.password as string,
        password: data.password,
        salt: user.rows[0]?.salt as string,
    })

    if(!passIsCorrect){
        return {
            errorMessage: "Špatně zadané heslo!",
        }
    }
    const userId = user.rows[0]?.id as number;
  await createUserSession(userId, await cookies())

      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
}

export async function createCustomerPortal(stripeId: FormData) {

  
  const session = await stripe.billingPortal.sessions.create({
      customer: String(stripeId.get("stripeId")) ,
      return_url:
          process.env.NODE_ENV === "production"
              ? "https://financehb.cz/user"
              : "http://localhost:3000/user",
  });

  return redirect(session.url);
}

export async function updateUser(formData: FormData) {
  try {
    const rawData = {
      id: Number(formData.get("id")),
      first_name: formData.get("name"),
      last_name: formData.get("surname"),
      email: formData.get("email"),
  }
      console.log(rawData)
          const { success, data, error} = changeDetailsSchema.safeParse(rawData);
          console.log(success)
          if(!success) {
              return{
              message: "Špatně zadané údaje",
              }
          }
          const _changeDetails = await turso.execute({
            sql: "UPDATE users SET first_name = ?, last_name = ?,email = ? WHERE id = ?",
            args: [data.first_name as string, data.last_name as string, data.email as string, data.id as number]
        });
    
        if(!_changeDetails.rowsAffected){
            return{
                message: "Nelze změnit údaje!",
                }
        }
        console.log(_changeDetails.rows)
  
      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }finally{
      revalidatePath("/user", "page")
  }
}


export async function updatePassword(formData: FormData) {
  try {
    const rawData = {
     password: formData.get("password"),
      id:Number(formData.get("id"))
  }
 
  const { success, data, error} = changePass.safeParse(rawData);
  console.log(success,error)
  if(!success){
    return{
        errorMessage: "Chyba při vkládání hesla"
    }
  }
      const salt = generateSalt();
      
              const hashedPassword = await hashPassword(data.password, salt);
      
             const _updateUser = await turso.execute({
                  sql: "UPDATE users SET password = ?, salt=? WHERE id = ?",
                  args: [hashedPassword, salt, data.id]
              })
              if(!_updateUser.rowsAffected){
                  return{
                      errorMessage: "Nelze změnit heslo",
                    }
              }
              await signOutAction()
              await removeUserFromSession(await cookies());
              return{errorMessage: null}
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
}

export async function signOutFromMails(formData: FormData): Promise<{success: boolean, message: string}>{
  try{
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
      const _updateUser = await turso.execute({
        sql: "UPDATE users SET is_mail_sub = false WHERE id = ?",
        args: [id]
    })
    if(!_updateUser.rowsAffected){
        return{
            success: false,
        message: "Nebyl jste odhlášen. Vyskytla se chyba."
        }
    }else{
      return{
        success: true,
        message: "Byl jste odhlášen"
      }
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

export async function forgotPassword(formData: FormData) {
  try {
      
    
      const email = formData.get("email") as string;
      const rawData = {
              email: formData.get("email")
          }
      
          const {success, data} = get_email.safeParse(rawData)
      
          if(!success) {
              return{
              errorMessage: "Špatný formát emailu!",
              }
          }
      
          const existingUser = await turso.execute({
              sql: "SELECT * FROM users WHERE email = ? LIMIT 1",
              args: [data.email]
          })
      
          if(existingUser.rows.length === 0){
              return{
                  errorMessage: "Účet neexistuje",
              }
          }
              const code = await generateCode()
              if(!code.success || !code.code){
                  return {
                      errorMessage: "Nelze vygenerovat kód!",
                  }
              }
              const transporter = await smtp()
              const html = await generateVerifyUpdatePassHTML(code.code)
              await transporter.sendMail({
                  subject: "2FA Update Pass Code",
                  from: process.env.FROM_EMAIL,
                  to: data.email as string,
                  html
              })
  
      return { errorMessage: null };
  } catch (error) {
      return { errorMessage: getErrorMessage(error) };
  }
}

export async function updateForgotUser(formData: FormData, code: string) {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
      code: formData.get("code")
  }
      const {success, data} = updatePass.safeParse(rawData)
      
          if(!success) {
              return{
              message: "Nesprávná data",
              }
          }
      console.log(success)
          const existingUser = await turso.execute({
              sql: "SELECT * FROM users WHERE email = ? LIMIT 1",
              args: [data.email]
          })
      
          if(existingUser.rows.length === 0){
              return{
                  success: false,
                  message: "Účet neexistuje",
                  submitted: true,
              }
          }
      
          const delCode = await turso.execute({
              sql: "DELETE FROM verify WHERE verify_code = ?",
              args: [data.code as string]
          })
      
          if(!delCode.rowsAffected){
              return{
                  message: "Nelze ověřit kód!",
                  }
          }
              const salt = generateSalt();
      
              const hashedPassword = await hashPassword(data.password, salt);
      
             const _updateUser = await turso.execute({
                  sql: "UPDATE users SET password = ?, salt=? WHERE email = ? RETURNING id",
                  args: [hashedPassword, salt, data.email]
              })
              if(!_updateUser.rows[0]?.id){
                  return{
                      success: false,
                      message: "Nelze změnit heslo!",
                      submitted: true,
                      }
              }
      
      return { errorMessage: null };
  } catch (error) {
      return { errorMessage: getErrorMessage(error) };
  }
}

export async function createPayment(formData: FormData){
  const user = await getCurrentUser({withFullUser: true});
  const stripeId = formData.get("stripeId") as string;
  if (!stripeId) {
    throw new Error("Stripe ID is missing.");
  }
  let customerStripeId;
  if(user?.id){
    const getStripeId = await turso.execute({
      sql: "SELECT stripe_id FROM users WHERE id = ?",
      args: [user.id]
    })
    if (!getStripeId.rows[0].stripe_id) {
      console.log(`Error fetching profile`);
    }

    customerStripeId = getStripeId.rows[0].stripe_id;
  }  

  if(!customerStripeId && user?.email){
    const stripeCustomer = await stripe.customers.create({
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
    });
    customerStripeId = stripeCustomer.id;
    console.log("Stripe customer created:", customerStripeId);
    const _updateUser = await turso.execute({
      sql: "UPDATE users SET stripe_id=? WHERE id = ?",
      args: [customerStripeId, user.id]
  })
  if(!_updateUser.rowsAffected){
      return{
          errorMessage: "Nelze změnit heslo",
          }
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
      ? "https://financehb.cz/payment/success"
      : "http://localhost:3000/payment/success",
  cancel_url:
    process.env.NODE_ENV === "production"
      ? "https://financehb.cz/payment/cancelled"
      : "http://localhost:3000/payment/cancelled",
});
    console.log("Stripeid:", customerStripeId);
    
  redirect(session.url as string);
}

