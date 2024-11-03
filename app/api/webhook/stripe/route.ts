import { createSupabaseClient, getUser } from "@/auth/server";
import Stripe from "stripe";
import { stripe } from "@/lib/utils";
import { headers } from "next/headers";

export async function POST(req: Request){
    const raynetAPIUrl = "https://app.raynet.cz/api/v2/company/";
    const client = await createSupabaseClient("deleteAccount");
    const headersList = await headers()
    const signature = headersList.get("Stripe-Signature") as string;
    const body = await req.text();
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (error: unknown) {
         console.error(`Webhook Error: ${(error as Error).message}`);
        return new Response("Webhook error", { status: 400 });
    }


    switch(event.type){
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
            const raynetId = await fetch(raynetAPIUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + Buffer.from(process.env.RAYNET_EMAIL + ":" + process.env.RAYNET_API_KEY).toString("base64"),
                    "X-Instance-Name": "financehb",
                },
                body: JSON.stringify({
                    name: auth.name + " " + auth.surname,
                    rating: "A",
                    state: "A_POTENTIAL",
                    role: "A_SUBSCRIBER",
                    tags: ["Měsíční report"],
                    primaryAddress: {
                        contactInfo: {
                          email: auth.email,
                        }
                    }
                }),
              
            });
            
            if(raynetId.ok){
                const {id} = await raynetId.json();
                console.log(id);
            if (id.success) {
                const raynet = await client.from("profiles").insert({raynet_id: id}).eq("id", auth.id);
                if(raynet.error) console.log(raynet.error);
                if(raynet.data) console.log(raynet.data)
            } else {
                throw new Error("Creation was not successful");
            }
        } else {
            throw new Error(`Request failed with status: ${raynetId.status}`);
        }
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
                const stripeId = session.customer as string
                const user = await client.from("profiles").select().eq("stripeId", stripeId).single();
                if(user.error) console.log(user.error);
                if(user.data) console.log(user.data);
                
                const {data, error} = await client.from("subscriptions").update({
                    stripe_subscriptions_id: session.id as string,
                    periodStart: session.current_period_start,
                    periodEnd: session.current_period_end,
                    status: session.status,
                    plan_id: session.items.data[0].plan.id as string,
                    interval: String(session.items.data[0].plan.interval),
                }).eq("user_id", user.data.id)
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
                const stripeId = session.customer as string
                const user = await client.from("profiles").select().eq("stripeId", stripeId).single();
                if(user.error) console.log(user.error);
                if(user.data) console.log(user.data);
                
                const {data, error} = await client.from("subscriptions").delete().eq("stripe_subsciption_id", session.id)
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