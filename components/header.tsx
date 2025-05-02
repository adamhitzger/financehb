"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { MoveUpRight,  } from "lucide-react";
import { Suspense } from "react";
import {motion} from "framer-motion"
export default function Header() {
    
    return (
        <header
            className={`bg-secondary w-full p-5 lg:p-16 text-black`}>
            <div 
            className="flex gap-6 p-5 flex-wrap md:flex-nowrap sm:flex-row w-full bg-white border-secondary-foreground border-2 rounded-xl">
            <div
            
            className="w-full md:w-1/2 flex flex-col justify-center font-light">
                <div className="flex flex-col  w-full space-y-8  ">
                    
                        <motion.h1 
                        initial={{opacity: 0, y: -250}}
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -250 }} 
                        transition={{ duration: 0.5, delay: 1.3 }}
                        className={`text-3xl lg:text-5xl text-left  max-w-96 font-ibarra`}>
                        DOVEDU VÁS K FINANČNÍ <span className="underline text-secondary-foreground">NEZAVISLOSTI</span>
                        </motion.h1>
                    
                    <motion.div 
                    initial={{opacity: 0, y: -250}}
                    animate={{ opacity: 1, y: 0}} 
                    exit={{ opacity: 0, y: -250 }} 
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className={`text-left text-base sm:text-lg`}>
                        <p>Zabývám se finančním poradenstvím, investicím a správě portfolií. Pomáhám lidem spravovat portfolia více jak 28 let.  Na mé stránce najdete <Link href={"/clanky"} target="_blank" className="underline text-secondary-foreground ">články</Link> a makroekonomické analýzy, nové investiční příležistosti jako je <Link href={"/clanky/vse-co-potrebujete-vedet-o-dipu"} target="_blank" className="underline text-secondary-foreground ">DIP</Link>.  
                        Přihlaste se k odběru <Link href={"/#newsletter"} target="_blank" className="underline text-secondary-foreground ">newslettru</Link> at Vám nic neuteče! Pro více informací si zakupte <Link href={"/paywall"} target="_blank" className="underline text-secondary-foreground ">předplatné.</Link>  Nezapomňte si stáhnout <Link href={"/e-book"} target="_blank" className="underline text-secondary-foreground ">e-book.</Link>  </p>

                    </motion.div>
                    
                        <motion.div
                        className="flex flex-row w-full "
                        initial={{opacity: 0, y: -250}}
                    animate={{ opacity: 1, y: 0}} 
                    exit={{ opacity: 0, y: -250 }} 
                    transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <Link href={"/sluzby"} target="_blank" className="mx-auto">
                                <Button size={"lg"}
                                className="no-underline font-light bg-secondary-foreground w-full    text-base"
                                >
                                    Domluvte si &nbsp;<span className="text-secondary font-normal underline">schůzku</span>&nbsp;<MoveUpRight className="text-secondary"/>
                                </Button>
                            </Link>
                            </motion.div>
                </div>
            </div>
            <motion.div 
            initial={{opacity: 0, x: 250}}
            className="w-full md:w-1/2 flex justify-center items-center"
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 250 }} 
            transition={{ duration: 0.5 }}
            >
                <Suspense fallback={<div className="w-full h-96 bg-primary-foreground"></div>}>
            <video controls poster={"/images/thumbnail.jpg"} playsInline={true} className="block w-full h-96">
            <source src="/video.mp4" type="video/mp4"/>
           </video>
           </Suspense>
            </motion.div>
            </div>
        </header>
    );
}