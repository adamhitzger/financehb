"use server";
import {createTransport } from "nodemailer"

export async function sendEmail(formData: FormData, type: "Ebook" | "Kontakt") {
    let jmeno: string = "";
      let phone: string = "";
      let email: string = "";
      let ltd: string = "";
      let msg: string = "";
  
      
          jmeno = formData.get("name") as string;
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
        text: type === "Kontakt" ? `  ${jmeno}, ${phone}, ${email}, ${ltd}, ${msg}` : "<p>ahoj</p>" ,
        html: type === "Kontakt" ? "<p>Ahoj</p>" : `<h1>${jmeno}</h1><a href="${msg}" target="_blank" rel="noopener noreferrer">Download eBook</a>
          <p>Or view the preview below:</p>
          <img src="${msg}" alt="eBook preview" style="width:100%; "/>` ,
        attachments: [
          {
            filename: "ebook.pdf",
            path: msg,
          }
        ]
        };
  
      try{
        await  transporter.sendMail(mailOptions);  
      }catch(error){
        console.log(error);
      }
    }