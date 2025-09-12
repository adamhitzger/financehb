"use client";
import React, { useRef } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";

export default function Gallery({ gallery }: { gallery: string[] }) {
   console.log(gallery);
       const plugin = useRef(
           Autoplay({ delay: 4000, stopOnInteraction: true })
       );
    return (
        <Carousel
                   plugins={[plugin.current]}
                   className="w-full rounded-xl text-base"
               >
                   <CarouselContent>
                       {gallery.map((slide, key) => (
                           <CarouselItem className="w-full m-auto md:basis-1/2 xl:basis-1/3 3xl:basis-1/4" key={key}>
                             <Image src={slide} alt={'Finance HB'} width={1024} height={512}/>
                           </CarouselItem>
                       ))}
                   </CarouselContent>
                   <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 z-10 size-10 text-white bg-secondary-foreground border-0" />
                   <CarouselNext className="absolute top-1/2 -translate-y-1/2 size-10 right-4 z-10 text-white hover:text-primary bg-secondary-foreground border-0" />
               </Carousel>
    )
}