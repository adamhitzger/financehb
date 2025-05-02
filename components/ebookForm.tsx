"use client"
import { Loader2, MoveUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import React, { useState, useTransition, useRef } from 'react'
import { sendEmail } from '@/actions/mail'
import toast from 'react-hot-toast';
import { Ebook } from '@/types';
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { components } from "@/sanity/lib/components";
import {  motion } from 'framer-motion';

export default function EbookForm({ ebook }: { ebook: Ebook }) {
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        email: "",
        name: "",
        surname: "",
        file: ebook.file,
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
                file: ebook.file,
            })
        })
    }
    console.log(form.file)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between space-y-4">
            <section className="flex flex-col w-full p-8 space-y-20">
                <motion.h2
                 className="font-ibarra  font-bold tracking-wide text-secondary-foreground text-3xl lg:text-5xl"
                 initial={{opacity: 0, y:-250}}
                 animate={{opacity: 1, y:0}}
                 exit={{opacity: 0, y:-250}}
                 transition={{duration:0.7}}
                 >Stáhněte si e-book</motion.h2>
                <div className=" w-full flex flex-col-reverse  md:flex-row items-center justify-between">
                    <motion.div
                    initial={{opacity: 0, x:-250}}
                    animate={{opacity: 1, x:0}}
                    exit={{opacity: 0, x:-250}}
                    transition={{duration:0.7}}
                    className="w-full text-base md:w-1/2 rounded-xl my-10 md:my-0 flex flex-col justify-between shadow-xl bg-primary-foreground p-8 space-y-12  font-light">
                        {ebook.heading ? <span className="text-xl font-medium">{ebook.heading}</span> : null}
                        {ebook.text ? <PortableText value={ebook.text} components={components} /> : null}
                    </motion.div>
                    <motion.div 
                    initial={{opacity: 0, y:-250}}
                    animate={{opacity: 1, y:0}}
                    exit={{opacity: 0, y:-250}}
                    transition={{duration:0.9}}
                    className="w-full md:w-1/2 flex justify-center space-x-0.5">
                        <div className="px-1 bg-black skew-x-4 h-auto">
                        </div>
                        <Image src={ebook.picture} alt={ebook.picture} width={300} height={280} className="object-fill bg-cover skew-x-4 " />
                    </motion.div>
                </div>

<div className="flex flex-col space-y-2">
                <div className="w-full md:w-4/5 flex flex-col space-y-2 p-5 bg-secondary rounded-xl text-primary mx-auto">
                    <div className="w-full flex flex-col space-y-2 text-left lg:text-center">
                        <p className="font-light text-xl">Rádi byste se dozvěděli, jak si nejlépe zajistit svojí budoucnost? Vyplňte formulář a stáhněte si E-BOOK ZDARMA!</p>
                    </div>
        <form 
        
        className="w-full grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-4  text-black " action={handleSendEmail}>
            <Input name="name" type="text" disabled={isPending} placeholder="Zadejte jméno" value={form.name} onChange={handleChange} required />
            <Input type="text" name="surname" disabled={isPending} placeholder="Zadejte přijmení" value={form.surname} onChange={handleChange} required />
            <Input name="email" type="email" disabled={isPending} placeholder="Zadejte email" value={form.email} onChange={handleChange} required />
            <input type='text' name='msg' value={form.file} onChange={handleChange} className='hidden' />
            <Button type="submit" size={'lg'} variant={"default"} className='mx-auto font-light  shadow-lg  shadow-primary-foreground'>
                {isPending ? <Loader2 className='animate-spin' /> : <>Odeslat < MoveUpRight /></>}
            </Button>
        </form>
        </div>
                <span className="font-light text-lg text-center">Přihlášením k odběru souhlasíte se zpracováním osobních údajů. Více informací <Link href='/ochrana-osobnich-udaju' className="underline text-secondary-foreground" target="_blank">ZDE </Link> </span>
                
                </div>
            </section>
        </main>
    )
}
