"use client"
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import React, { useState, useTransition } from 'react'
import { createCustomerPortal } from '@/actions/users';
import { Loader2, MoveUpRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import { stripe } from '@/lib/utils';
export default function SubInfoForm({stripeId}: {stripeId: string}) {
    const [isPending, startTransition] = useTransition();
    
    const subInfo= (formData: FormData) => {
        startTransition(async () => {
            await createCustomerPortal(formData)
            toast.success("Budete přesměrováni");
        })
    }
    
    return (
        <form action={subInfo}>
                                <input type="hidden" name="stripeId" value={stripeId} required/>
                                <Button variant={"destructive"} size={"lg"} disabled={isPending}>{isPending ? <Loader2 className='animate-spin'/> : <>Přestat odebírat <MoveUpRight /></>}</Button>
                            </form>
    )
}
