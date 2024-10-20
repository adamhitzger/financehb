import { createSupabaseClient, getUser } from "@/auth/server";
import Stripe from "stripe";
import { stripe } from "@/lib/utils";
import { headers } from "next/headers";

export async function POST(req: Request){
    const client = createSupabaseClient("deleteAccount");
    const signature = headers().get("Stripe-Signature") as string;
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

    const session = event.data.object as Stripe.Checkout.Session;

    switch(event.type){
        case "checkout.session.completed":
            try{
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );
            const stripeId = session.customer as string
            const user = await client.from("profiles").select().eq("stripeId", stripeId).single();
            if(user.error) console.log(user.error);
            if(user.data) console.log(user.data);
            
            const {data, error} = await client.from("subscriptions").insert({
                user_id: user.data.id as string,
                stripe_subscriptions_id: subscription.id as string,
                periodStart: subscription.current_period_start,
                periodEnd: subscription.current_period_end,
                status: "Aktivní",
                plan_id: subscription.items.data[0].plan.id as string,
                interval: String(subscription.items.data[0].plan.interval),
            })
            if(error) console.log(error.message);
            if(data) console.log(data);
        } catch (err) {
            console.error('Unexpected error:', err);
            return new Response('Unexpected error', { status: 500 });
        }
            break;
        case "customer.subscription.updated":
            try{
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );
                const stripeId = session.customer as string
                const user = await client.from("profiles").select().eq("stripeId", stripeId).single();
                if(user.error) console.log(user.error);
                if(user.data) console.log(user.data);
                
                const {data, error} = await client.from("subscriptions").update({
                    stripe_subscriptions_id: subscription.id as string,
                    periodStart: subscription.current_period_start,
                    periodEnd: subscription.current_period_end,
                    status: "Aktivní",
                    plan_id: subscription.items.data[0].plan.id as string,
                    interval: String(subscription.items.data[0].plan.interval),
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
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );
                const stripeId = session.customer as string
                const user = await client.from("profiles").select().eq("stripeId", stripeId).single();
                if(user.error) console.log(user.error);
                if(user.data) console.log(user.data);
                
                const {data, error} = await client.from("subscriptions").delete().eq("stripe_subscriptions_id", subscription.id)
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