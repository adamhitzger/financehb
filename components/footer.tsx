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
                <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 w-full justify-items-center font-light'>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-xl underline underline-offset-2 font-medium'>Adresa</span>
                        <span>Financehb.cz s.r.o, Dolní 132,</span>
                        <span>580 02, Havlíčkův Brod</span>
                        <Link href={"#contact"} className='hover:underline hover:underline-offset-2 hover:text-destructive flex flex-row '>Ukázat na mapě <ArrowRight className='ml-5' /></Link>
                        <span>Brno: Vinařská 460/3, Brno</span>
                        <span>Praha: Nová Waltrovka - METALICA, Radlická 365/154, Praha 5</span>
                        <span>Efekta-IZ, s.r.o., člen skupiny DRFG a.s. </span>
                    </div>

                    <div className='flex flex-col space-y-1'>
                        <span className='text-xl underline underline-offset-2 font-medium'>Pracovní hodiny</span>
                        <span>Asistentka v kanceláři:</span>
                        <div className='flex flex-row space-x-3'>
                            <div className='flex flex-col w-fit'>
                                <span>PO - ST: </span>
                                <span>CT:     </span>
                                <span>PÁ:    </span>
                            </div>
                            <div className='flex flex-col w-fit'>
                                <span>8:00 - 16:00</span>
                                <span>8:00 - 17:00 </span>
                                <span>8:00 - 15:00 </span>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-xl underline underline-offset-2 font-medium'>Kontakt</span>
                        <Link href={""} className='hover:underline hover:underline-offset-2 hover:text-destructive'>+420 777 820 080</Link>
                        <span className='underline hover:underline-offset-2 font-medium'>Investiční služby:</span>
                        <Link href={""} className='hover:underline hover:underline-offset-2 hover:text-destructive'>+420 222 161 188</Link>
                        <Link href={"mailto:petr@efekta-iz.cz"} className='hover:underline hover:underline-offset-2 hover:text-destructive'>petr@efekta-iz.cz</Link>
                        <Link href={"mailto:info@financehb.cz"} className='hover:underline hover:underline-offset-2 hover:text-destructive'>info@financehb.cz</Link>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-xl underline underline-offset-2 font-medium'>Odkazy</span>
                        <Link href={"https://dobryporadce.cz/poradci/petr-krajcigr-efa"} className='hover:underline hover:underline-offset-2 hover:text-destructive'>Dobrý poradce</Link>
                        <Link href={"https://www.drfg.cz/"} className='hover:underline hover:underline-offset-2 hover:text-destructive'>www.drfg.cz</Link>
                        <Link href={"https://pkfinance.cz/"} className='hover:underline hover:underline-offset-2 hover:text-destructive'>www.pkfinance.cz/</Link>
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
                        <SocialIcon url={i.link} key={id} network={i.icon} fgColor="#0A1a49" bgColor='#ffffff' />
                    ))}
                </div>
                <p className='text-center'>Finanční služby propagované a nabízené na tomto webu poskytuje společnost Financehb.cz s.r.o a zde uvedení poradci jako fyzické osoby: Petr Krajcigr, kteří jsou v oblasti… <Link href={"/podminky"} className='underline'> číst více</Link></p>
            </footer>
            <div className='p-8 bg-secondary font-medium text-primary text-lg text-center w-full'>
                <span>&copy; {year} Developed by <Link href="https://www.linkedin.com/in/adam-hitzger-aa518622b/?originalSubdomain=cz" className="underline underline-offset-2">Adam Hitzger</Link></span>
            </div>
        </>
    )
}

