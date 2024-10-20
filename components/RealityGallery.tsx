"use client";
import React, { useState } from 'react'
import Image from 'next/image'

export function Gallery({ gallery }: { gallery: string[] }) {
    const [selectedId, setSelectedId] = useState<string>("");
    return (
        <div className="  grid grid-cols-2 grid-rows-6 md:grid-cols-4 md:grid-rows-3 py-5 md:px-5 md:py-0 w-full md:w-1/2 gap-2">
            {gallery && gallery.map((gallery, idx: number) => (
                <div key={idx}
                    className="relative w-full "
                    onClick={() => setSelectedId(String(idx))}
                >
                    <Image
                        src={gallery}
                        alt={`Gallery Image ${idx + 1}`}
                        width={200}
                        height={200}
                        className="rounded-lg shadow-lg w-full h-auto md:h-32 object-cover"
                    />
                </div>
            ))}

            {selectedId && (
                <div
                    className="fixed top-0 left-0 inset-0 w-full z-50 bg-black bg-opacity-50 flex items-center justify-center min-h-screen"
                    onClick={() => setSelectedId("")}
                >
                    {gallery.map((u: string, idx: number) => (
                        String(idx) === selectedId && (
                            <div
                                className="bg-white rounded-lg p-2 shadow-md max-w-lg mx-auto"
                                key={idx}
                            >
                                <div className="relative ">
                                    <Image src={u} alt={u} className="object-contain w-full h-full rounded-lg" width={1800} height={200} loading="eager" />
                                    <button
                                        className="absolute -top-0 -right-0 py-1 px-2 text-center text-white bg-red-500 rounded-full"
                                        onClick={() => setSelectedId("")}
                                    >
                                        X
                                    </button>

                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    )
}

export default Gallery