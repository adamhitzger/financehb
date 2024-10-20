"use client";

import { Input } from './ui/input';
import React, { useTransition, useState } from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import Map, { Marker } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import { sendEmail } from '@/actions/mail';
import { Loader2, MoveUpRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
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
        rights: true,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const handleChangeCheckbox = () => {
        setForm({ ...form, rights: !form.rights });
    }
    const handleSendEmail = (formData: FormData) => {
        startTransition(async () => {
            await sendEmail(formData, "Kontakt");
            toast.success("Email, byl odeslán, zkontrolujte spam");
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
        <div className="flex flex-col lg:flex-row gap-4 h-fit">
            <form className="bg-primary p-4 lg:w-1/2 rounded-lg shadow-lg px-5 w-full h-fit grid grid-rows-6 grid-cols-1 lg:grid-cols-2 lg:grid-rows-4 gap-x-5 " action={handleSendEmail}>
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
                <div className='flex flex-col space-y-2 col-span-1 lg:col-span-2 w-full'>
                    <Label>Celé jméno</Label>
                    <Textarea name='msg' placeholder="Zadejte Vaši zprávu" value={form.msg} onChange={handleChange} required disabled={isPending} />
                </div>
                <div className='flex flex-col col-span-1 lg:col-span-2 h-fit w-full space-y-6 py-5'>
                    <div className='flex flex-row space-x-3'>
                        <Checkbox id="terms" name='rights' checked={form.rights} onChange={handleChangeCheckbox} disabled={isPending} />
                        <label
                            htmlFor="terms"
                            className="text-lg font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Souhlasím s Podmínkami a Zásadami ochrany osobních údajů
                        </label>
                    </div>
                    <Button type="submit" variant={"default"} size={'lg'} className='mx-auto font-light '>{isPending ? <Loader2 className='animate-spin' /> : <>Odeslat < MoveUpRight /></>}</Button>
                </div>
            </form>
            <div className='lg:w-1/2 w-full rounded-lg shadow-lg h-96 lg:h-auto' id='map'>
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
            </div>
        </div>
    )
}

