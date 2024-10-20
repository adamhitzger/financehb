"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, HousePlus, MoveUpRight, ThumbsUp, Users, Wallet } from "lucide-react";
export default function About() {
    const praxe = new Date().getFullYear() - 1998;
    const statistics = [
        {
          node: <Wallet strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: "800 mil. Kč",
          text: "Zprostředkoval jsem investice firmám a obcím"
        },
        {
          node: <Users strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: "3000 klientům",
          text: "jsem pomohl najít správnou cestu"
        },
        {
          node: <HousePlus strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: "150 rodin",
          text: "důvěřuje mým zkušenostem"
        },
        {
          node: <ThumbsUp strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: `${String(praxe)} let`,
          text: "praxí a zkušeností za mnou"
        },
      ];
    return (
        <section
            className={`bg-secondary p-8 lg:p-16  text-primary`}>
            <div className="flex flex-wrap lg:flex-nowrap lg:flex-row-reverse w-full border-secondary-foreground border p-3">
            <div className="w-full lg:w-1/2 flex flex-col min-h-screen px-5  font-light">
                <div className="flex flex-col w-full space-y-8 m-auto lg:px-10">
                    
                        <h2 className={`text-7xl  text-left font-ibarra`}>
                        KDO <span className="underline text-secondary-foreground">JSEM ?</span>
                        </h2>
                    
                    <div className={` text-justify lg:text-left text-2xl`}>
                        <p>Zabývám se finančním poradenstvím, investicím a správě portfolií. Pomáhám lidem spravovat portfolia více jak 28 let.  Na mé stránce najdete <Link href={"/clanky"} className="underline text-secondary-foreground font-medium">články</Link> a makroekonomické analýzy, nové investiční příležistosti jako je <Link href={"/clanky/vse-co-potrebujete-vedet-o-dipu"} className="underline text-secondary-foreground font-medium">DIP</Link>.  
                        Přihlaste se k odběru <Link href={"/#newsletter"} className="underline text-secondary-foreground font-medium">newslettru</Link> at Vám nic neuteče! Pro více informací si zakupte <Link href={"/paywall"} className="underline text-secondary-foreground font-medium">předplatné.</Link>  Nezapomňte si stáhnout <Link href={"/e-book"} className="underline text-secondary-foreground font-medium">e-book.</Link>  </p>

                    </div>
                    <div className="w-full grid grid-cols-2 justify-items-center lg:grid-cols-4 gap-4">
                        {statistics.map((s, idx) => (
                            <div className="space-y-2 w-full">
                                {s.node}
                                <hr className="w-full text-secondary-foreground"/>
                                <span className="text-lg font-medium ">{s.heading}</span>
                                <p className="text-left">{s.text}</p>
                            </div>
                        ))}
                    </div>
                    
                        <div className="flex  mt-4 w-full px-2 lg:w-1/2">
                            <Link href={"/#calendly"}>
                                <Button size={"lg"}
                                className="no-underline font-light bg-secondary border-secondary-foreground border"
                                >
                                    Vyberte si termín z &nbsp;<span className="text-secondary-foreground underline">kalendáře</span>&nbsp;<MoveUpRight className="text-secondary-foreground"/>
                                </Button>
                            </Link>
                        </div>
                </div>
            </div>
            <div className={`w-full py-10 lg:py-0 lg:w-1/2 flex justify-center items-center`}>
                <Image src={"/images/header-photo.png"} alt="Header photo" width={1024} height={1024} className="object-fill bg-cover " />
            </div>
            </div>
        </section>
    );
}