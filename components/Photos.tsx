"use client";
import React, { useState } from 'react'
import Image from 'next/image';

export default function Photos({ gallery }: { gallery: string[] }) {
    const [selectedId, setSelectedId] = useState<string>("");
    console.log(selectedId)
    return (
        <section className="grid grid-cols-2 md:grid-cols-8 gap-2 w-full h-auto z-0 pb-10 px-5 md:px-20">
            {gallery.map((g, idx: number) => (
                <div key={idx} className={`w-full ${selectedId === String(idx) ? "scale-110" : "scale-100"}`}
                    onClick={() => setSelectedId(String(idx))}
                >
                    <Image
                        src={g}
                        alt={`Gallery Image ${idx + 1}`}
                        width={200}
                        height={200}
                        className="rounded-lg shadow-lg w-full h-full object-contain"
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
        </section>
    )
}