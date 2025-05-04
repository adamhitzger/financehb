"use server";
import { redirect } from "next/navigation";
import {createTransport } from "nodemailer"
export async function sendNewsletter(formData: FormData){
  let jmeno: string = "";
  let email: string = "";
      jmeno = formData.get("name") as string;
          email = formData.get("email") as string;
  const raynetAPIUrl = "https://app.raynet.cz/api/v2/company/";
  const transporter = createTransport({
    service: "gmail",
    auth: {
     user: process.env.FROM_EMAIL,
     pass: process.env.FROM_EMAIL_PASSWORD,
    }
   });
   const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.FROM_EMAIL,
    subject: "Nové přihlášení - Měsíční aktuality z KPT",
    text: `Celé jméno: ${jmeno}, Email: ${email}`
   }
   const mailOptions2 = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "Měsíční aktuality z KPT",
    html: `<div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
<table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="padding: 0;">
            <table role="presentation" style="width: 602px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
                <tr>
                    <td style="padding: 40px 30px; background-color: #0A1a49; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Your eBook is Ready, ${jmeno}!</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #0A1a49;">
                            Měsíční aktuality z KPT!
                        </p>
                        <p style="text-align: center;">
                            <a href="${"link"}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 20px; background-color: #C2B067; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Download eBook</a>
                        </p>
                        <p style="margin: 20px 0 20px 0; font-size: 16px; line-height: 24px; color: #0A1a49; text-align: center;">
                            Preview and highlights of your eBook:
                        </p>
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="width: 50%; padding-right: 15px; vertical-align: top;">
                                    <img src="${"link"}" alt="eBook preview" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
                                </td>
                                <td style="width: 50%; padding-left: 15px; vertical-align: top;">
                                    <h2 style="margin: 0 0 10px 0; font-size: 18px; color: #0A1a49;">What's Inside:</h2>
                                    <ul style="margin: 0; padding: 0 0 0 20px; font-size: 14px; line-height: 20px; color: #0A1a49;">
                                        <li style="margin-bottom: 10px;">Comprehensive guide to [topic]</li>
                                        <li style="margin-bottom: 10px;">Practical tips and strategies</li>
                                        <li style="margin-bottom: 10px;">Real-world case studies</li>
                                        <li style="margin-bottom: 10px;">Expert insights and analysis</li>
                                    </ul>
                                    <p style="margin: 20px 0 0 0; font-size: 14px; line-height: 20px; color: #0A1a49;">
                                        This eBook is packed with valuable information to help you [benefit]. Whether you're a beginner or an expert, you'll find actionable advice to [achieve goal].
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background-color: #f4f4f4; text-align: center;">
                        <p style="margin: 0; font-size: 14px; line-height: 20px; color: #999999;">
                            If you have any questions about the eBook or trouble downloading, please contact our support team.
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>` ,
/*
attachments: 
[
    {
      filename: "Měsíční aktuality z kapitálového trhu",
      path: "msg", 
    }
  ],* */
};
  try {
    await  transporter.sendMail(mailOptions2);  
  await fetch(raynetAPIUrl, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(process.env.RAYNET_EMAIL + ":" + process.env.RAYNET_API_KEY).toString("base64"),
        "X-Instance-Name": "financehb",
    },
    body: JSON.stringify({
        name: jmeno,
        rating: "A",
        state: "A_POTENTIAL",
        role: "A_SUBSCRIBER",
        addresses: [
          {
              address: {
                  name: "Sídlo klienta",
                  street: "",
                  city: "",
                  province: "",
                  zipCode: "",
                  country: "CZ",
                  lat: 0,
                  lng: 0
              },
          contactInfo: {
              email: email,
              email2: "",
              fax: "",
              otherContact: "",
              tel1: "",
              tel1Type: "",
              tel2: "",
              tel2Type: "",
              www: "",
              doNotSendMM: false
              },
          }
          ],
        tags: ["Mesicni akt z KPT VZOR zdarma"],
    }),
    
});
await  transporter.sendMail(mailOptions);
}catch(error){
  console.log(error);
}
} 
export async function sendEmail(formData: FormData, type: "Ebook" | "Kontakt") {
      let jmeno: string = "";
      let prijmeni: string = "";
      let phone: string = "";
      let email: string = "";
      let ltd: string = "";
      let msg: string = "";
 
      jmeno = formData.get("name") as string;
      prijmeni = formData.get("surname") as string;
      phone = formData.get("tel") as string;
      email = formData.get("email") as string;
      ltd = formData.get("company") as string;
      msg = formData.get("msg") as string;
  
      const transporter = createTransport({
       service: "gmail",
       auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_EMAIL_PASSWORD,
       }
      });
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: process.env.FROM_EMAIL,
        subject: "Nové přihlášení - Stažený eBook",
        text: `Celé jméno: ${jmeno + " " + prijmeni}, Email: ${email}, Telefon: ${phone}`
       }
      
      const mailOptions2 = {
        from: process.env.FROM_EMAIL,
        to: type === "Kontakt" ? process.env.TO_EMAIL : email,
        subject: type,
        text: type === "Kontakt" ? "Kontakt"   : "Ebook" ,
        html: type === "Kontakt" ? `<p>${jmeno}, ${phone}, ${email}, ${ltd}, ${msg}</p>` : `<div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 0;">
                <table role="presentation" style="width: 602px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 40px 30px; background-color: #0A1a49; text-align: center;">
                            <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Váš e-Book dorazil, ${jmeno}!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #0A1a49;">
                                Děkuji za Váš zájem si stáhnout můj e-Book a dozvědět se nové informace.
                            </p>
                            <p style="margin: 20px 0 20px 0; font-size: 16px; line-height: 24px; color: #0A1a49; text-align: center;">
                                Kapitoly a highlighty eBooku:
                            </p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="width: 50%; padding-right: 15px; vertical-align: top;">
                                        <img src="${msg}" alt="eBook preview" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
                                    </td>
                                    <td style="width: 50%; padding-left: 15px; vertical-align: top;">
                                        <h2 style="margin: 0 0 10px 0; font-size: 18px; color: #0A1a49;">Co najdete uvnitř:</h2>
                                        <ul style="margin: 0; padding: 0 0 0 20px; font-size: 14px; line-height: 20px; color: #0A1a49;">
                                            <li style="margin-bottom: 10px;">Co je to DIP</li>
                                            <li style="margin-bottom: 10px;">Kolikm potřebuji na vlastní rentu</li>
                                            <li style="margin-bottom: 10px;">Kdy půjdu do důchodu</li>
                                            <li style="margin-bottom: 10px;">Spoření dětem</li>
                                        </ul>
                                        <p style="margin: 20px 0 0 0; font-size: 14px; line-height: 20px; color: #0A1a49;">
                                            Každý z nás se v nějaké fázi života začne zamýšlet nad tím, jak bude jeho finanční
situace vypadat v důchodovém věku. Začneme přehodnocovat své finanční plány
a budeme si chtít zajistit bezstarostný důchod...
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; background-color: #f4f4f4; text-align: center;">
                            <p style="margin: 0; font-size: 14px; line-height: 20px; color: #999999;">
                                V případě potíží se stažením souboru klikněte <a href="${msg}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline">zde</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>` ,
        attachments: type === "Ebook" 
        ? [
            {
              filename: "ebook.pdf",
              path: msg, 
            }
          ] 
        : [],
    };
  
      try{
        await  transporter.sendMail(mailOptions2);  
        const raynetAPIUrl = "https://app.raynet.cz/api/v2/company/";
if(type === "Ebook"){
    await fetch(raynetAPIUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(process.env.RAYNET_EMAIL + ":" + process.env.RAYNET_API_KEY).toString("base64"),
        "X-Instance-Name": "financehb",
      },
      body: JSON.stringify({
        name: jmeno + " " + prijmeni,
        lastName: prijmeni,
        firstName: jmeno,
        rating: "A",
        state: "A_POTENTIAL",
        role: "A_SUBSCRIBER",
        addresses: [
          {
              address: {
                  name: "Sídlo klienta",
                  street: "",
                  city: "",
                  province: "",
                  zipCode: "",
                  country: "CZ",
                  lat: 0,
                  lng: 0
              },
          contactInfo: {
              email: email,
              email2: "",
              fax: "",
              otherContact: "",
              tel1: "",
              tel1Type: "",
              tel2: "",
              tel2Type: "",
              www: "",
              doNotSendMM: false
              },
          }
          ],
        tags: ["Stazeny eBook Financehb.cz"],
      })
    });
    await transporter.sendMail(mailOptions)
  }
  
      }catch(error){
        console.log(error);
      }finally{
        if(type === "Ebook")redirect(msg);
      }
    }