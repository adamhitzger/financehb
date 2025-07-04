import Stripe from "stripe";
import { stripe } from "@/lib/utils";
import { headers } from "next/headers";
import { FullUser, RaynetResponse } from "@/types";
import { createInvoice } from "@/actions/users";
import { createTransport } from "nodemailer";
import { turso } from "@/database/client";
export async function POST(req: Request){
    const body = await req.text();
    const raynetAPIUrl = "https://app.raynet.cz/api/v2/company/";
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
    const getUserByStripeId = await turso.execute({
        sql: "SELECT * FROM users WHERE stripe_id = ?",
        args: [stripeId]
    })
    if(!getUserByStripeId.rows[0].id) {
        console.log("Problem with stripe_id in Webhook: ",)
    }
    const untypedUser = getUserByStripeId.rows[0]

    const user: FullUser = {
        id: Number(untypedUser.id),
        first_name: String(untypedUser.first_name),
        last_name: String(untypedUser.last_name),
        email: String(untypedUser.email),
        raynet_id: Number(untypedUser.raynet_id) ?? null,
        is_mail_sub: Boolean(untypedUser.is_mail_sub),
        stripe_id: String(untypedUser.stripe_id)
    }
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
        if(user.raynet_id === null){ 
  const raynet = await fetch(raynetAPIUrl, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(process.env.RAYNET_EMAIL! + ":" + process.env.RAYNET_API_KEY!).toString("base64"),
        "X-Instance-Name": "financehb",
    },
    body: JSON.stringify({
        name: user.first_name + " " + user.last_name,
        firstName: user.first_name,
        lastName: user.last_name,
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
                email: user.email,
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
        tags: ["Mesicni akt z KPT placene"],
    }),
    
});
await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.FROM_EMAIL,
    subject: "Nové přihlášení - Měsíční akt z KPT placené",
    text: `Celé jméno: ${user.first_name + " " + user.last_name}, Email: ${user.email}`
   })
if(!raynet.ok){
  throw new Error(`Request failed with status: ${raynet.status}`);
}
  const raynet_id = await raynet.json() as RaynetResponse;
  console.log(raynet_id.data.id)
            const insert_r_id = await turso.execute({
                sql: "UPDATE users SET raynet_id = ? WHERE id = ?",
                args: [raynet_id.data.id, user.id]
            })
            if(insert_r_id.rowsAffected === 0) {
                console.log("Problem with inserting Raynet Id in Webhook")
                return new Response('Error while inserting raynet_id', { status: 500 });
            }
            }
            const insert_sub = await turso.execute({
                sql: `INSERT INTO subscriptions (user_id, 
                stripe_subscription_id,
                period_start,
                period_end,
                status,
                interval,
                plan_id) VALUES(?,?,?,?,?,?,?)`,
                args: [user.id,subscription.id as string,subscription.current_period_start as number,subscription.current_period_end as number,subscription.status,subscription.items.data[0].plan.interval as string,subscription.items.data[0].plan.id as string]
            })
            if(insert_sub.rowsAffected === 0){
                console.log("Problem while inserting subscription")
                return new Response('Error while inserting subscription', { status: 500 });
            }
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
                    const idoklad = await createInvoice(total, user.first_name,user.last_name ,session.discount?.coupon.percent_off);
                    if(idoklad.data) console.log("iDoklad ok")
                        else console.log("iDoklad error")
                    const update_sub = await turso.execute({
                        sql: `UPDATE subscriptions SET user_id = ?, 
                        stripe_subscription_id = ?,
                        period_start =?,
                        period_end=?,
                        status=?,
                        interval=?,
                        plan_id =?`,
                        args: [user.id,session.id as string,session.current_period_start as number,session.current_period_end as number,session.status,session.items.data[0].plan.interval as string,session.items.data[0].plan.id as string]
                    })
                    if(update_sub.rowsAffected === 0){
                        console.log("Problem while inserting subscription")
                        return new Response('Error while updating subscription', { status: 500 });
                    }
                    
                }else if(session.status === "canceled"){
                    const {rowsAffected} = await turso.execute({
                        sql:"DELETE FROM subscriptions WHERE stripe_subscription_id = ?",
                        args: [session.id]
                    })
                    if(rowsAffected){
                        console.log("Problem while deleting subscription")
                        return new Response('Error while deleting subscription', { status: 500 });
                    }
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
                const {rowsAffected} = await turso.execute({
                    sql:"DELETE FROM subscriptions WHERE stripe_subscription_id = ?",
                    args: [session.id]
                })
                if(rowsAffected){
                    console.log("Problem while deleting subscription")
                    return new Response('Error while deleting subscription', { status: 500 });
                }
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
                  const update_sub = await turso.execute({
                    sql: `UPDATE subscriptions SET user_id = ?, 
                    stripe_subscription_id = ?,
                    period_start =?,
                    period_end=?,
                    status=?,
                    interval=?,
                    plan_id =?`,
                    args: [user.id,subscription.id as string,subscription.current_period_start as number,subscription.current_period_end as number,subscription.status,subscription.items.data[0].plan.interval as string,subscription.items.data[0].plan.id as string]
                })
                if(update_sub.rowsAffected === 0){
                    console.log("Problem while inserting subscription")
                    return new Response('Error while updating subscription', { status: 500 });
                }
                 }catch(error){
                console.error("Error - invoice.payment_succeded: ", error);
  return new Response("Failed to process subscription", { status: 500 });
              }
            break;
    }
    return new Response(null, { status: 200 });
}