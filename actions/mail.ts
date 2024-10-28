"use server";
import {createTransport } from "nodemailer"
export async function sendNewsletter(formData: FormData){
  let jmeno: string = "";
  let email: string = "";
      jmeno = formData.get("name") as string;
          email = formData.get("email") as string;
  const raynetAPIUrl = "https://app.raynet.cz/api/v2/company/";
  try {
  await fetch(raynetAPIUrl, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(process.env.RAYNET_EMAIL + ":" + process.env.RAYNET_API_KEY).toString("base64"),
        "X-Instance-Name": "financehb",
    },
    body: JSON.stringify({
        name: formData.get("name") as string,
        rating: "A",
        state: "A_POTENTIAL",
        role: "A_SUBSCRIBER",
        tags: ["Měsíční report zdarma 1m"],
        primaryAddress: {
        contactInfo: {
          email: email,
        }
      },
    }),
  
});
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
        to: type === "Kontakt" ? process.env.TO_EMAIL : email,
        subject: type,
        text: type === "Kontakt" ? "Kontakt"   : "Ebook" ,
        html: type === "Kontakt" ? `<p>${jmeno}, ${phone}, ${email}, ${ltd}, ${msg}</p>` : `<h1>${jmeno}</h1><a href="${msg}" target="_blank" rel="noopener noreferrer">Download eBook</a>
          <p>Or view the preview below:</p>
          <img src="${msg}" alt="eBook preview" style="width:100%; "/>` ,
        attachments: type === "Ebook" 
        ? [
            {
              filename: "ebook.pdf",
              path: msg, // pokud msg je URL
            }
          ] 
        : [],
    };
  
      try{
        await  transporter.sendMail(mailOptions);  
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
        tags: ["Stažený eBook"],
        primaryAddress: {
        contactInfo: {
          email: email,
        }
      }
      })
    });
  }
      }catch(error){
        console.log(error);
      }
    }