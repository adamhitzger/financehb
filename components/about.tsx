"use client";
import { useMotionValue,animate, motion, useTransform, useInView } from "framer-motion";
import React, { useRef, useEffect } from "react";
import "react-social-icons/whatsapp"

function Counter({text, to, endText}:{text:string, to: number, endText:string}){
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
      
      <div ref={ref} className="flex text-left  flex-col text-black items-start w-72 space-y-1">
        <div className="flex flex-row items-end">
        <motion.span className="font-medium text-4xl">{rounded}</motion.span><span className="text-2xl px-2 font-light">{`${endText}`}</span>
        </div>
        <p className="text-lg text-center sm:text-left">
          {text}
        </p>
      </div>
    )
  }
export default function About() {
    const praxe = new Date().getFullYear() - 1997;
   
    const statistics = [
        {
         
          heading: 1,
          endText: "mld. Kč",
          text: "Zpravuji na kap. trzích firmám a obcím"
        },
        {
         
          heading: 3000,
          endText:  "klientům",
          text: "Jsem pomohl najít správnou cestu"
        },
        {
         
          heading: 150,
          endText: `rodin`,
          text: "Důvěřuje mým zkušenostem"
        },
        {
       
          heading: praxe ,
          endText: `let`,
          text: "Praxí a zkušeností za mnou"
        },
      ];
    return (
        <section
            className={` bg-background w-full flex flex-col py-6 lg:py-16  text-black`} id="omne">
            
            <div className="w-full grid grid-cols-1  space-y-5 ">
                <div className="flex flex-col  md:flex-row">
                           <div className="flex w-full flex-row gap-5 items-center">
                    <hr className="bg-black h-0.5 w-20 sm:w-32 md:w-44 lg:w-80 xl:w-96"/>
<Counter endText={statistics[0].endText} text={statistics[0].text} to={statistics[0].heading}/>
<hr className="bg-black h-0.5 w-full"/>
                           </div>
                           <div className="flex w-full flex-row gap-5 items-center">
                    <hr className="bg-black h-0.5 w-32 md:hidden"/>
<Counter endText={statistics[3].endText} text={statistics[3].text} to={statistics[3].heading}/>
                           </div>
                    </div>
                    <div className="flex flex-col md:flex-row ">
                           <div className="flex  w-full flex-row gap-5 justify-end items-center">
                   <hr className="bg-black md:hidden h-0.5 w-full"/>
                   <Counter endText={statistics[1].endText} text={statistics[1].text} to={statistics[1].heading}/>
                    
                           </div>
                           <div className="flex w-full flex-row gap-5 justify-end items-center">
                   <hr className="bg-black h-0.5 w-full"/>
                   <Counter endText={statistics[2].endText} text={statistics[2].text} to={statistics[2].heading}/>
                    <hr className="bg-black h-0.5 w-20 sm:w-32 md:w-44 lg:w-80 xl:w-96"/>
                           </div>
                    </div>
                    </div>

        </section>
    );
}