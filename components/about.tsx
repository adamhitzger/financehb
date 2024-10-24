"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { HousePlus, MoveUpRight, ThumbsUp, Users, Wallet } from "lucide-react";
export default function About() {
    const praxe = new Date().getFullYear() - 1998;
    const statistics = [
        {
          node: <Wallet strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: "800 mil. Kč",
          text: "Zpravuji na kap. trzích firmám a obcím"
        },
        {
          node: <Users strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: "3000 klientům",
          text: "Jsem pomohl najít správnou cestu"
        },
        {
          node: <HousePlus strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: "150 rodin",
          text: "Důvěřuje mým zkušenostem"
        },
        {
          node: <ThumbsUp strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: `${String(praxe)} let`,
          text: "Praxí a zkušeností za mnou"
        },
      ];
    return (
        <section
            className={`bg-secondary w-full p-5 lg:p-16  text-primary`} id="omne">
            <div className="flex flex-wrap gap-6 lg:flex-nowrap lg:flex-row-reverse w-full border-secondary-foreground border p-5">
            <div className="w-full lg:w-1/2 flex flex-col font-light">
                <div className="flex flex-col w-full space-y-8  ">
                    
                        <h2 className={`text-3xl lg:text-5xl  text-right font-ibarra`}>
                        KDO <span className="underline text-secondary-foreground">JSEM ?</span>
                        </h2>
                    
                    <div className={`text-right text-base lg:text-xl`}>
                        <p>Zabývám se finančním poradenstvím, investicím a správě portfolií. Pomáhám lidem spravovat portfolia více jak 28 let.  Na mé stránce najdete <Link target="_blank" href={"/clanky"} className="underline text-secondary-foreground">články</Link> a makroekonomické analýzy, nové investiční příležistosti jako je <Link target="_blank" href={"/clanky/vse-co-potrebujete-vedet-o-dipu"} className="underline text-secondary-foreground">DIP</Link>.  
                        Přihlaste se k odběru <Link href={"/#newsletter"} className="underline text-secondary-foreground">newslettru</Link> at Vám nic neuteče! Pro více informací si zakupte <Link target="_blank" href={"/paywall"} className="underline text-secondary-foreground">předplatné.</Link>  Nezapomňte si stáhnout <Link target="_blank" href={"/e-book"} className="underline text-secondary-foreground">e-book.</Link>  </p>

                    </div>
                    <div className="w-full grid grid-cols-2 justify-items-center lg:grid-cols-4 gap-4">
                        {statistics.map((s, idx) => (
                            <div key={idx} className="w-full space-y-2 w-full">
                                {s.node}
                                <hr className="w-1/2 mx-auto border-secondary-foreground"/>
                                <span className="text-lg text-center font-medium ">{s.heading}</span>
                                <p className="text-center text-base">{s.text}</p>
                            </div>
                        ))}
                    </div>
                    
                            <Link href={"/#calendly"}>
                                <Button 
                                className="no-underline mx-auto font-light" variant={"default"}
                                >
                                    Vyberte si termín z &nbsp;<span className="text-secondary font-normal underline">kalendáře</span>&nbsp;<MoveUpRight className="text-secondary"/>
                                </Button>
                            </Link>
                </div>
            </div>
            <div className={`w-full  lg:w-1/2 flex justify-center items-center`}>
                <Image src={"/images/about.jpg"} alt="Header photo" width={1024} height={1024} className="object-fill bg-cover " />
            </div>
            </div>
        </section>
    );
}