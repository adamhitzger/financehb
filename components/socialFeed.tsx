"use client";
import { Socialfeed } from "@/types";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/lib/components";

export default function Feed({feed}: {feed: Socialfeed[]}){
if(feed.length === 0) return(<h3 className="text-destructive font-medium text-center">Žádné příspěvky</h3>)    
else return(
        <div className="w-full flex flex-col space-y-2">
            <h3 className="font-ibarra font-bold tracking-wide text-secondary-foreground text-2xl lg:text-4xl">Obsah ze socialních sítí</h3>
            <div className={`w-full grid grid-cols-1 text-primary sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:mx-auto`}>
                {feed.map((f: Socialfeed, i:number) => (
                    <Link href={f.href} target="_blank" key={i}><div className="hover:shadow-lg hover:shadow-secondary-foreground rounded-lg w-full bg-cover h-auto bg-no-repeat backdrop-opacity-10 backdrop-invert z-10  before:content-[''] before:absolute before:inset-0 before:rounded-lg before:block before:bg-secondary/80 before:opacity-75 before:z-[-5] bg-center" style={{ backgroundImage: `url(${f.img})` }}>
                            <div className=" rounded-lg text-base z-50 space-y-2 top-5 right-5 w-full p-5"> <h4 className="text-xl underline font-ibarra text-secondary-foreground">{f.name}</h4>
                      <PortableText value={f.overview} components={components}/>
                      </div>
                    </div> 
                    </Link>
                ))}
            </div>
        </div>
    )
}