"use client";

import { Reviews } from "@/types";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { PortableText, toPlainText } from "next-sanity";

function Slide({ name, date, text }: { text: any, name: string; date: string }) {
    return (
        <section  className={`text-base bg-white  max-w-fit p-2 md:p-6 basis-1 text-right rounded-lg md:text-lg font-extralight`} >
            <div className=" text-left text-wrap flex flex-wrap w-full px-3">
                {toPlainText(text)}
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
            className="mx-auto rounded-xl text-base"
            opts={{
                loop: true
            }}
        >
            <CarouselContent > 
                {slides.map((slide, key) => (
                    <CarouselItem key={key} className="max-w-sm flex flex-col justify-center" >
                        <Slide name={slide.name} date={slide.datum} text={slide.text} />
                    </CarouselItem>
                ))}
            </CarouselContent>
             </Carousel>
    )
}