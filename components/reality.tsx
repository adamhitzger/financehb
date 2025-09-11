"use client"
import { Reality } from "@/types";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";
import Photos from "./Photos";
import Gallery from "./RealityGallery";
import { components } from "@/sanity/lib/components";


export default function RealityComponent({ reality }: { reality: Reality }) {
    let gallery, gallery2;
    if(reality.galleryUrls){
    gallery = reality.galleryUrls.slice(0, 12);
    gallery2 = reality.galleryUrls.slice(13);
}
    return (
        <main className="flex flex-col p-5 w-full min-h-screen z-0">
            <section className="flex flex-col items-start space-y-2 my-8 mx-auto w-full ">
                {reality.name && <h1 className="text-5xl mx-auto font-semibold text-gray-800 font-ibarra">{reality.name}</h1>}
                <div className="flex flex-row space-x-2 mx-auto">
                    {reality.street && <span className="text-lg text-gray-600">{reality.street},</span>}
                    {reality.street_number && <span className="text-lg text-gray-600">{reality.street_number},</span>}
                    {reality.city && <span className="text-lg text-gray-600">{reality.city},</span>}
                    {reality.postcode && <span className="text-lg text-gray-600">{reality.postcode}</span>}
                </div>
                <div className="flex flex-row space-x-2 mx-auto">
                </div>
                <div className="flex flex-row space-x-2 mx-auto">
                    {reality.price !== "0" ? <span className="text-lg text-gray-600">Cena: {reality.price} Kč</span>: <span className="text-lg text-gray-600">Cena: Na domluvě</span>}
                   
                    {reality.area && <span className="text-lg text-gray-600">Rozloha: {reality.area} m<sup>2</sup></span>}
                </div>
            </section>
            <section className="font-light text-base lg:text-lg">
            {reality.details ? <PortableText value={reality.details} components={components}/>: null}
            </section>
            <section className=" flex flex-row  my-5">
                {gallery ? <Gallery gallery={gallery} />: null}
            </section>
            {gallery2 ? <Photos gallery={gallery2} />: null}
            
            <section className="flex p-10 md:p-20 text-justify md:text-center text-base lg:text-lg font-light ">
                <p>Veškeré zveřejněné údaje obsažené v tomto inzerátu mají pouze informativní charakter a nejsou nabídkou ve smyslu § 1731 nebo § 1732 občanského zákoníku, ani se nejedná o veřejný příslib dle § 1733 občanského zákoníku. Z této nabídky tak nikomu nevzniká nárok na uzavření smlouvy. Společnost Financehb.cz Group s.r.o zprostředkovává údaje (informace) nabyté v dobré víře od vlastníka nemovité věci a z tohoto důvodu nenese odpovědnost za jejich úplnost, správnost a přesnost. Současně není oprávněna uzavírat jménem vlastníka nemovité věci jakékoliv smlouvy spojené s prodejem nemovitosti. </p>
            </section>

        </main>
    );
}