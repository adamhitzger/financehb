"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
    const year: number = new Date().getFullYear();
    const pathname = usePathname()
    return (
        <div className={`w-full ${pathname === "/" || pathname === "/sluzby" ? "bg-primary-foreground ": "bg-white"}`}>
            <footer className='flex flex-col items-center bg-secondary text-primary p-8 text-lg space-y-5 font-extralight [clip-path:polygon(0_0,100%_70px,100%_100%,0_100%)]'>
               <div className='max-w-5xl flex flex-col space-y-5'>

                <h2 className='text-5xl mt-5 font-bold'>Kontakty</h2>
                <div className='grid grid-cols-2 gap-4 justify-items-center md:grid-cols-4 md:grid-rows-1 w-full  md:justify-items-center font-extralight text'>
                    <div className='text-base flex flex-col space-y-1 '>
                        <div className='flex flex-row text-lg font-medium w-fit pr-3'><span className=' text-3xl text-secondary-background'>Office</span> </div>
                        <div className='flex flex-col'>
                             <span>Havlíčkův Brod - Finanční dům</span>
                            <Link className='underline undreline-offset-4 decoration-secondary-background' href={"https://www.google.com/maps/place/Financehb.cz+s.r.o.-+Petr+Krajcigr/@49.6050064,15.5769649,17z/data=!3m1!4b1!4m6!3m5!1s0x470d0095a8402ca3:0xad29b246690b3620!8m2!3d49.6050064!4d15.5795398!16s%2Fg%2F1tj6sk48?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D"} target='_blank'>
                            Dolní 132, 582 02 Havlíčkův Brod
                            </Link>
                        </div>
                        <Link href={"tel:+420777820080"} className='underline underline-offset-2 decoration-secondary-background'>+420 777 820 080</Link>
                        <Link href={"mailto:info@financehb.cz"} className='underline underline-offset-2 decoration-secondary-background'>info@financehb.cz</Link>
                        <Link href={"mailto:petr@efekta-iz.cz"} className='underline underline-offset-2 decoration-secondary-background'>petr@efekta-iz.cz</Link>
                    
                        </div>

  <div className='text-base flex flex-col space-y-1'>
                        <div className='flex flex-center text-secondary-background font-medium w-fit pr-3 text-3xl'> Pracovní hodiny</div>
                        <Link href={"tel:+420775999069"} className='underline underline-offset-2 decoration-secondary-background'>+420 775 999 069</Link>
                        <Link href={"tel:+420720080820"} className='underline underline-offset-2 decoration-secondary-background'>+420 720 080 820</Link>
                        <div className='flex flex-row space-x-3'>
                            <div className='flex flex-col w-fit'>
                                <span>PO - ST: 8:00 - 16:00</span>
                                <span>ČT: 8:00 - 17:00    </span>
                                <span>PÁ: 8:00 - 15:00   </span>
                            </div>
                        </div>

                    </div>

                    <div className='text-base flex flex-col space-y-1'>
                        <div className='flex flex-col space-y-5 flex-center font-medium w-fit pr-3 text-3xl text-secondary-background'> Kanceláře</div>
                        <div className='flex flex-col'>
                              <span>Praha – Nová Waltrovka</span>
                        <span>Radlická 365/154,  Praha 5</span>
                        </div>
                      
                        <hr className='h-[1px] bg-white'/>
                        <div className='flex flex-col'>
                             <span>Brno - Vinařská 460/3</span>
                        <span>603 00 Brno</span>
                        </div>
                        
                    </div>

                  
                    
                    
                    <div className='text-base flex flex-col  space-y-1'>
                        <div className='flex flex-row text-lg  font-medium w-fit pr-3'><span className='text-secondary-background text-3xl'>Odkazy</span> </div>
                        <Link target={"_blank"} href={"https://efekta-iz.cz/"} className='underline underline-offset-2 decoration-secondary-background'>efekta-iz.cz</Link>
                        <Link target={"_blank"} href={"https://dobryporadce.cz/poradci/petr-krajcigr-efa"} className='underline underline-offset-2 decoration-secondary-background'>Dobrý poradce</Link>
                        <Link target={"_blank"} href={"https://www.drfg.cz/"} className='underline underline-offset-2 decoration-secondary-background'>www.drfg.cz</Link>
                        <Link target={"_blank"} href={"https://pkfinance.cz/"} className='underline underline-offset-2 decoration-secondary-background'>www.pkfinance.cz/</Link>
                        <Link target={"_blank"} href={"/nemovitosti"} className='underline underline-offset-2 decoration-secondary-background'>Nemovitosti</Link>
                        
                    </div>
                </div>
               
                <p className='text-center text-sm'>Finanční služby propagované a nabízené na tomto webu poskytuje společnost Financehb.cz s.r.o a zde uvedení poradci jako fyzické osoby: Petr Krajcigr, kteří jsou v oblasti… <Link target={"_blank"} href={"/podminky"} className='underline'> číst více</Link></p>
           
               </div>
            </footer>
            <div className='pb-4 bg-secondary font-light text-primary text-base text-center w-full'>
                <span>&copy; {year} Developed by <Link target={'_blank'} href="https://www.linkedin.com/in/adam-hitzger-aa518622b/?originalSubdomain=cz" className="underline underline-offset-2">Adam Hitzger</Link></span>
            </div>
        </div>
    )
}

