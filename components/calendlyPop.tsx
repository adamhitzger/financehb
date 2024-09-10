"use client";

import React from 'react'
import { InlineWidget, PopupWidget } from 'react-calendly'

export default function CalendlyPop() {
    return (
        <div className='w-full' id='calendly'>
            <InlineWidget
                url="https://calendly.com/petr-6/min"


            />
        </div>
    )
}

