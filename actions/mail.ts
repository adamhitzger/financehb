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
        tags: ["Měsíční aktuality z kapitálového trhu - zdarma ke stažení"],
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
        html: type === "Kontakt" ? `<p>${jmeno}, ${phone}, ${email}, ${ltd}, ${msg}</p>` : `<div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
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
                                Thank you for your interest in our eBook. Your download is now ready!
                            </p>
                            <p style="text-align: center;">
                                <a href="${msg}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 20px; background-color: #C2B067; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Download eBook</a>
                            </p>
                            <p style="margin: 20px 0 20px 0; font-size: 16px; line-height: 24px; color: #0A1a49; text-align: center;">
                                Preview and highlights of your eBook:
                            </p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="width: 50%; padding-right: 15px; vertical-align: top;">
                                        <img src="${msg}" alt="eBook preview" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
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
    </table>
</div>` ,
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