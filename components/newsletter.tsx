"use client"
import { Button } from './ui/button';
import { Input } from './ui/input';
import React, { useState } from 'react'

export default function Newsletter() {
    const [form, setForm] = useState({
        email: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };
    return (
        <form className="w-full lg:w-1/2 flex flex-col space-y-3 ">
            <Input name="email" type="email" placeholder="Zadejte email" value={form.email} onChange={handleChange} required />
            <Button type="submit" size={'lg'} className='mx-auto bg-secondary text-lg text-primary font-light underline underline-offset-2 shadow-md w-full shadow-primary-foreground'>Odeslat</Button>
        </form>
    )
}
