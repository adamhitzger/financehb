import { createSupabaseClient } from "@/auth/server";
import Stripe from "stripe";
import { stripe } from "@/lib/utils";
import { headers } from "next/headers";
import { RaynetResponse } from "@/types";
import { createInvoice } from "@/actions/users";
import { createTransport } from "nodemailer";
export async function POST(req: Request){
    const body = await req.text();
    const raynetAPIUrl = "https://app.raynet.cz/api/v2/company/";
    const client = await createSupabaseClient("deleteAccount");
    const headerList = await headers();
    const signature = headerList.get("Stripe-Signature") as string;
    let event: Stripe.Event;
    const transporter = createTransport({
           service: "gmail",
           auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.FROM_EMAIL_PASSWORD,
           }
          });
          
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: unknown) {
         console.error(`Webhook Error: ${(error as Error).message}`);
        return new Response("Webhook error", { status: 400 });
    }
    
    let session = event.data.object as Stripe.Checkout.Session
    const stripeId = session.customer as string
    const user = await client.from("profiles").select().eq("stripeId", stripeId).single();
    if(user.error) console.log(user.error);
    if(user.data) console.log(user.data);
    switch(event.type){
        case "checkout.session.completed":
            try{
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );
            if (!session.subscription) {
                console.error("Subscription ID is missing in the session object.");
                return new Response("Subscription ID not found", { status: 400 });
              }
              const invoice = await stripe.invoices.retrieve(subscription.latest_invoice as string);
const total = invoice.amount_due / 100;
        if(user.data.raynet_id === null){ 
  const raynet = await fetch(raynetAPIUrl, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(process.env.RAYNET_EMAIL! + ":" + process.env.RAYNET_API_KEY!).toString("base64"),
        "X-Instance-Name": "financehb",
    },
    body: JSON.stringify({
        name: user.data.first_name + " " + user.data.last_name,
        firstName: user.data.fist_name,
        lastName: user.data.last_name,
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
                email: user.data.email,
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
        tags: ["Mesicni akt z KPT"],
    }),
    
});
await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.FROM_EMAIL,
    subject: "Nové přihlášení - Měsíční akt z KPT placené",
    text: `Celé jméno: ${user.data.fist_name + " " + user.data.last_name}, Email: ${user.data.email}`
   })
if(!raynet.ok){
  throw new Error(`Request failed with status: ${raynet.status}`);
}
  const raynet_id = await raynet.json() as RaynetResponse;
  console.log(raynet_id.data.id)
  
            const insert_r_id = await client.from("profiles").update({
                raynet_id: raynet_id.data.id
            }).eq("id", user.data.id)
            if(insert_r_id.error) console.error("Error when updating raynet id: ", insert_r_id.error);
            if(insert_r_id.data) console.log(insert_r_id.data);

            }
            
            const {data, error} = await client.from("subscriptions").insert({
                    user_id: user.data.id as string,
                    stripe_subscriptions_id: subscription.id as string,
                    periodStart: subscription.current_period_start,
                    periodEnd: subscription.current_period_end,
                    status: subscription.status as string,
                    plan_id: subscription.items.data[0].plan.id as string,
                    interval: String(subscription.items.data[0].plan.interval),
                })
            if(error) console.log("Vkládaní nového předplatného se nepodřilo: ",error);
            if(data) console.log(data);  
        } catch (err) {
            console.error('Unexpected error:', err);
            return new Response('Unexpected error', { status: 500 });
        }
            break;
        case "customer.subscription.updated":
            
         
            try{
                const session = await stripe.subscriptions.retrieve(
                    (event.data.object as Stripe.Subscription).id
                );
                const invoice = await stripe.invoices.retrieve(session.latest_invoice as string);
const total = invoice.amount_due / 100;
                if(session.status === "active"){
                    const idoklad = await createInvoice(total, user.data.first_name,user.data.last_name ,session.discount?.coupon.percent_off);
                    if(idoklad.data) console.log("iDoklad ok")
                        else console.log("iDoklad error")
                    const {data, error} = await client.from("subscriptions").update({
                        stripe_subscriptions_id: session.id as string,
                        periodStart: session.current_period_start,
                        periodEnd: session.current_period_end,
                        status: session.status,
                        plan_id: session.items.data[0].plan.id as string,
                        interval: String(session.items.data[0].plan.interval),
                    }).eq("stripe_subscriptions_id", session.id)
                    if(error) console.log(error.message);
                    if(data) console.log(data);
                }else if(session.status === "canceled"){
                    const {data, error} = await client.from("subscriptions").delete().eq("stripe_subscriptions_id", session.id)
                }

                
            } catch (err) {
                console.error('Unexpected error:', err);
                return new Response('Unexpected error', { status: 500 });
            }
                break;
            case "customer.subscription.deleted":
            try{
                const session = await stripe.subscriptions.retrieve(
                    (event.data.object as Stripe.Subscription).id
                );     
                const {data, error} = await client.from("subscriptions").delete().eq("stripe_subscriptions_id", session.id);
                      
                if(error) console.log(error.message);
                if(data) console.log(data);
            } catch (err) {
                console.error('Unexpected error:', err);
                return new Response('Unexpected error', { status: 500 });
            }
                break;
            default:
            console.warn(`Unhandled event type: ${event.type}`);
            break;
            case "invoice.payment_succeeded":
              try{
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );
                const invoice = await stripe.invoices.retrieve(subscription.latest_invoice as string);
const total = invoice.amount_due / 100;
    const discount = subscription.discount?.coupon.percent_off ?? 0
                if (!session.subscription) {
                    console.error("Subscription ID is missing in the session object.");
                    return new Response("Subscription ID not found", { status: 400 });
                  }
                const {data, error} = await client.from("subscriptions").update({
                    stripe_subscriptions_id: subscription.id as string,
                    periodStart: subscription.current_period_start,
                    periodEnd: subscription.current_period_end,
                    status: subscription.status,
                    plan_id: subscription.items.data[0].plan.id as string,
                    interval: String(subscription.items.data[0].plan.interval),
                }).eq("stripe_subscriptions_id", subscription.id)
                if(error) console.log(error.message);
                if(data) console.log(data);
                 }catch(error){
                console.error("Error - invoice.payment_succeded: ", error);
  return new Response("Failed to process subscription", { status: 500 });
              }
            break;
    }
    return new Response(null, { status: 200 });
}