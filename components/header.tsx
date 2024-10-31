"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {  MoveUpRight,  } from "lucide-react";
export default function Header() {
    
    return (
        <header
            className={`bg-secondary w-full p-5 lg:p-16 text-primary`}>
            <div className="flex gap-6 p-5 flex-wrap sm:flex-nowrap sm:flex-row w-full border-secondary-foreground border">
            <div className="w-full sm:w-1/2 flex flex-col justify-center font-light">
                <div className="flex flex-col  w-full space-y-8  ">
                    
                        <h2 className={`text-3xl lg:text-5xl text-left  max-w-96 font-ibarra`}>
                        DOVEDU VÁS K FINANČNÍ <span className="underline text-secondary-foreground">NEZAVISLOSTI</span>
                        </h2>
                    
                    <div className={`text-left text-base sm:text-lg`}>
                        <p>Zabývám se finančním poradenstvím, investicím a správě portfolií. Pomáhám lidem spravovat portfolia více jak 28 let.  Na mé stránce najdete <Link href={"/clanky"} target="_blank" className="underline text-secondary-foreground ">články</Link> a makroekonomické analýzy, nové investiční příležistosti jako je <Link href={"/clanky/vse-co-potrebujete-vedet-o-dipu"} target="_blank" className="underline text-secondary-foreground ">DIP</Link>.  
                        Přihlaste se k odběru <Link href={"/#newsletter"} target="_blank" className="underline text-secondary-foreground ">newslettru</Link> at Vám nic neuteče! Pro více informací si zakupte <Link href={"/paywall"} target="_blank" className="underline text-secondary-foreground ">předplatné.</Link>  Nezapomňte si stáhnout <Link href={"/e-book"} target="_blank" className="underline text-secondary-foreground ">e-book.</Link>  </p>

                    </div>
                    
                        
                            <Link href={"/#contact"} target="_blank">
                                <Button size={"lg"}
                                className="no-underline font-light bg-secondary-foreground w-1/2 sm:w-full lg:w-1/2 mx-auto  text-base"
                                >
                                    Domluvte si &nbsp;<span className="text-secondary font-normal underline">schůzku</span>&nbsp;<MoveUpRight className="text-secondary"/>
                                </Button>
                            </Link>
                </div>
            </div>
            <div className={`w-full sm:w-1/2 flex justify-center items-center`}>
                <Image src={"/images/main.jpg"} alt="Header photo" width={1024} height={1024} className="object-fill bg-cover rounded-xl border-secondary-foreground border hover:shadow-secondary-foreground hover:shadow-lg transition ease-in-out delay-100 duration-200" />
            </div>
            </div>
        </header>
    );
}