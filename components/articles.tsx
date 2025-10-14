"use client"
import { components } from "@/sanity/lib/components";
import { Articles as Sanity } from "@/types";
import { MoveUpRight } from "lucide-react";
import { PortableText } from "next-sanity";
import React, { useRef } from 'react'
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useInView, motion } from "framer-motion";
import { toPlainText } from "next-sanity";

export function ArticlesComp({ articles, page }: { articles: Sanity[], page: "clanky" | "paywall"}) {
    console.log(articles);
    const sec = useRef(null)
    const isInView= useInView(sec, {margin: "0px 0px 0px 0px", amount:0})
    if (articles.length === 0) return <div className="text-2xl font-medium text-center">Nebyly nalezeny žádné články</div>
    else return (
        <div ref={sec} className="grid grid-rows-1 sm:grid-cols-1 gap-5  w-full">
            {articles && articles.map((a: Sanity, idx: number) => (
                    <motion.article 
                    key={idx} 
                    className={`w-full flex flex-row `}
                    initial={{opacity:0, x: -250}}
                    animate={isInView?{opacity: 1, x:0}: {}}
                    exit={{opacity: 0, x: -250}}
                    transition={{duration: 0.8*(idx+1)}}
                    >
                        <div className="w-full  sm:w-1/3 bg-cover h-auto bg-no-repeat rounded-lg backdrop-opacity-10 backdrop-invert z-10  before:content-[''] before:absolute before:inset-0 before:block before:bg-secondary-foreground/70 sm:before:bg-transparent  before:opacity-75 before:z-[-5] bg-center" style={{ backgroundImage: `url(${a.picture})` }}>
                            
                        </div>
                    
                        <div className={`hidden w-2/3 sm:flex flex-col justify-between   p-5 font-light space-y-2 lg:p-10`}>
                            <h3 className="text-secondary font-semibold text-lg">{a.name}</h3>
                             <p className="text-sm">{toPlainText(a.overview).slice(0,200) + "..."}</p>
                             <span>{new Date(a.datum).toLocaleDateString("cs-CZ")}</span>
                            <Link href={`/${page}/${a.slug}`}><Button variant="default"  className="text-lg">Celý článek <MoveUpRight /></Button></Link>
                        </div>

                    </motion.article>
                ))}
        </div>
    )
}

export function HomeArticles({ articles }: { articles: Sanity[]}) {
    console.log(articles);
    const sec = useRef(null)
    const isInView = useInView(sec, {margin: "0px 0px 0px 0px", amount:0})
    if (articles.length === 0) return <div className="text-2xl font-medium">Nebyly nalezeny žádné články</div>
    else return (
        <div className="flex flex-col">
         <div className="w-full h-10 bg-secondary/25 ">
<div className="w-full h-10 bg-secondary [clip-path:polygon(100%_0,100%_100%,0_100%)]">

        </div>
        </div>
        
        <section className="flex flex-col w-full p-8 space-y-8 bg-secondary text-white">
        <h2 className="text-right font-bold tracking-wide  text-5xl">Články</h2>
        
        
        <div ref={sec} className="grid md:grid-cols-3 w-full gap-4">
            {articles &&
                articles.map((a: Sanity, idx: number) => (
                    <motion.article 
                    key={idx} 
                    className="w-full space-y-3 flex  flex-col  bg-white/10 rounded-2xl text-base lg:text-lg"
                    initial={{opacity:0, x: -250}}
                    animate={isInView?{opacity: 1, x:0}: {}}
                    exit={{opacity: 0, x: -250}}
                    transition={{duration: 0.8*(idx+1)}}
                    >
                        <Image src={a.picture} alt={a.overview} width={600} height={200}/>
                        <div className="w-full space-y-4 font-light flex text-[1.05rem] flex-col px-2">
                        <span className="text-left text-xl">
                            {a.datum} / {a.name}
                        </span>
                    
                            <PortableText value={a.overview} components={components}/>
</div>
                        <Link href={`/clanky/${a.slug}`} className="mx-auto h-full flex flex-col justify-end pb-3 self-end">
                            <Button variant={"default"}  className="mx-auto">
                            Celý článek
                            </Button>
                        </Link>
                    </motion.article>
                ))}
        </div>
        <Link href={"/clanky"} className=" mx-auto"><Button size={"sm"} className="justify-between mx-auto">Starší články</Button></Link>
      </section>
      </div>
    )
}