"use client";

import { Reviews } from "@/types";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { PortableText } from "next-sanity";
import { components } from "@/sanity/lib/components";

function Slide({ name, date, text }: { text: any, name: string; date: string }) {
    return (
        <section className={`border text-base mx-auto bg-white p-2 md:p-14  text-right rounded-lg basis-1 md:text-lg font-extralight`} >
            <div className="w-full  text-left px-3">
                {text ? <PortableText value={text} components={components} /> : null}<br />
            </div>
            {date && name ? <span >{`${name}, ${new Date(date).toLocaleDateString("cs-CZ")}`}</span> : null}<br />
        </section>
    );
}

type Slides = {
    slides: Reviews[];
}
export default function Slider({ slides }: Slides) {
    console.log(slides);
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );
    return (

        <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full rounded-xl text-base"
        >
            <CarouselContent > 
                {slides.map((slide, key) => (
                    <CarouselItem key={key}>
                        <Slide name={slide.name} date={slide.datum} text={slide.text} />
                    </CarouselItem>
                ))}
            </CarouselContent>
             </Carousel>
    )
}