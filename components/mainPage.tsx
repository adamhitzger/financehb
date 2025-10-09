"use client"

import { motion} from "framer-motion";
import 'react-social-icons/facebook'
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'
import 'react-social-icons/linkedin'
import { useEffect, useRef } from "react";
import { Socials} from "@/constants";
import { SocialNetwork } from "@/types";
import { ArrowRight} from "lucide-react";
import Link from "next/link";
import { SocialIcon } from "react-social-icons/component";
import Image from "next/image";
import { Button } from "./ui/button";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default  function MainPage(){
  
  const div = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if(!div.current) return
    gsap.fromTo(div.current.children,{
            opacity: 0,
            y:500
        }, {
            opacity:1,
            y:0,
            duration:1,
            ease: "power2.out",
            stagger: 0.3,
            scrollTrigger: {
              trigger: div.current,
              start: "top 80%",
              end: "top 30%",
              scrub: false,
            }
        })
  }, [])
    return(
      <>
      <section className="flex flex-col w-full items-center p-8 lg:p-16 bg-gradient-to-r from-secondary via-secondary to-secondary/95 space-y-8  [clip-path:polygon(0_0,100%_0,100%_calc(100%-70px),0_100%)]" id="sluzby">
      <div ref={div} className="grid grid-cols-1 max-w-5xl">
        <h2 className={`text-white self-start font-bold my-5 tracking-wide text-5xl`}>Čemu se věnuji</h2>
     
          <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Vytvoření <span className="text-secondary-background">finančního plánu</span></h3>
            <p className="font-extralight text-base ">Chcete na své finance nahlížet z dlouhodobého hlediska? Vytvořím vám finanční plán, který vám padne. Při dlouhodobé spolupráci budu po vašem boku při řešení jakékoliv překážky. Není nad to mít partnera, který plánuje za vás, a hlavně pro vás.</p>
           </div>
       
          </div>

          <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Zajištění pravidelného <span className="text-secondary-background">pasivního příjmu</span></h3>
            <p className="font-extralight text-base ">Máte aktuálně větší obnos peněz a nechcete je nechat jen tak ležet v bance? Zajímá vás, jak to udělat, aby vám vaše peníze chytrou investicí přinášeli pravidelný pasivní příjem? Zprostředkuji Vám produkty do Vašeho portfolia, které vám pravidelně budou generovat zajímavé výnosy.</p>
           </div>
       
          </div>

           <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Zajištění příjmu a <span className="text-secondary-background">životního pojištění</span></h3>
            <p className="font-extralight text-base ">Pokud nemáte dostatek času nebo chuti přemýšlet nad svou budoucností, obraťte se na mě. Společně se podíváme na to, co je pro vaši budoucnost nejlepší. A díky mým zkušenostem nám to půjde hladce.</p>
           </div>
       
          </div>

           <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Investice do <span className="text-secondary-background">podílových fondů</span> a <span className="text-secondary-background">ETF</span> aj. </h3>
            <p className="font-extralight text-base ">Rozhodli jste se investovat do podílových fondů, ale nejste si v tomto oboru zcela jistí? Jsem zde pro vás, a díky tomu, že mám za sebou již řadu úspěšných investic, najdeme společně tu správnou cestu bez zbytečných komplikací.</p>
           </div>
       
          </div>

            <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Zajištění  <span className="text-secondary-background">majetku</span> a <span className="text-secondary-background">odpovědností</span> pojištění aut </h3>
            <p className="font-extralight text-base ">Potřebujete poradit se správou majetku? Spolehněte se na mě, protože nevynechám ani sebemenší detail. Nemáte rádi nemilá překvapení? Já také ne, proto nejen při plánování zajištění majetku postupuju s nejvyšší důsledností.</p>
           </div>
       
          </div>


          <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Konsolidace  <span className="text-secondary-background">dluhů</span></h3>
            <p className="font-extralight text-base ">Chcete najít cestu z tíživé finanční situace? Přenechte řešení svých dluhů na mně. Navrhnu skutečně efektivní plán na bezproblémovou konsolidaci dluhů, který vám přinese opravdu fungující řešení vaší situace.</p>
           </div>
       
          </div>
      </div>
      <Link href={"/sluzby"} className="w-fit mx-auto">
                                <Button
                                >
                                    Více služeb 
                        </Button>
                    </Link>
                     <div className="w-full h-10"/>
    </section>
    <section className="w-full flex flex-col px-4 py-8 ">
         <h2 className={`font-semibold tracking-wide text-4xl text-right`}>Nechte peníze pracovat <span className="text-5xl font-bold underline underline-offset-4 decoration-secondary-background">za Vás</span></h2>
         <h3 className="text-2xl text-secondary-background text-right">investorské aktuality a rady</h3>
         <div className="flex flex-col-reverse md:flex-row gap-5 my-8">
<Link target="_blank" href={"/e-book"} className="text-md w-full md:w-1/2">
            <div className="border border-primary-foreground rounded-xl p-8 space-y-5">
              <h3 className={` text-2xl font-medium font-ibarra`}>📘 E-book zdarma: <span className="text-secondary-background">Jak úspěšně a efektivně spořit na penzi </span></h3>
    
              <p className="text-lg font-light">Ať už jste na začátku kariéry, v jejím plném tempu nebo se pomalu připravujete na zasloužený odpočinek – nikdy není brzy (ani pozdě) začít budovat svou finanční budoucnost.<br/><br/> Tento praktický <span className="font-medium underline underline-offset-4 decoration-secondary-background">e-book</span> vám ukáže, jak se vyhnout nejčastějším chybám a připravit se na důchod bez zbytečného stresu.<br/> Stáhněte si ho zdarma a buďte připraveni – protože na klidný důchod se nečeká, ten se plánuje.</p>
            </div>
            </Link>
            <Link target="_blank" href={"/paywall"} className="text-md w-full md:w-1/2 gap-5 flex flex-col justify-between">
            <p className="text-right font-light text-xl">
              Získejte znalosti v investování a odebírejte nejnovější aktuality z kapitálových trhů. Stáhněte si můj e-book nebo odebírejte předplatné.
            </p>
            <div className="border border-primary-foreground  rounded-xl space-y-5 p-8">
              <h3 className={`text-2xl font-medium font-ibarra`}>📈 <span className="text-secondary-background">Aktuality </span> z kapitálového trhu </h3>
              <p className="text-lg font-light">Získejte každý měsíc přehledné a srozumitelné informace přímo do své e-mailové schránky.Co hýbe trhy, kde se otevírají příležitosti a na co si dát pozor?<br/><br/> Měsíční aktuality vám ušetří čas a udrží vás v obraze.<br/> Stačí <span className="font-medium underline underline-offset-4 decoration-secondary-background">kliknout</span> – a <span className="font-medium underline underline-offset-4 decoration-secondary-background">začít číst</span>.</p>
            </div>
            </Link>
         </div>
      
    </section>
   
        </>
        )
}

export function SocialMedia(){
  const ref2 = useRef(null)
  return(
     <section  className="flex bg-primary-foreground flex-col w-full p-5 lg:p-16 space-y-8" >
        <div className="h-10"/>
        <h2 className={` text-center font-semibold tracking-wide  text-3xl lg:text-5xl`}>Sledujte <span className="font-bold underline underline-offset-4 decoration-secondary-background">mě</span></h2>
        <div
        ref={ref2}
        className="w-full grid grid-rows-4 gap-2 ">
          {Socials.map((s: SocialNetwork, id) => (
            <div key={id} className={` flex ${id % 2 ===0 ? "flex-row":"flex-row-reverse"} rounded-xl p-3  transition ease-in-out delay-100 duration-200 h-fit`}>
              <div className="w-full flex flex-row bg-white p-3 rounded-2xl sm:w-1/2 hover:shadow-lg hover:shadow-secondary-foreground" >
            <div className="w-1/2">
            <div className="w-full flex items-center flex-row space-x-4">
 <SocialIcon style={{height:36, width: 36}} url={s.href} network={s.heading.toLowerCase()}/>
          <h3 className={`text-secondary-background text-2xl font-medium font-ibarra`}>{s.heading}</h3>
     
            </div>
              
              <div className="flex flex-col m-3">
              <div className="flex flex-row space-x-1.5 my-2 items-center">
                
                
              </div>
              <p className="sm:text-lg font-light">{s.text.slice(0,100)}</p>
              </div>
             
              </div>
               <Link className="h-fit w-1/2 my-auto" href={s.mediaSrc} target="_blank">
              {s.type === "img" ? <Image src={s.src} alt={s.heading + " Finance HB"} width={400} height={250}/>: <iframe src={s.src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="mx-auto w-full"></iframe>}
              </Link>
            </div>
             <div className="w-full hidden sm:flex sm:w-1/2 h-auto"></div>
            </div>
          ))}
        </div>
     
       
        </section>
  )
}

