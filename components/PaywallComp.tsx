"use client"

import { Subscriptions } from "@/types"
import PaymentButton from "./paymentButton"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import Link from "next/link"
import { FullUser } from "@/types"
export default function Subscription({subs, user}:{subs: Subscriptions[], user: FullUser | undefined | null}){
    const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 640);
    };

    handleResize(); // nastav hned po mountu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    return(
        <div className='mx-auto w-full  grid grid-cols-1 sm:grid-cols-3  gap-4'>
                    {subs.map((sub: Subscriptions, id: number) => (
                    
        <motion.div
         key={id}
          className={`border-2 rounded-xl w-full  flex flex-col items-center justify-between p-14 shadow-lg space-y-8 `}
          initial={{opacity:0, x: -250,y:0}}
          animate={id ===1 && isWide ? {opacity: 1, x: 0,y:-30} : {opacity: 1, x: 0,y:0}}
          exit={{opacity:0, x: -250}}
          transition={{duration: 0.5*(id+1)}}
          >
        <div className='flex flex-col space-y-2 text-center w-fit text-black'>
            <span className='text-5xl  font-semibold underline underline-offset-4 decoration-secondary-background'>{sub.price} Kč</span>
            <span className='text-lg '>{sub.season}</span>
            {sub.funnyText && <span className='text-lg '>{sub.funnyText}</span>}
        </div>
                        
        <div className='w-fit'>
        {!user ? <Link href={"/log-in"}>
        <Button variant={"default"} size={"lg"} className='font-medium text-lg'>
            Přihlásit se
            </Button>
            </Link> 
            :
            <PaymentButton stripeId={sub.stripePriceId} total={sub.price}/>}
        </div>
    </motion.div>
    ))}

    <motion.div
          className={`border-2 rounded-xl w-full flex flex-col items-center justify-between p-14 shadow-lg space-y-8`}
          initial={{opacity:0, x: -250,y:0}}
          animate={{opacity: 1, x: 0,y:0}}
          exit={{opacity:0, x: -250}}
          transition={{duration: 0.5*(subs.length+1)}}
          >
        <div className='flex flex-col space-y-2 text-center w-fit text-black'>
            <span className='text-4xl font-semibold underline underline-offset-4 decoration-secondary-background'>Zdarma</span>
            <span className='text-lg '>1x PDF</span>
            <span className='text-lg '>Chceš vědět jak vypadám? Stáhni si mě</span>
        </div>
                        
        <div className='w-fit'>
       <Link target="_blank"  href={"/api/downloadPdf"} download={"Finance HB - PDF"}>
        <Button variant={"default"} size={"lg"} className='font-medium text-lg'>
            Stáhnout PDF
            </Button>
            </Link> 
            </div>
    </motion.div>
                </div>
    )
}