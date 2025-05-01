"use client"

import { DBUser, Subscriptions } from "@/types"
import PaymentButton from "./paymentButton"
import { useRef } from "react"
import { useInView, motion } from "framer-motion"
import { Button } from "./ui/button"
import Link from "next/link"
export default function Subscription({subs, user}:{subs: Subscriptions[], user: DBUser}){
    const ref=useRef(null)
    const isInView = useInView(ref)
    return(
        <div ref={ref} className='w-full grid grid-cols-1 grid-rows-4 md:grid-rows-1 md:grid-cols-4 gap-4'>
                    {subs.map((sub: Subscriptions, id: number) => (
                    
        <motion.div
         key={id}
          className='bg-primary-foreground rounded-xl w-full flex flex-col items-center justify-between p-14 shadow-xl space-y-8'
          initial={{opacity:0, x: -250}}
          animate={isInView ? {opacity: 1, x: 0} : {}}
          exit={{opacity:0, x: -250}}
          transition={{duration: 0.5*(id+1)}}
          >
        <div className='flex flex-col text-center w-fit text-secondary'>
            <span className='text-3xl font-medium'>{sub.price} Kč</span>
            <span className='text-lg '>{sub.season}</span>
        </div>
                        
        <div className='w-fit'>
        {user ? <Link href={"/log-in"}><Button variant={"default"} size={"lg"} className='font-medium text-lg'>Přihlásit se</Button></Link> :<PaymentButton stripeId={sub.stripePriceId} total={sub.price}/>}
        </div>
    </motion.div>
    ))}
                </div>
    )
}