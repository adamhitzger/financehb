"use client"

import { MoveUpRight } from 'lucide-react'
import React, {} from 'react'
import { Button } from './ui/button'
import { createPayment } from "@/actions/users";

export default function PaymentButton({ stripeId, total }: { stripeId: string, total: number }) {
    
    return (
        <form action={createPayment}>
            <input type='hidden' name='stripeId' value={stripeId} />
            <input type='hidden' name='total' value={total} />
            <Button size={"lg"} className=' underline underline-offset-4 bg-secondary text-primary '><>Začít odebírat <MoveUpRight /></></Button>
        </form>
    )
}

