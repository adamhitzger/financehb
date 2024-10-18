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
        surname: "",
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
                surname: "",
                file: file,
            })
        })
    }
    console.log(form.file)
    return (
        <form className="w-full grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-4  text-black " action={handleSendEmail}>
            <Input name="name" type="text" disabled={isPending} placeholder="Zadejte jméno" value={form.name} onChange={handleChange} required />
            <Input type="text" name="surname" disabled={isPending} placeholder="Zadejte přijmení" value={form.surname} onChange={handleChange} required />
            <Input name="email" type="email" disabled={isPending} placeholder="Zadejte email" value={form.email} onChange={handleChange} required />
            <input type='text' name='msg' value={form.file} onChange={handleChange} className='hidden' />
            <Button type="submit" size={'lg'} variant={"default"} className='mx-auto font-light  shadow-lg  shadow-primary-foreground'>
                {isPending ? <Loader2 className='animate-spin' /> : <>Odeslat < MoveUpRight /></>}
            </Button>
        </form>
    )
}
