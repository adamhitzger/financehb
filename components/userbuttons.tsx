"use client"
import { deleteAction, signOutAction } from '@/actions/users';
import React, { useTransition } from 'react'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function SignOut() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const handleClickSignOutButton = async () => {
        startTransition(async () => {

            const { errorMessage } = await signOutAction();
            if (errorMessage) {
                toast.error(errorMessage);
            } else {
                toast.success("Úspěšně odhlášen");
            }
            router.push("/");
            router.refresh();
        });
    };
    return (
        <Button variant={"destructive"} size={"lg"} onClick={handleClickSignOutButton}>{isPending ? <Loader2 className='animate-spin' /> : "Odhlásit se"}</Button>
    )
}

export function Delete({ id, raynet_id }: { id: number , raynet_id:number | null}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const handleClicDeleteButton = async () => {
        startTransition(async () => {
            const { errorMessage } = await deleteAction(raynet_id,id);
            if (errorMessage) {
                toast.error(errorMessage);
            } else {
                toast.success("Účet byl smazán");
            }
            router.push("/");
        });
    };
    return (
        <form action={handleClicDeleteButton}>
            <input type="hidden" name='id' value={id} />
            <Button variant={"destructive"} size={"lg"} >{isPending ? <Loader2 className='animate-spin' /> : "Smazat účet"}</Button>
        </form>
    )
}