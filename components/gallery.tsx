"use client";
import Image from "next/image";
import { BentoGrid, BentoGridItem  } from "./ui/bento-grid";

export default function Gallery(){
    const items = [
        {
            src: "/images/gallery.jpg"
        },
        {
            src: "/images/galler2.jpg"
        },
        {
            src: "/images/gallery3.jpg"
        },
        
    ]
    return(
        <section className="w-full bg-secondary grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 lg:p-16">
      {items.map((item, i:number) => (
        <Image key={i} src={item.src} width={1024} height={200} className="object-fill bg-cover rounded-xl hover:shadow-lg hover:shadow-primary-foreground border-2 border-secondary-foreground" alt={"Fotogalerie - Petr Krajcigr, EFA, finanční a servisní poradenství"}/>
      ))}
        </section>
    )
};