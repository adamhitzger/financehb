import { createSupabaseClient, getUser } from "@/auth/server";
import Stripe from "stripe";
import { stripe } from "@/lib/utils";
import { headers } from "next/headers";

export async function POST(req: Request){
    const body = await req.text();
    const raynetAPIUrl = "https://app.raynet.cz/api/v2/company/";
    const client = await createSupabaseClient("deleteAccount");
    const headerList = await headers();
    const signature = headerList.get("Stripe-Signature") as string;
    
    let event: Stripe.Event;

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


    switch(event.type){
    case "invoice.payment_succeeded":
              try{
                const session = await stripe.subscriptions.retrieve(
                    (event.data.object as Stripe.Invoice).id
                );
                const {data, error} = await client.from("subscriptions").update({
                    periodStart: session.current_period_start,
                    periodEnd: session.current_period_end,
                    status: session.status,
                    plan_id: session.items.data[0].plan.id as string,
                    interval: String(session.items.data[0].plan.interval),
                }).eq("stripe_subscriptions_id", session.id)
                if(error) console.log(error.message);
                if(data) console.log(data);
              }catch(error){
                console.error("Error - invoice.payment_succeded: ", error);
              }
            break;
        case "checkout.session.completed":
            try{
            const session = await stripe.subscriptions.retrieve(
                (event.data.object as Stripe.Checkout.Session).id
            );
            const stripeId = session.customer as string
            const auth = await getUser();
            if(auth?.id && auth?.email && auth?.name && auth?.surname && auth?.stripeId && auth?.stripeId === stripeId ){
            const {data, error} = await client.from("subscriptions").insert({
                user_id: auth.id as string,
                stripe_subscriptions_id: session.id as string,
                periodStart: session.current_period_start,
                periodEnd: session.current_period_end,
                status: session.status,
                plan_id: session.items.data[0].plan.id as string,
                interval: String(session.items.data[0].plan.interval),
            })
            if(error) console.log(error.message);
            if(data) console.log(data);
            
            
            
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
                const {data, error} = await client.from("subscriptions").update({
                    status: "canceled"
                }).eq("stripe_subscriptions_id", session.id);
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
    }
    return new Response(null, { status: 200 });
}