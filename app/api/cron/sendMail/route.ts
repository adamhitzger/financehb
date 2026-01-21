import { turso } from "@/database/client"
import {createTransport } from "nodemailer"
import {render} from "@react-email/render"
import { SubscriptionExpiryEmail } from "@/components/SubEmailInfo";

export async function GET(request: Request){
    const now = Date.now() / 1000
    const transporter = createTransport({
    service: "gmail",
    auth: {
     user: process.env.FROM_EMAIL,
     pass: process.env.FROM_EMAIL_PASSWORD,
    }
   });
   let expirationText:string = "";
    try{
        
        const getUsersDate = await turso.execute({
            sql: `SELECT subscriptions.*, users.*
                  FROM subscriptions
                  JOIN users ON subscriptions.user_id = users.id;`
        });

        for(let i=0;i<=getUsersDate.rows.length;i++){
            const endDate = getUsersDate.rows[i].period_end as number
            const diff = (endDate-now) / (60*60*24);
            if(diff === 90){
                expirationText = "za 3 měsíce.";
            }else if(diff === 30) {
                expirationText = "za 1 měsíc."
            }else if (diff === 7){
                expirationText = "za 1 týden."
            }
        }
    }catch(error){
        console.error("Error přicron jobu:", error);
    }
}