"use client"

import { Subscriptions } from "@/types"
import PaymentButton from "./paymentButton"
import { useRef } from "react"
import { useInView, motion } from "framer-motion"
import { Button } from "./ui/button"
import Link from "next/link"
import { FullUser } from "@/types"
export default function Subscription({subs, user}:{subs: Subscriptions[], user: FullUser | undefined | null}){
    const ref=useRef(null)
    const isInView = useInView(ref)
    return(
        <div ref={ref} className='mx-auto w-full justify-center flex flex-row flex-wrap gap-4'>
                    {subs.map((sub: Subscriptions, id: number) => (
                    
        <motion.div
         key={id}
          className='bg-primary-foreground rounded-xl w-full sm:w-1/3 xl:w-1/4 flex flex-col items-center justify-between p-14 shadow-xl space-y-8'
          initial={{opacity:0, x: -250}}
          animate={isInView ? {opacity: 1, x: 0} : {}}
          exit={{opacity:0, x: -250}}
          transition={{duration: 0.5*(id+1)}}
          >
        <div className='flex flex-col text-center w-fit text-secondary'>
            <span className='text-3xl font-medium'>{sub.price} Kč</span>
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
                </div>
    )
}