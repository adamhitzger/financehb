"use client"

import { Loader2, MoveUpRight } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { Button } from './ui/button'
import router from 'next/router';
import toast from 'react-hot-toast';
import { createPayment } from "@/actions/users";

export default function PaymentButton({ stripeId }: { stripeId: string }) {
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        stripeId: stripeId
    });

    const handlePayment = (formData: FormData) => {
        startTransition(async () => {
            await createPayment(formData);
        })
    }
    return (
        <form action={handlePayment}>
            <input type='hidden' name='stripeId' value={stripeId} />
            <Button className=' underline underline-offset-4 bg-secondary text-primary '>{isPending ? <Loader2 className={"animate-spin"} /> : <>Začít odebírat <MoveUpRight /></>}</Button>
        </form>
    )
}

