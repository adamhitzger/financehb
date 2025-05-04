"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { MoveUpRight,  } from "lucide-react";
import {motion} from "framer-motion"
export default function Header() {
    
    return (
        <header
            className={`bg-secondary w-full p-5 lg:p-16 text-black`}>
            <div 
            className="flex gap-6 p-5 flex-wrap md:flex-nowrap sm:flex-row w-full bg-white border-secondary-foreground border-2 rounded-xl">
            
            <motion.div 
            initial={{opacity: 0, x: 250}}
            className="w-full md:w-1/2 flex justify-center items-center"
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 250 }} 
            transition={{ duration: 0.5 }}
            >
                 <iframe className="mx-auto border-2 border-secondary-foreground rounded-xl w-full h-96"  src="https://www.youtube.com/embed/POPL9IAsTqo?si=jXmSN_G2M5I7e2i9" title="YouTube video Petr Krajcigr" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                            
                
            </motion.div>
            <div
            
            className="w-full md:w-1/2 flex flex-col justify-center font-light">
                <div className="flex flex-col items-end w-full space-y-8  ">
                    
                        <motion.h1 
                        initial={{opacity: 0, y: -250}}
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -250 }} 
                        transition={{ duration: 0.5, delay: 1.3 }}
                        className={`text-3xl lg:text-5xl text-right max-w-96 font-ibarra`}>
                        SERVISNÍ <span className="underline text-secondary-foreground">PORADENSTVÍ</span>
                        </motion.h1>
                    
                    <motion.div 
                    initial={{opacity: 0, y: -250}}
                    animate={{ opacity: 1, y: 0}} 
                    exit={{ opacity: 0, y: -250 }} 
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className={`text-right text-base sm:text-lg`}>
                        <p>Více než 28 let provázím své klienty světem financí — pomáhám jim budovat finanční nezávislost, chránit majetek, zabezpečit příjmy a správně investovat." Na mé stránce najdete <Link href={"/clanky"} target="_blank" className="underline text-secondary-foreground ">články</Link> a makroekonomické analýzy, nové investiční příležistosti jako je <Link href={"/clanky/vse-co-potrebujete-vedet-o-dipu"} target="_blank" className="underline text-secondary-foreground ">DIP</Link>.  
                        Přihlaste se k odběru <Link href={"/#newsletter"} target="_blank" className="underline text-secondary-foreground ">newslettru</Link> at Vám nic neuteče! Pro více informací si zakupte <Link href={"/paywall"} target="_blank" className="underline text-secondary-foreground ">měsíční aktuality.</Link>  Nezapomňte si stáhnout <Link href={"/e-book"} target="_blank" className="underline text-secondary-foreground ">e-book.</Link>  </p>

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
            </div>
        </header>
    );
}