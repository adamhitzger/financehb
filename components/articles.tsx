import { components } from "@/sanity/lib/components";
import { Articles as Sanity } from "@/types";
import { MoveUpRight } from "lucide-react";
import { PortableText } from "next-sanity";
import React from 'react'
import Link from "next/link";
import { Button } from "./ui/button";

export default function ArticlesComp({ articles, page }: { articles: Sanity[], page: "clanky" | "paywall" }) {
    console.log(articles);
    return (
        <div className="grid grid-cols-1 w-full">
            {articles &&
                articles.map((a: Sanity, idx: number) => (
                    <article key={idx} className={`w-full flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"} border-t-2 border-t-secondary-foreground`}>
                        <div className="w-full  sm:w-1/3 bg-cover h-auto bg-no-repeat backdrop-opacity-10 backdrop-invert z-10  before:content-[''] before:absolute before:inset-0 before:block before:bg-secondary-foreground/70 sm:before:bg-transparent  before:opacity-75 before:z-[-5] bg-center" style={{ backgroundImage: `url(${a.picture})` }}>
                            <div className={`z-50  top-5 right-5 w-full p-5 flex flex-col space-y-2 ${idx % 2 === 0 ? "text-right" : "text-left"} sm:hidden`}>
                                <h3 className="text-2xl">{new Date(a.datum).toISOString().split("T")[0]} / {a.name}</h3>
                                <PortableText value={a.overview} components={components} />
                                <Link href={a.slug}><Button size={"sm"} className="bg-secondary" variant={"default"}>Celý článek <MoveUpRight /></Button></Link>

                            </div>

                        </div>
                        <div className={`hidden w-2/3 sm:flex flex-col justify-between ${idx % 2 === 0 ? " border-l-2 border-l-secondary-foreground text-right" : "border-r-2 border-r-secondary-foregborder-l-secondary-foreground text-left"}  p-5 font-light space-y-2 lg:p-10`}>
                            <h3 className="text-2xl">{new Date(a.datum).toISOString().split("T")[0]} / {a.name}</h3>
                            <PortableText value={a.overview} components={components} />
                            <Link href={`/${page}/${a.slug}`}><Button variant="default" className="  text-lg">Celý článek <MoveUpRight /></Button></Link>
                        </div>

                    </article>
                ))}
        </div>
    )
}

