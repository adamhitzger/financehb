"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
export default function PoradenstviPage(){
    const sections = [
        {
        header: "POJIŠTĚTE SE PROTI ZKÁZÁM",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita ad quia itaque dolorum cumque nesciunt iure eum explicabo, error illo a natus aut dicta delectus temporibus libero aliquam exercitationem tempore!",
        image: "/images/header-photo.png",
        flex: "flex-row",
        bg: "primary",
        color: "black"
        },
        {
            header: "SJEDNEJTE SI POJISTKU NA ZDRAVI",
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita ad quia itaque dolorum cumque nesciunt iure eum explicabo, error illo a natus aut dicta delectus temporibus libero aliquam exercitationem tempore!",
            image: "/images/header-photo.png",
            flex: "flex-row-reverse",
            bg: "secondary",
            color: "primary"
            }
    ];
    return(
        <main className="flex min-h-screen flex-col items-center justify-between ">
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
                <Image src={s.image} alt="Sjednejte si pojištění" width={1024} height={1024} className="object-fill bg-cover " />
            </div>
            </div>
        </section> 
    ))}
        </main>
    )
}