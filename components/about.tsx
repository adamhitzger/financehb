"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { HousePlus, MoveUpRight, ThumbsUp, Users, Wallet } from "lucide-react";
import { useMotionValue,animate, motion, useTransform, useInView } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { Suspense } from "react";

function Counter({icon,text, to, endText}:{icon: React.ReactNode,text:string, to: number, endText:string}){
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))
    const ref= useRef<HTMLDivElement>(null)
    const divInView = useInView(ref, {once: true})
    
    useEffect(() => {
      if(divInView){
      const controls = animate(count, [0,to], { type: "tween",duration: 5 })
      return () => controls.stop()
      }
    }, [divInView, count, to])
    return(
      
      <div ref={ref} className="flex text-center flex-col items-center space-y-1">
        {icon}
        <div className="flex flex-col items-center 2xl:flex-row 2xl:items-end">
        <motion.span className="font-medium text-2xl">{rounded}</motion.span><span className="text-2xl px-2 font-light">{`${endText}`}</span>
        </div>
        <p>
          {text}
        </p>
      </div>
    )
  }
export default function About() {
    const praxe = new Date().getFullYear() - 1997;
    const ref = useRef(null)
  const isInView = useInView(ref, {once: false})
    const statistics = [
        {
          node: <Wallet strokeWidth={1.5} className=" w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: 1,
          endText: "mld. Kč",
          text: "Zpravuji na kap. trzích firmám a obcím"
        },
        {
          node: <Users strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: 3000,
          endText:  "klientům",
          text: "Jsem pomohl najít správnou cestu"
        },
        {
          node: <HousePlus strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: 150,
          endText: `rodin`,
          text: "Důvěřuje mým zkušenostem"
        },
        {
          node: <ThumbsUp strokeWidth={1.5} className="w-12 h-12 text-secondary-foreground mx-auto" />,
          heading: praxe ,
          endText: `let`,
          text: "Praxí a zkušeností za mnou"
        },
      ];
    return (
        <section
            className={` bg-secondary w-full p-6 lg:p-16  text-secondary`} id="omne">
            <div className="border-secondary-foreground border-2 rounded-xl bg-primary">
            <div className="flex flex-wrap gap-6 sm:flex-nowrap sm:flex-row-reverse w-full  p-5">
            
            <motion.div
            initial={{ opacity: 0, x: 250 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}} // Animate only when in view
            exit={{ opacity: 0, x: 250 }}
            transition={{ duration: 0.5, delay: 0.5}} ref={ref} className={`w-full  sm:w-1/2 flex justify-center items-center`}>
              <Suspense fallback={<div className="w-full h-96 bg-primary-foreground"></div>}>
            <iframe className="w-full min-h-56" src="https://www.youtube.com/embed/mCzOmuAoKnE?si=X4fHFLvvB0WAdRti" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
           </Suspense>
           </motion.div>
           <div 
            
            className="w-full sm:w-1/2 flex justify-center flex-col font-light">
               <div  className="flex flex-col w-full space-y-8  ">
                   
                       <h2  className={`text-3xl lg:text-5xl  text-left font-ibarra`}>
                       DOVEDU VÁS K FINANČNÍ <span className="underline text-secondary-foreground">NEZÁVISLOSTI</span>
                       </h2>
                   
                   <div  className={`text-left text-base md:text-lg`}>
                   <p>Více než 28 let provázím své klienty světem financí — pomáhám jim budovat finanční nezávislost, chránit majetek, zabezpečit příjmy a správně investovat. Na mé stránce najdete <Link href={"/clanky"} target="_blank" className="underline text-secondary-foreground ">články</Link> a makroekonomické analýzy, nové investiční příležistosti jako je <Link href={"/clanky/vse-co-potrebujete-vedet-o-dipu"} target="_blank" className="underline text-secondary-foreground ">DIP</Link>.  
                       Přihlaste se k odběru <Link href={"/#newsletter"} target="_blank" className="underline text-secondary-foreground ">newslettru</Link> at Vám nic neuteče! Pro více informací si zakupte <Link href={"/paywall"} target="_blank" className="underline text-secondary-foreground ">měsíční aktuality.</Link>  Nezapomňte si stáhnout <Link href={"/e-book"} target="_blank" className="underline text-secondary-foreground ">e-book.</Link>  </p>

                   </div>
                   
                   <Link href={"/sluzby#calendly"} target="_blank">
                               <Button 
                               className="no-underline mx-auto font-light" variant={"default"}
                               >
                                   Zamluvte si &nbsp;<span className="text-secondary font-normal underline">schůzku</span>&nbsp;<MoveUpRight className="text-secondary"/>
                               </Button>
                           </Link>
                           <div className="w-full grid justify-enter grid-cols-2 sm:hidden lg:grid lg:grid-cols-4 gap-4 p-3">
                       {statistics.map((s, idx) => (
                           <Counter key={idx} endText={s.endText} icon={s.node} text={s.text} to={s.heading}/>
                       ))}
                   </div>
                   
                           
               </div>
           </div>
            </div>
            <div className="w-full hidden sm:grid justify-items-end lg:hidden grid-cols-2 sm:grid-cols-4 gap-4 p-3">
                        {statistics.map((s, idx) => (
                            <Counter key={idx} endText={s.endText} icon={s.node} text={s.text} to={s.heading}/>
                      
                        ))}
                    </div>
                    </div>
        </section>
    );
}