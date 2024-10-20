"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {  MoveUpRight,  } from "lucide-react";
export default function Header() {
    
    return (
        <header
            className={`bg-secondary p-8 lg:p-16  text-primary`}>
            <div className="flex flex-wrap lg:flex-nowrap lg:flex-row w-full border-secondary-foreground border p-3">
            <div className="w-full lg:w-1/2 flex flex-col min-h-screen px-5  font-light">
                <div className="flex flex-col w-full space-y-8 m-auto lg:px-10">
                    
                        <h2 className={`text-4xl lg:text-7xl max-w-4xl  text-left font-ibarra`}>
                        DOVEDU VÁS K FINANČNÍ <span className="underline text-secondary-foreground">NEZAVISLOSTI</span>
                        </h2>
                    
                    <div className={` text-justify lg:text-left text-2xl`}>
                        <p>Zabývám se finančním poradenstvím, investicím a správě portfolií. Pomáhám lidem spravovat portfolia více jak 28 let.  Na mé stránce najdete <Link href={"/clanky"} className="underline text-secondary-foreground font-medium">články</Link> a makroekonomické analýzy, nové investiční příležistosti jako je <Link href={"/clanky/vse-co-potrebujete-vedet-o-dipu"} className="underline text-secondary-foreground font-medium">DIP</Link>.  
                        Přihlaste se k odběru <Link href={"/#newsletter"} className="underline text-secondary-foreground font-medium">newslettru</Link> at Vám nic neuteče! Pro více informací si zakupte <Link href={"/paywall"} className="underline text-secondary-foreground font-medium">předplatné.</Link>  Nezapomňte si stáhnout <Link href={"/e-book"} className="underline text-secondary-foreground font-medium">e-book.</Link>  </p>

                    </div>
                    
                        <div className="flex  mt-4 w-full px-2 lg:w-1/2">
                            <Link href={"/#contact"}>
                                <Button size={"lg"}
                                className="no-underline font-light bg-secondary border-secondary-foreground border"
                                >
                                    Domluvte si &nbsp;<span className="text-secondary-foreground underline">schůzku</span>&nbsp;<MoveUpRight className="text-secondary-foreground"/>
                                </Button>
                            </Link>
                        </div>
                </div>
            </div>
            <div className={`w-full py-10 lg:py-0 lg:w-1/2 flex justify-center items-center`}>
                <Image src={"/images/header-photo.png"} alt="Header photo" width={1024} height={1024} className="object-fill bg-cover " />
            </div>
            </div>
        </header>
    );
}