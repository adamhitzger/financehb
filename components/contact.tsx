"use client";

import { Input } from './ui/input';
import React, { useTransition, useState,useRef } from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import Map, { Marker } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import { sendEmail } from '@/actions/mail';
import { Loader2, MoveUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useInView, motion } from 'framer-motion';
export default function Contact() {
    const div = useRef(null)
    const isInView = useInView(div, {amount: 0.4})
    const [isPending, startTransition] = useTransition();
    const [lng, setLng] = useState<number>(15.5796758);
    const [lat, setLat] = useState<number>(49.6049950);
    const [zoom, setZoom] = useState<number>(16);
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
    const handleSendEmail = (formData: FormData) => {
        startTransition(async () => {
            await sendEmail(formData, "Kontakt");
            toast.success("Vaše zpráva byla odeslána, co nejdříve se Vám ozvu:");
            setForm({
                name: "",
                email: "",
                tel: "",
                company: "",
                msg: "",
                rights: true,
            })
        })
    }
    return (
        <div ref={div} id='contact' className="flex flex-col gap-4 lg:flex-row">
            <motion.form
            initial={{opacity:0, x: -600}}
            animate={isInView?{opacity: 1, x:0}: {}}
            exit={{opacity: 0, x: -600}}
            transition={{duration: 0.4}}
            className="bg-primary p-4 lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 rounded-lg shadow-xl shadow-secondary-foreground px-5 w-full gap-3 " action={handleSendEmail}>
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
            <motion.div
            initial={{opacity:0, x: 600}}
            animate={isInView?{opacity: 1, x:0}: {}}
            exit={{opacity: 0, x: 600}}
            transition={{duration: 1}}
            className='lg:w-1/2 w-full rounded-lg shadow-lg shadow-secondary-foreground h-96 lg:h-auto' id='map'>
                <Map
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN!}
                    initialViewState={{
                        longitude: lng,
                        latitude: lat,
                        zoom: zoom,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                >
                    <Marker longitude={lng} latitude={lat} anchor='bottom' color="red" />
                </Map>
            </motion.div>
        </div>
    )
}

