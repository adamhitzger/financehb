"use client"

import { Loader2, MoveUpRight } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { Button } from './ui/button'
import router from 'next/router';
import toast from 'react-hot-toast';
import { createPayment } from "@/actions/users";

export default function PaymentButton({ stripeId, total }: { stripeId: string, total: number }) {
    
    return (
        <form action={createPayment}>
            <input type='hidden' name='stripeId' value={stripeId} />
            <input type='hidden' name='total' value={total} />
            <Button className=' underline underline-offset-4 bg-secondary text-primary '><>Začít odebírat <MoveUpRight /></></Button>
        </form>
    )
}

