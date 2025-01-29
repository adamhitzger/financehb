"use client"

import Newsletter from "@/components/newsletter";

import { Socials } from "@/constants";
import { Socialfeed, SocialNetwork } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Feed from "@/components/socialFeed";
export default function MainPage({feed}:{feed: Socialfeed[]}){
    return(
    <section className="flex flex-col w-full p-5 lg:p-16 space-y-8 bg-primary" >
        <h2 className={`font-ibarra font-bold tracking-wide text-secondary-foreground text-3xl lg:text-5xl`}>Sledujte mě</h2>
        <div className="w-full grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-2 ">
          {Socials.map((s: SocialNetwork, id) => (
            <div key={id} className="bg-primary-foreground rounded-xl p-3 hover:shadow-lg hover:shadow-secondary-foreground transition ease-in-out delay-100 duration-200">
              <h3 className={`text-secondary-foreground text-2xl font-medium font-ibarra`}>{s.heading}</h3>
              <hr className="border-1 border-secondary-foreground" />
              <div className="flex flex-row space-x-1.5 my-2 items-center">
                <div className="w-8 h-8 p-1 rounded-full bg-secondary-foreground">
                  <ArrowRight className="text-primary " />
                </div>
                <Link href={s.href} className="text-md">{s.value}</Link>
              </div>
              <p className="text-md">{s.text}</p>
            </div>
          ))}
        </div>
        <Feed feed={feed}/>
        <div className="w-full md:w-4/5 flex flex-col  p-5 space-y-2 bg-secondary rounded-xl text-primary mx-auto">
          <h3 className="font-ibarra font-extrabold text-lg lg:text-2xl">Přihlaste se k měsíčnímu reportu a odebírejte netradiční finanční rady !</h3>
          <Newsletter />
        </div>
        <p className="font-light text-lg text-center">Přihlášením k odběru souhlasíte se zpracováním osobních údajů. Více informací <Link href='/ochrana-osobnich-udaju' className="underline text-secondary-foreground" target="_blank">ZDE </Link> <br />
        
       * Jednou týdně Vám zašleme souhrn aktuálních informací z kapitálových trhů. Vše komentujeme optikou dlouhodobých investorů.</p>
      
        </section>
        )
}