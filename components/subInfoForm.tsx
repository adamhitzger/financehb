"use client"
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import React, { useState, useTransition } from 'react'
import { createCustomerPortal, signOutFromMails } from '@/actions/users';
import { Loader2 } from 'lucide-react';
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
                                <Button variant={"destructive"} size={"lg"} disabled={isPending}>{isPending ? <Loader2 className='animate-spin'/> : <>Předplatné </>}</Button>
                            </form>
    )
}

export function SignOutFromNews({raynetId, dbId}: {raynetId: number, dbId: number}) {
    const [isPending, startTransition] = useTransition();
    
    const signOutMail= (formData: FormData) => {
        startTransition(async () => {
            const signOut = await signOutFromMails(formData)
            if(signOut.success) toast.success(signOut.message)
            else toast.error(signOut.message)
        })
    }
    
    return (
        <form action={signOutMail} className='col-span-2'>
                                <input type="hidden" name="raynetId" value={raynetId} required/>
                                <input type="hidden" name="dbId" value={dbId} required/>
                                <Button variant={"destructive"} size={"lg"} className='w-full' disabled={isPending}>{isPending ? <Loader2 className='animate-spin'/> : <>Přestat odebírat emaily</>}</Button>
                            </form>
    )
}
