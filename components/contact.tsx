"use client";

import { Input } from './ui/input';
import React, { useTransition, useState,useRef } from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { sendEmail } from '@/actions/mail';
import { Loader2, MoveUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useInView, motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
export default function Contact() {
    
    const div = useRef(null)
    const isInView = useInView(div, {amount: 0.4})
    const [isPending, startTransition] = useTransition();
    const [recaptchaReady, setRecaptchaReady] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        tel: "",
        company: "",
        msg: "",
        rights: true ,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const handleChangeCheckbox = () => {
        setForm({ ...form, rights: !form.rights });
        console.log(form.rights)
    }
    const {executeRecaptcha} = useGoogleReCaptcha()
    
    const handleSendEmail = (formData: FormData) => {
        startTransition(async () => {
            const loadingToast = toast.loading("Probíhá ověření");
            if (!executeRecaptcha) {
      toast.error("reCAPTCHA není připravena, zkuste to znovu.");
      return;
    }
            const token = await executeRecaptcha();
            
            const send = await sendEmail(formData, "Kontakt", token);
            toast.dismiss(loadingToast);
            if(send?.success){
            toast.success("Vaše zpráva byla odeslána, co nejdříve se Vám ozvu:");
            setForm({
                name: "",
                email: "",
                tel: "",
                company: "",
                msg: "",
                rights: true,
            })
            }else if(!send?.success){
                toast.error(String(send?.message))
            }
        })
    }
    return (
        <div ref={div} id='contact' className="flex flex-col gap-4 lg:flex-row">
            <motion.form
            initial={{opacity:0, x: -600}}
            animate={isInView?{opacity: 1, x:0}: {}}
            exit={{opacity: 0, x: -600}}
            transition={{duration: 0.4}}
            className="bg-primary p-4 lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 rounded-lg px-5 w-full gap-3 " action={handleSendEmail}>
                <div className='flex flex-col w-full space-y-2'>
                    <Label>Celé jméno</Label>
                    <Input name="name" type="text" placeholder="Zadejte celé jméno" value={form.name} onChange={handleChange} required disabled={isPending} />
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>Email</Label>
                    <Input name="email" type="email" placeholder="Zadejte email" value={form.email} onChange={handleChange} required disabled={isPending} />
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>Telefonní číslo</Label>
                    <Input name="tel" type='tel' placeholder="Zadejte telefonní číslo" value={form.tel} onChange={handleChange} required disabled={isPending} />
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>Firma</Label>
                    <Input name="company" type="text" placeholder="Zadejte Vaši firmu" value={form.company} onChange={handleChange} disabled={isPending} />
                </div>
                <div className='flex flex-col space-y-2 lg:col-span-2 w-full'>
                    <Label>Zpráva</Label>
                    <Textarea name='msg' placeholder="Zadejte Vaši zprávu" value={form.msg} onChange={handleChange} required disabled={isPending} />
                </div>
                <div className='flex flex-col justify-center lg:col-span-2 w-full space-y-6 py-5'>
                    <div className='flex flex-row  space-x-3'>
                        <Checkbox id="rights" name='rights' checked={form.rights} onChange={handleChangeCheckbox} disabled={isPending} />
                        <label
                            htmlFor="rights"
                            className="text-lg font-light leading-none"
                        >
                            Souhlasím s Podmínkami a Zásadami ochrany osobních údajů
                        </label>
                    </div>
                    
                </div>
                <div className='sm:place-self-center sm:col-span-2'>
                    <Button type="submit" variant={"default"} size={'lg'} className='mx-auto font-light '>{isPending ? <Loader2 className='animate-spin' /> : <>Odeslat < MoveUpRight /></>}</Button>
                    </div>
            </motion.form>
            <motion.iframe
            initial={{opacity:0, x: 600}}
            animate={isInView?{opacity: 1, x:0}: {}}
            exit={{opacity: 0, x: 600}}
            transition={{duration: 1}}
            className='lg:w-1/2 w-full rounded-lg h-96 lg:h-auto' id='map'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d282.6037869799849!2d15.579329499918805!3d49.605022209000055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470d0095a8402ca3%3A0xad29b246690b3620!2sFinancehb.cz%20s.r.o.-%20Petr%20Krajcigr!5e0!3m2!1scs!2scz!4v1748615691333!5m2!1scs!2scz" width="600" height="450"  loading="lazy" referrerPolicy="no-referrer-when-downgrade">
            
            </motion.iframe>
        </div>
    )
}

