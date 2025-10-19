"use client"
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import React, { useState, useTransition } from 'react'
import { sendNewsletter } from '@/actions/mail';
import { Loader2, MoveUpRight } from 'lucide-react';

export default function Newsletter() {
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    const handleSendMail = (formData: FormData) => {
        startTransition(async () => {
            await sendNewsletter(formData)
            toast.success("Váš email byl uložen");
            setForm({
                name: "",
                email: "",
            })
        })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };
    return (
        <form className="w-full  flex flex-col gap-4 items-center" action={handleSendMail} id='newsletter'>
            <Input className='w-full md:w-3/5' name="name" type="text" placeholder="Zadejte celé jméno" value={form.name} onChange={handleChange} required />
            <Input className='w-full md:w-3/5' name="email" type="email" placeholder="Zadejte email" value={form.email} onChange={handleChange} required />
            <Button type="submit" size={'lg'} className='mx-auto bg-secondary-foreground text-lg text-primary font-light underline underline-offset-2 w-1/2 md:w-2/5 '>{isPending ? <Loader2 className='animate-spin' /> : <>Odeslat <MoveUpRight /></>}</Button>
            </form>
    )
}
