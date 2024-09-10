"use client"
import { Loader2, MoveUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import React, { useState, useTransition } from 'react'
import { sendEmail } from '@/actions/mail'
import toast from 'react-hot-toast';
export default function EbookForm({ file }: { file: string }) {
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        email: "",
        name: "",
        file: file,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    };
    const handleSendEmail = (formData: FormData) => {
        startTransition(async () => {
            await sendEmail(formData, "Ebook");
            toast.success("Email, byl odeslán, zkontrolujte spam");
            setForm({
                email: "",
                name: "",
                file: file,
            })
        })
    }
    console.log(form.file)
    return (
        <form className="w-full flex flex-col md:flex-row space-y-2 md:space-x-2  text-black " action={handleSendEmail}>
            <Input name="name" type="text" disabled={isPending} placeholder="Zadejte celé jméno" value={form.name} onChange={handleChange} required />
            <Input name="email" type="email" disabled={isPending} placeholder="Zadejte email" value={form.email} onChange={handleChange} required />
            <input type='text' name='msg' value={form.file} onChange={handleChange} className='hidden' />
            <Button type="submit" size={'lg'} className='mx-auto bg-secondary text-xl text-primary font-light underline underline-offset-2 shadow-md  shadow-primary-foreground'>
                {isPending ? <Loader2 className='animate-spin' /> : "Odeslat"}
            </Button>
        </form>
    )
}
