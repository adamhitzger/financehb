import React from 'react'
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/facebook'
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'
import 'react-social-icons/linkedin'
import Link from 'next/link'
import { ArrowRight, Building, CalendarClock, Landmark, MapPin, PhoneIncoming, Link as LinkIcon } from 'lucide-react'

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
            <footer className='flex flex-col bg-secondary text-primary p-8 text-lg space-y-5 font-extralight'>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-5 md:grid-rows-1 w-full justify-items-stretch md:justify-items-center font-extralight text'>
                    <div className='text-sm flex flex-col space-y-1'>
                        <div className='flex flex-row text-base  font-medium w-fit pr-3'><PhoneIncoming className='mr-2 text-secondary-foreground'/><span className='text-secondary-foreground'>Kontakt</span> </div>
                        <Link href={"tel:+420777820080"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>+420 777 820 080</Link>
                        <Link href={"tel:+420775999069"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>+420 775 999 069</Link>
                        <Link href={"tel:+420720080820"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>+420 720 080 820</Link>
                        <div className='pt-2 flex flex-center  font-medium w-fit pr-3'><Landmark className='mr-2 text-secondary-foreground'/> <span className='text-secondary-foreground'>Investiční služby:</span></div>
                        <Link href={"tel:+420222161188"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>+420 222 161 188</Link>
                        <Link href={"mailto:info@financehb.cz"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>info@financehb.cz</Link>
                        <Link href={"mailto:petr@efekta-iz.cz"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>petr@efekta-iz.cz</Link>
                    </div>
                    <div className='text-sm flex flex-col space-y-1'>
                        <div className='flex flex-row text-base  font-medium w-fit pr-3 text-secondary-foreground'><MapPin className='mr-2 text-secondary-foreground'/> Adresa:</div>
                        <span>Financehb.cz s.r.o, Dolní 132,</span>
                        <span>580 02, Havlíčkův Brod</span>
                        <Link href={"/sluzby#contact"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground flex flex-row '>Ukázat na mapě <ArrowRight className='ml-5' /></Link>
                    </div>
                    <div className='text-sm flex flex-col space-y-1'>
                        <div className='flex flex-row  text-base text-secondary-foreground font-medium w-fit pr-3'><Building className='mr-2 text-secondary-foreground'/> Brno:</div> Vinařská 460/3, Brno
                        <div className='pt-2 flex flex-row text-base text-secondary-foreground font-medium w-fit pr-3'><Building className='mr-2 text-secondary-foreground'/>Praha:</div> Nová Waltrovka METALICA, <br/>Radlická 365/154, Praha 5
                        <span>Efekta-IZ, s.r.o., <br/>člen skupiny DRFG a.s. </span>
                    </div>

                    <div className='text-sm flex flex-col space-y-1'>
                        <div className='flex flex-center text-base text-secondary-foreground font-medium w-fit pr-3'><CalendarClock className='mr-2 text-secondary-foreground' /> Pracovní hodiny</div>
                        <span>Kancelář v Havlíčkově Brodě:</span>
                        <Link href={"tel:+420775999069"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>+420 775 999 069</Link>
                        <Link href={"tel:+420720080820"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>+420 720 080 820</Link>
                        <div className='flex flex-row space-x-3'>
                            <div className='flex flex-col w-fit'>
                                <span>PO - ST: 8:00 - 16:00</span>
                                <span>ČT: 8:00 - 17:00    </span>
                                <span>PÁ: 8:00 - 15:00   </span>
                            </div>
                        </div>

                    </div>
                    
                    
                    <div className='text-sm flex flex-col  space-y-1'>
                        <div className='flex flex-row text-base  font-medium w-fit pr-3'><LinkIcon className='mr-2 text-secondary-foreground'/><span className='text-secondary-foreground'>Odkazy</span> </div>
                        <Link target={"_blank"} href={"https://dobryporadce.cz/poradci/petr-krajcigr-efa"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>Dobrý poradce</Link>
                        <Link target={"_blank"} href={"https://www.drfg.cz/"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>www.drfg.cz</Link>
                        <Link target={"_blank"} href={"https://pkfinance.cz/"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>www.pkfinance.cz/</Link>
                        <Link target={"_blank"} href={"https://financehb-ifkh.vercel.app/nemovitosti"} className='hover:underline hover:underline-offset-2 hover:text-secondary-foreground'>Nemovitosti</Link>
                        
                    </div>
                </div>
                <div className='w-fit flex space-x-4 mx-auto'>
                    {icons.map((i, id) => (
                        <SocialIcon url={i.link} target='_blank' key={id} network={i.icon} />
                    ))}
                </div>
                <p className='text-center text-base'>Finanční služby propagované a nabízené na tomto webu poskytuje společnost Financehb.cz s.r.o a zde uvedení poradci jako fyzické osoby: Petr Krajcigr, kteří jsou v oblasti… <Link target={"_blank"} href={"/podminky"} className='underline'> číst více</Link></p>
            </footer>
            <div className='pb-4 bg-secondary font-light text-primary text-base text-center w-full'>
                <span>&copy; {year} Developed by <Link target={'_blank'} href="https://www.linkedin.com/in/adam-hitzger-aa518622b/?originalSubdomain=cz" className="underline underline-offset-2">Adam Hitzger</Link></span>
            </div>
        </>
    )
}

