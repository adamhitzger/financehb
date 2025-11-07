'use client'

import { useState, useEffect, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast'
import { Loader2, MoveUpRight, X } from 'lucide-react';
import { Ebook } from '@/types'
import Image from 'next/image'
import { sendEmail } from '@/actions/mail'
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
export default function EbookModal({ebook}: {ebook: Ebook}) {
    const [isVisible, setIsVisible] = useState(false)
    const [isPending, startTransition] = useTransition();
    console.log(isVisible)
    const router = useRouter();
    useEffect(() => {
        const hasAgreed = localStorage.getItem('emailBar') === "yes"
        if (!hasAgreed) {
            setIsVisible(true)
        }
    }, [])
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
    const {executeRecaptcha} = useGoogleReCaptcha()
    const handleSendEmail = (formData: FormData) => {
        startTransition(async () => {
             if (!executeRecaptcha) {
      toast.error("reCAPTCHA není připravena, zkuste to znovu.");
      return;
    }
            const token = await executeRecaptcha();
            const loadingToast = toast.loading("Probíhá ověření");
            const send = await sendEmail(formData, "Ebook", token);
            toast.dismiss(loadingToast);
            if(send?.success){
                toast.success("Email, byl odeslán, zkontrolujte spam");
                setForm({
                email: "",
                name: "",
                surname: "",
                file: ebook.file,
            })
            router.push(ebook.file)
             localStorage.setItem("emailBar","yes")
            }else if(!send?.success){
                toast.error(String(send?.message))
            }
            
    
           
        })
    }
    if(!isVisible) return null
    else return (
        <div className="fixed inset-0 bg-primary bg-opacity-50 z-50 flex flex-col items-center justify-center p-4">
           
            <div className="bg-primary p-3 rounded-lg shadow-xl items-center flex flex-col space-y-3 max-w-lg w-full">
            <div className='w-full flex-row flex justify-end' onClick={() => {
                localStorage.setItem("emailBar", "yes")
                setIsVisible(false)
                }}><X/></div>
                   {ebook.heading ? <span className="text-lg font-medium">Stáhněte si zdarma ebook</span> : null}
                                           <Image src={ebook.picture} alt={ebook.picture} width={200} height={200} className="object-fill bg-cover skew-x-4 " />
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
            </div>
    )
}