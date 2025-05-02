"use client"

import { motion, useInView} from "framer-motion";
import 'react-social-icons/facebook'
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'
import 'react-social-icons/linkedin'
import { useRef } from "react";
import { Socials, WebPromoLinks } from "@/constants";
import { Socialfeed, SocialNetwork } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Feed from "@/components/socialFeed";
import { SocialIcon } from "react-social-icons/component";
export default function MainPage({feed}:{feed: Socialfeed[]}){
  const ref = useRef(null)
  const ref2 = useRef(null)
  const isInView = useInView(ref)
  const isInView2 = useInView(ref2)
    return(
    <section  className="flex flex-col w-full p-5 lg:p-16 space-y-8 bg-primary" >
        <h2 className={`font-ibarra font-bold tracking-wide text-secondary-foreground text-3xl lg:text-5xl`}>Aktuality & rady pro chytré investování</h2>
        <motion.div 
        initial={{ opacity: 0, x: 250 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}} // Animate only when in view
        exit={{ opacity: 0, x: 250 }}
        transition={{ duration: 0.5, delay: 0.3}}
        ref={ref} className="w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 gap-2 ">
          
            <div className="bg-primary-foreground rounded-xl p-3 hover:shadow-lg hover:shadow-secondary-foreground transition ease-in-out delay-100 duration-200">
              <h3 className={`text-secondary-foreground text-2xl font-medium font-ibarra`}>📘 E-book zdarma: Jak úspěšně a efektivně spořit na penzi </h3>
              <hr className="border-1 border-secondary-foreground" />
              <div className="flex flex-row space-x-1.5 my-2 items-center">
               <div className="w-8 h-8 p-1 rounded-full bg-secondary-foreground">
                  <ArrowRight className="text-primary " />
                </div>
                <Link target="_blank" href={"/e-book"} className="text-md">{"Chci se dozvědět víde o e-booku"}</Link>
              </div>
              <p className="text-md">Ať už jste na začátku kariéry, v jejím plném tempu nebo se pomalu připravujete na zasloužený odpočinek – nikdy není brzy (ani pozdě) začít budovat svou finanční budoucnost.<br/><br/> Tento praktický e-book vám ukáže, jak se vyhnout nejčastějším chybám a připravit se na důchod bez zbytečného stresu.<br/> Stáhněte si ho zdarma a buďte připraveni – protože na klidný důchod se nečeká, ten se plánuje. "</p>
            </div>

            <div className="bg-primary-foreground rounded-xl p-3 hover:shadow-lg hover:shadow-secondary-foreground transition ease-in-out delay-100 duration-200">
              <h3 className={`text-secondary-foreground text-2xl font-medium font-ibarra`}>📈 Aktuality z kapitálového trhu </h3>
              <hr className="border-1 border-secondary-foreground" />
              <div className="flex flex-row space-x-1.5 my-2 items-center">
               <div className="w-8 h-8 p-1 rounded-full bg-secondary-foreground">
                  <ArrowRight className="text-primary " />
                </div>
                <Link target="_blank" href={"/paywall"} className="text-md">{}</Link>
              </div>
              <p className="text-md">Získejte každý měsíc přehledné a srozumitelné informace přímo do své e-mailové schránky.Co hýbe trhy, kde se otevírají příležitosti a na co si dát pozor?<br/><br/> Měsíční aktuality vám ušetří čas a udrží vás v obraze.<br/> Stačí kliknout – a začít číst. "</p>
            </div>
        </motion.div>
        <h2 className={`font-ibarra font-bold tracking-wide text-secondary-foreground text-3xl lg:text-5xl`}>Sledujte mě</h2>
        <motion.div
        initial={{ opacity: 0, x: -250 }}
        animate={isInView2 ? { opacity: 1, x: 0 } : {}} // Animate only when in view
        exit={{ opacity: 0, x: -250 }}
        transition={{ duration: 0.5, delay: 0.3}}
        ref={ref2}
        className="w-full grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-2 ">
          {Socials.map((s: SocialNetwork, id) => (
            <div key={id} className="bg-primary-foreground rounded-xl p-3 hover:shadow-lg hover:shadow-secondary-foreground transition ease-in-out delay-100 duration-200">
              <h3 className={`text-secondary-foreground text-2xl font-medium font-ibarra`}>{s.heading}</h3>
              <hr className="border-1 border-secondary-foreground" />
              <div className="flex flex-row space-x-1.5 my-2 items-center">
                
                <SocialIcon style={{height:36, width: 36}} bgColor="#C2B067" url={s.href} network={s.heading.toLowerCase()}/>
                <Link target="_blank" href={s.href} className="text-md">{s.value}</Link>
                
              </div>
              <p className="text-md">{s.text}</p>
            </div>
          ))}
        </motion.div>
        <Feed feed={feed}/>
        
        </section>
        )
}