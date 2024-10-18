"use client";

import React from 'react'
import { InlineWidget, PopupWidget } from 'react-calendly'

export default function CalendlyPop() {
    return (
        <section className='w-full p-8 bg-secondary' id='calendly'>
            <h2 className="text-secondary-foreground font-ibarra font-bold tracking-wide  text-5xl">Domluvte si schůzku</h2>
            <p className="text-2xl font-light text-center md:text-left text-primary">Prostřednictvím kalendáře si můžete domluvit schůzku. Stačí vybrat datum,čas a celé potvrdit.</p>

            <InlineWidget
                url="https://calendly.com/petr-6/min"


            />
        </section>
    )
}

