"use client"

import { Check, MoveUpRight, X } from "lucide-react"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Services} from "@/constants";
import { Reviews, Service } from "@/types";
import CalendlyPop from "./calendlyPop";
import Contact from "./contact";
import Slider from "./slider";
import { useRef } from "react";
import {motion, useInView} from "framer-motion"
import Link from "next/link";
export default function Sluzby({reviews}: {reviews: Reviews[]}) {
  const sec = useRef(null)
  const sec2 = useRef(null)
  const text = useRef(null)
const isInView = useInView(sec, {amount:0.3})
const isInView2 = useInView(sec2, {amount:0.3})
  const sections = [
    {
    header: "DLOUHODOBÝ INVESTIČNÍ PRODUKT",
    text: "Využijte daňových úlev až 7 200 Kč díky novému DIP! Získejte příspěvek od zaměstnavatele až 50 000 Kč ročně. Ušetřete nejen sobě, ale i své firmě – začněte hned!",
    image: "/images/gallery.jpg",
    flex: "flex-row",
    bg: "primary",
    color: "black",
    ref: sec,
    isInV: isInView ,
      btnText: "Více",
        btnLink: "/clanky/vse-co-potrebujete-o-dipu-vedet",
    },
    {
        header: "ZAJIŠTĚNÍ SVÉHO PŘÍJMU",
        text: "Bez příjmu není budoucnost – zajistěte si ho včas! Chraňte sebe, svou rodinu i plány, na kterých vám záleží. Nejdřív jistota, potom spoření a investice. Začněte budovat finanční stabilitu správným krokem!",
        image: "/images/gallery3.jpg",
        flex: "flex-row-reverse",
        bg: "secondary",
        color: "primary",
        ref: sec2,
        isInV: isInView2,
        btnText: "Poraďte se",
        btnLink: "/sluzby/#contact",
    }
];
  const plans = [
    { name: "Standart se slevou", price: "300 Kč", yrlPrice:  "3300 Kč"},
    { name: "Standard", price: "499 Kč", yrlPrice:  "6500 Kč" },
    { name: "Premium", price: "890 Kč", yrlPrice:  "10900 Kč" },
  ]

  const features = [
    { name: "garance EUCS",info: "bla bla", basic: false, pro: true, enterprise: true },
    { name: "Aktualizace finančního plánu 1 ročně", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "Aktualizace finančního plánu 1x za 14 měšíců", info: "bla bla",basic: true, pro: true, enterprise: false },
    { name: "Aktualizace finančního plánu", info: "bla bla",basic: false, pro: true, enterprise: false },
    { name: "Aktualizace finančního plánu dle potřeby", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "Přehled změn finančního majetku", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Přehled změn finančního majetku 1/4 rok", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "Analýza finančního portfolia", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Aktualizace portfolia pojistných smluv ", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Aktualizace portfolia úvěrů", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Aktualizace portfolia investic",info: "bla bla", basic: false, pro: true, enterprise: true },
    { name: "Komplexní zpracování administrativy", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "Hlášení pojistných událostí", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Krizový plán pro rodinu", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "Obecná konzultace pojišťovacími odborníky", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "Obecná konzultace úvěrovými odborníky", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Obecná konzultace investičními odborníky", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Obecná konzultace s finančními odborníky pro soukromé účely", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Poradce na telefonu ", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Přednostní odbavení", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "On-line finanční aktuality",info: "bla bla", basic: true, pro: true, enterprise: true },
    { name: "Mimořádné zprávy", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "On-line archivace produktové dokumentace", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Archivace produktové dokumentace", info: "bla bla",basic: false, pro: true, enterprise: true },
    { name: "Konzultace s realitními odborníky", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "Pomoc v oblasti investičních nemovitostí", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "Audit socialního zapezpečení", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "Webinář a Workshopy ", info: "bla bla",basic: false, pro: false, enterprise: true },
    { name: "Služby optimalizace výdajů domácnosti", info: "bla bla",basic: true, pro: true, enterprise: true },
    { name: "Asistence při řešení pojistných údálostí", info: "bla bla",basic: false, pro: false, enterprise: true },
  ]

    
  return (
    <>
    <section className="flex flex-col w-full p-5 lg:p-16 space-y-8 bg-primary-foreground" id="sluzby">
        <h2 className={`text-secondary-foreground font-bold tracking-wide text-3xl lg:text-5xl font-ibarra`}>Čemu se věnuji</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-5">
          {Services.map((s: Service, i: number) => (
            <motion.div
            initial={{opacity:0, x: -600}}
                    animate={{opacity: 1, x:0}}
                    exit={{opacity: 0, x: -600}}
                    transition={{duration: 0.2*(i+1)}}
            key={i} className="bg-primary p-5 rounded-lg  flex w-full flex-col space-y-4  hover:shadow-lg hover:shadow-secondary-foreground transition ease-in-out delay-100 duration-200">
              <h3 className="text-xl text-secondary-foreground">{s.heading}</h3>
              <p className="font-extralight text-base text-black">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    {sections.map((s,i) => ( 
     
      <motion.section
      ref={s.ref}
      key={i}
          className={`bg-${s.bg} p-8 lg:p-16  text-${s.color}`}>
          <div className={`flex flex-wrap sm:flex-nowrap sm:${s.flex} w-full border-secondary-foreground border-2 rounded-xl p-3`}>
          <div className="w-full sm:w-1/2 flex flex-col  px-5 justify-center font-light">
              <motion.div 
              initial={{opacity:0, x: -600}}
              animate={s.isInV?{opacity: 1, x:0}: {}}
              exit={{opacity: 0, x: -600}}
              transition={{duration: 0.4}}
              className=" flex flex-col w-full space-y-4 my-3">
                      <h2
                      className={`text-3xl lg:text-5xl  text-left font-ibarra`}>
                          {s.header}
                      </h2>
                  <div className={` text-justify lg:text-left text-xl`}>
                      <p>{s.text}</p>
                  </div>
                  <Link href={s.btnLink} className="mx-auto">
                                <Button size={"lg"}
                                className="no-underline font-light bg-secondary-foreground w-full    text-base"
                                >
                                    {s.btnText} <MoveUpRight className="text-secondary"/>
                        </Button>
                    </Link>
              </motion.div>
          </div>
          <motion.div 
          initial={{opacity:0, x: 600}}
          animate={s.isInV?{opacity: 1, x:0}: {}}
          exit={{opacity: 0, x: 600}}
          transition={{duration: 0.4}}
          className={`w-full sm:w-1/2 flex md:justify-center items-center`}>
              <Image src={s.image} alt="Sjednejte si pojištění" width={512} height={512} className="object-fill bg-cover  hover:shadow-xl hover:shadow-secondary-foreground rounded-xl transition ease-in-out delay-100 duration-200" />
          </motion.div>
          </div>
      </motion.section> 

  ))}
    <div ref={text} className="bg-primary min-h-screen flex flex-col justify-center p-4 space-y-5" id="cenik">
    <h2 
    className="text-secondary-foreground font-ibarra md:text-left font-bold tracking-wide  text-3xl lg:text-5xl">Placené poradenství</h2>
    <h3 
    className=" font-ibarra md:text-left font-bold tracking-wide  text-2xl lg:text-4xl">🔒 Dlouhodobá důvěra, profesionální péče o váš majetek </h3>
    <p 
    
    className="text-base lg:text-xl font-light text-justify md:text-left text-black">Díky mým dlouholetým zkušenostem klienti ví, že se na mě mohou spolehnout – i když sami nemají čas vše sledovat. Chtějí mít kontrolu nad svým majetkem, ale zároveň partnera, který sleduje změny, hlídá detaily a přichází s řešeními. Proto využívají placené poradenství, které jim poskytuje jistotu, klid a VIP přístup ke správě financí. 

    Ať už spravujete majetek do 1 milionu korun, nebo jste manažer či ředitel firmy s portfoliem v řádech milionů – mám pro vás řešení. </p>
    <h3 
    className=" font-ibarra md:text-left font-bold tracking-wide  text-2xl lg:text-4xl">🧩 Co získáte díky placenému poradenství? </h3>
    <ul className="list-disc mx-5 space-y-1">
      <li><span className="font-bold">Pravidelnou péči a kontrolu nad majetkem </span>– minimálně jednou ročně projdeme aktuální hodnotu a úpravy plánu </li>
      <li><span className="font-bold">Aktualizaci finančního plánu a konzultace zdarma</span></li> 

      <li><span className="font-bold">Měsíční aktuality z trhu</span> a přehled novinek bez složitého hledání</li> 

      <li><span className="font-bold">Snížení poplatků u investic </span></li>

      <li><span className="font-bold">Online archivaci smluv, </span>přístup k přehledné majetkové tabulce a hlídání klíčových termínů</li> 

      <li><span className="font-bold">Garanci odpovědi na vaše dotazy do druhého dne </span></li>

      <li><span className="font-bold">Hlášení pojistných událostí přes službu EUCS</span>, včetně právního servisu – bez stresu, bez zdržení </li>
      
    </ul>
    <h3 
    className=" font-ibarra md:text-left font-bold tracking-wide  text-2xl lg:text-4xl">🧭 Vyberte si ze 3 variant poradenství:  </h3>
    <ul className="list-decimal mx-5 space-y-1">
      <li><span className="font-bold">Základní balíček</span> – ideální pro aktivní jednotlivce i rodiny </li>
      <li><span className="font-bold">Rozšířený servis </span>– pro náročnější klienty s vyšším objemem financí </li> 

      <li><span className="font-bold">VIP správa</span> – pro ty, kteří chtějí plný komfort, individuální přístup a maximální efektivitu </li>    
    </ul>
         <p>👉 Posuňte správu svého majetku na vyšší úroveň. Staňte se klientem s profesionální péčí, která šetří čas, peníze i starosti. 

 
<br/>
<span className="font-bold">Pokud vás tato nabídka zaujala, neváhejte se ozvat – rád vám vše osobně představím.</span></p>  
      <div className="w-full max-w-6xl mx-auto items-center bg-secondary text-primary rounded-lg overflow-y-visible">
        <div className="grid grid-cols-4 gap-4 p-6 items-end">
          <div className="text-left font-bold">Tarif</div>
          {plans.map((plan) => (
            <div key={plan.name} className="text-center">
              <h3 className="text-sm sm:text.lg font-bold mb-2">{plan.name}</h3>
              
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 p-6 items-end">
          <div className="text-left font-bold">Měsíční cena</div>
          {plans.map((plan) => (
            <div key={plan.name} className="text-center">
              <h3 className="text-sm sm:text.lg font-bold mb-2">{plan.price}</h3>
              
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 p-6 items-end">
          <div className="text-left font-bold">Roční cena</div>
          {plans.map((plan) => (
            <div key={plan.name} className="text-center">
              <h3 className="text-sm sm:text.lg font-bold mb-2">{plan.yrlPrice}</h3>
              
            </div>
          ))}
        </div>
        <div className="bg-primary-foreground">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`grid grid-cols-4 gap-4 p-4 ${index % 2 === 0 ? "bg-secondary/90" :"bg-secondary" }`}
            >
              <div className="text-left">{feature.name}</div>
              {[feature.basic, feature.pro, feature.enterprise].map((included, i) => (
                <div key={i} className="flex justify-center items-center">
                  {included ? (
                    <Check className="text-secondary-foreground h-6 w-6" />
                  ) : (
                    <X className="text-primary-foreground h-6 w-6" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    <section className="flex flex-col w-full p-5 lg:p-16 space-y-8 bg-secondary" >
            <h2 className="text-secondary-foreground font-ibarra font-bold tracking-wide  text-3xl lg:text-5xl">Reference</h2>
            <p className="text-base lg:text-xl font-light text-justify md:text-left text-primary">Naši investoři jsou úspěšní lidé z řad podnikatelů, vrcholových manažerů či specialistů na světové úrovni, např. z oblasti IT. Jejich úspěch je spojen s nabytým majetkem v hodnotě desítek či stovek milionů korun. Péči o takový majetek chtějí svěřit profesionálům. Od nás očekávají, že jim majetek pomůžeme ochránit před zbytečnými riziky, zhodnotíme ho pár procent nad inflaci, zajistíme jim čerpání nekonečné renty a připravíme majetek pro budoucí mezigenerační přenos.</p>
            <div className="w-full mx-auto">
              <Slider slides={reviews} />
            </div>
          </section>
          <CalendlyPop />
          <section className="flex flex-col w-full p-8 space-y-8 bg-primary-foreground" id="contact">
            <h2 className="text-secondary-foreground font-ibarra font-bold tracking-wide  text-3xl lg:text-5xl">Kontaktujte mě</h2>
            <p className="text-base lg:text-xl font-light text-left">Zanechte mi na sebe kontakt a já se Vám obratem ozvu. Nebo si vyberte termín schůzky z <a href="#calendly" className="underline underline-offset-2">kalendáře</a>.</p>
            <Contact />
            </section>
    </>
  )
}