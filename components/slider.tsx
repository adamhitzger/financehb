"use client";

import { Reviews } from "@/types";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { PortableText } from "next-sanity";
import { components } from "@/sanity/lib/components";

function Slide({ name, date, text }: { text: any, name: string; date: string }) {
    return (
        <section className={`w-full p-8 md:p-14 bg-primary-foreground shadow-lg text-right rounded-lg  text-xl md:text-2xl font-extralight`} >
            <div className="w-full text-left px-3">
                {text ? <PortableText value={text} components={components} /> : null}<br />
            </div>
            {date && name ? <span >{`${name}, ${new Date(date).toISOString().split("T")[0]}`}</span> : null}<br />
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
            className="w-full rounded-xl "
        >
            <CarouselContent>
                {slides.map((slide, key) => (
                    <CarouselItem className="w-full" key={key}>
                        <Slide name={slide.name} date={slide.datum} text={slide.text} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-white bg-secondary" />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 z-10 text-white hover:text-primary bg-secondary" />
        </Carousel>
    )
}