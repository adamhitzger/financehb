import { createSupabaseClient, getUser } from "@/auth/server";
import Stripe from "stripe";
import { stripe } from "@/lib/utils";
import { headers } from "next/headers";

export async function POST(req: Request){
    const client = createSupabaseClient();
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (error: unknown) {
        return new Response("Webhook error", {status: 400})
    }

    const session = event.data.object as Stripe.Checkout.Session;

    switch(event.type){
        case "customer.subscription.updated":
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );
            const stripeId = session.customer as string
            const user = await client.from("profiles").select().eq("stripeId", stripeId).single();
            if(user.error) console.log(user.error);
            if(user.data) console.log(user.data);
            
            await client.from("subscriptions").insert({
                userid: user.data.id,
                stripeSubsId: subscription.id,
                periodStart: subscription.current_period_start,
                periodEnd: subscription.current_period_end,
                status: "Aktivní",
                planId: subscription.items.data[0].plan.id,
                interval: String(subscription.items.data[0].plan.interval),
            })
            break;
    }
}