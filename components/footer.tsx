import React from 'react'
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/facebook'
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'
import 'react-social-icons/linkedin'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
    const year: number = new Date().getFullYear();
    const icons = [
        {
            icon: "instagram",
            link: "https://www.instagram.com/financehb.cz/"
        },
        {
            icon: "facebook",
            link: "https://www.facebook.com/financehb.cz"
        },
        {
            icon: "youtube",
            link: "https://www.youtube.com/channel/UCkp9gcnCVfZ3L-cPggo4uMw"
        },
        {
            icon: "linkedin",
            link: "https://www.linkedin.com/in/petrkrajcigr/"
        }
    ]
    return (
        <>
            <footer className='flex flex-col bg-secondary text-primary p-8 text-lg space-y-5'>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-5 md:grid-rows-1  w-full justify-items-center font-light'>
                    <div className='text-base flex flex-col space-y-1'>
                        <span className='text-lg border-b-2 border-b-secondary-foreground font-medium'>Adresa:</span>
                        <span>Financehb.cz s.r.o, Dolní 132,</span>
                        <span>580 02, Havlíčkův Brod</span>
                        <Link target={"_blank"} href={"/#map"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground flex flex-row '>Ukázat na mapě <ArrowRight className='ml-5' /></Link>
                    </div>
                    <div className='text-base flex flex-col space-y-1'>
                        <span className='text-lg border-b-2 border-b-secondary-foreground font-medium'>Brno:</span> Vinařská 460/3, Brno
                        <span className='text-lg border-b-2 border-b-secondary-foreground font-medium'>Praha:</span> Nová Waltrovka METALICA, <br/>Radlická 365/154, Praha 5
                        <span>Efekta-IZ, s.r.o., <br/>člen skupiny DRFG a.s. </span>
                    </div>

                    <div className='text-base flex flex-col space-y-1'>
                        <span className='text-lg border-b-2 border-b-secondary-foreground font-medium'>Pracovní hodiny</span>
                        <span>Asistentka v kanceláři:</span>
                        <div className='flex flex-row space-x-3'>
                            <div className='flex flex-col w-fit'>
                                <span>PO - ST: 8:00 - 16:00</span>
                                <span>ČT: 8:00 - 17:00    </span>
                                <span>PÁ: 8:00 - 15:00   </span>
                            </div>
                        </div>

                    </div>
                    <div className='text-base flex flex-col space-y-1'>
                        <span className='text-lg border-b-2 border-b-secondary-foreground font-medium'>Kontakt</span>
                        <Link target={"_blank"} href={""} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>+420 777 820 080</Link>
                        <span className='border-b-2 border-b-secondary-foreground font-medium'>Investiční služby:</span>
                        <Link target={"_blank"} href={""} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>+420 222 161 188</Link>
                        <Link target={"_blank"} href={"mailto:petr@efekta-iz.cz"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>petr@efekta-iz.cz</Link>
                        <Link target={"_blank"} href={"mailto:info@financehb.cz"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>info@financehb.cz</Link>
                    </div>
                    
                    <div className='text-base flex flex-col  space-y-1'>
                        <span className='text-lg border-b-2 border-b-secondary-foreground font-medium'>Odkazy</span>
                        <Link target={"_blank"} href={"https://dobryporadce.cz/poradci/petr-krajcigr-efa"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>Dobrý poradce</Link>
                        <Link target={"_blank"} href={"https://www.drfg.cz/"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>www.drfg.cz</Link>
                        <Link target={"_blank"} href={"https://pkfinance.cz/"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>www.pkfinance.cz/</Link>
                        <Link target={"_blank"} href={"https://financehb.vercel.app/nemovitosti"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>Nemovitosti</Link>
                        
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row justify-center gap-4'>
                    <div className='w-full md:w-1/4 relative h-28'>
                        <Image src={"/images/efekta.jpg"} alt='efekta' fill={true} className='object-fill bg-cover ' />
                    </div>
                    <div className='w-full md:w-1/4 relative h-28'>
                        <Image src={"/images/fund.jpg"} alt='czech-fund' fill={true} className='object-fill bg-cover ' />
                    </div>
                </div>
                <div className='w-fit flex space-x-4 mx-auto'>
                    {icons.map((i, id) => (
                        <SocialIcon url={i.link} key={id} network={i.icon} fgColor="#0A1a49" bgColor='#ffffff'/>
                    ))}
                </div>
                <p className='text-center'>Finanční služby propagované a nabízené na tomto webu poskytuje společnost Financehb.cz s.r.o a zde uvedení poradci jako fyzické osoby: Petr Krajcigr, kteří jsou v oblasti… <Link target={"_blank"} href={"/podminky"} className='underline'> číst více</Link></p>
            </footer>
            <div className='p-8 bg-secondary font-medium text-primary text-lg text-center w-full'>
                <span>&copy; {year} Developed by <Link href="https://www.linkedin.com/in/adam-hitzger-aa518622b/?originalSubdomain=cz" className="underline underline-offset-2">Adam Hitzger</Link></span>
            </div>
        </>
    )
}

