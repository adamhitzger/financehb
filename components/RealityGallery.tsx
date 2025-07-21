"use client";
import React, { useState } from 'react'
import Image from 'next/image'

export function Gallery({ gallery }: { gallery: string[] }) {
   
    return (
        <div className="grid grid-cols-2  md:grid-cols-3 md:grid-rows-2 xl:grid-rows-1 py-5 md:px-5 md:py-0 w-full md:w-1/2 gap-2">
            {gallery && gallery.map((gallery, idx: number) => (
                <div key={idx}
                    className="relative w-full"
                >
                    <Image
                        src={gallery}
                        alt={`Gallery Image ${idx + 1}`}
                        width={1024}
                        height={1024}
                        className="rounded-lg shadow-lg w-full h-auto md:h-32 object-cover"
                    />
                </div>
            ))}
        </div>
    )
}

export default Gallery