"use client"
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import React, { useState, useTransition } from 'react'
import { sendNewsletter } from '@/actions/mail';

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
        <form className="w-full lg:w-1/2 flex flex-col space-y-3 " action={handleSendMail}>
            <Input name="name" type="text" placeholder="Zadejte celé jméno" value={form.name} onChange={handleChange} required />
            <Input name="email" type="email" placeholder="Zadejte email" value={form.email} onChange={handleChange} required />
            <Button type="submit" size={'lg'} className='mx-auto bg-secondary text-lg text-primary font-light underline underline-offset-2 shadow-md w-full shadow-primary-foreground'>Odeslat</Button>
        </form>
    )
}
