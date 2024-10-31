"use client"

import { Check, MoveUpRight, X } from "lucide-react"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Services} from "@/constants";
import { Reviews, Service } from "@/types";
import CalendlyPop from "./calendlyPop";
import Contact from "./contact";
import Slider from "./slider";
export default function Sluzby({reviews}: {reviews: Reviews[]}) {
  const sections = [
    {
    header: "POJIŠTĚTE SE PROTI ZKÁZÁM",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita ad quia itaque dolorum cumque nesciunt iure eum explicabo, error illo a natus aut dicta delectus temporibus libero aliquam exercitationem tempore!",
    image: "/images/gallery.jpg",
    flex: "flex-row",
    bg: "primary",
    color: "black"
    },
    {
        header: "SJEDNEJTE SI POJISTKU NA ZDRAVI",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita ad quia itaque dolorum cumque nesciunt iure eum explicabo, error illo a natus aut dicta delectus temporibus libero aliquam exercitationem tempore!",
        image: "/images/gallery3.jpg",
        flex: "flex-row-reverse",
        bg: "secondary",
        color: "primary"
        }
];
  const plans = [
    { name: "Basic", price: "$9.99/mo" },
    { name: "Pro", price: "$24.99/mo" },
    { name: "Enterprise", price: "Custom" },
  ]

  const features = [
    { name: "Expense tracking", basic: true, pro: true, enterprise: true },
    { name: "Basic budgeting", basic: true, pro: true, enterprise: true },
    { name: "Monthly reports", basic: true, pro: true, enterprise: true },
    { name: "Investment tracking", basic: false, pro: true, enterprise: true },
    { name: "Tax planning", basic: false, pro: true, enterprise: true },
    { name: "Custom categories", basic: false, pro: true, enterprise: true },
    { name: "Multi-user access", basic: false, pro: false, enterprise: true },
    { name: "API integration", basic: false, pro: false, enterprise: true },
    { name: "Dedicated support", basic: false, pro: false, enterprise: true },
  ]

  return (
    <>
    <section className="flex flex-col w-full p-5 lg:p-16 space-y-8 bg-primary-foreground" id="sluzby">
        <h2 className={`text-secondary-foreground font-bold tracking-wide text-3xl lg:text-5xl font-ibarra`}>Čemu se věnuji</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-5">
          {Services.map((s: Service, i: number) => (
            <div key={i} className="bg-primary p-5 rounded-lg  flex w-full flex-col space-y-4  hover:shadow-lg hover:shadow-secondary-foreground transition ease-in-out delay-100 duration-200">
              <h3 className="text-xl text-secondary-foreground">{s.heading}</h3>
              <p className="font-extralight text-base text-black">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    {sections.map((s,i) => ( 
      <section
      key={i}
          className={`bg-${s.bg} p-8 lg:p-16  text-${s.color}`}>
          <div className={`flex flex-wrap sm:flex-nowrap sm:${s.flex} w-full border-secondary-foreground border p-3`}>
          <div className="w-full sm:w-1/2 flex flex-col  px-5 justify-center font-light">
              <div className="border flex flex-col w-full space-y-8 ">
                  
                      <h2 className={`text-3xl lg:text-5xl  text-left font-ibarra`}>
                          {s.header}
                      </h2>
                  
                  <div className={` text-justify lg:text-left text-xl`}>
                      <p>{s.text}</p>
                  </div>
                  
              </div>
          </div>
          <div className={`w-full sm:w-1/2 flex md:justify-center border items-center`}>
              <Image src={s.image} alt="Sjednejte si pojištění" width={512} height={512} className="object-fill bg-cover " />
          </div>
          </div>
      </section> 

  ))}
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary mb-4">Choose Your Financial Management Plan</h1>
        <p className="text-secondary-foreground text-xl">Unlock the power of smart financial planning</p>
      </div>
      <div className="w-full max-w-6xl bg-secondary text-primary rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-6 items-end">
          <div className="text-left font-bold">Features</div>
          {plans.map((plan) => (
            <div key={plan.name} className="text-center">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <Button className="w-full no-underline bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90">
                Choose Plan <MoveUpRight/>
              </Button>
            </div>
          ))}
        </div>
        <div className="bg-primary-foreground">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`grid grid-cols-4 gap-4 p-4 ${index % 2 === 0 ? "bg-secondary" : "bg-secondary/90"}`}
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