"use client";

import Image from "next/image";
import { Reality,  } from "@/types";
import Link from "next/link";

export default function Realities({ realities }: { realities: Reality[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  2xl:grid-cols-4  5xl:grid-cols-6 w-full mx-auto 2xl:w-4/5 max-w-7xl gap-5 ">
            {realities?.length > 0 ? (
                realities.map((r, i) => (
                    <Link href={`/nemovitosti/${r.slug}`} key={i} className="w-full h-96 flex space-y-5 flex-col rounded-[15px] bg-white">
                        <div className="w-full relative h-3/4 ">
                            <Image
                                src={r.imageUrl}
                                alt={`Petr Krajcigr - ${r.name}`}
                                fill={true}
                                className="object-cover h-full w-full rounded-[10px]"
                            />
                        </div>
                        <div className="w-full grid grid-cols-2">
                            <div className="w-full text-left">
                                <span className="text-xl">{r.name}</span> 
                            </div>
                            <div className="text-right">
{r.price !== "0" ? <span className="text-xl font-light ">Cena: {r.price} Kč</span>: <span className="text-xl font-light text-secondary-background">Cena: Na domluvě</span>}
                            </div>

                          <div className="w-full text-left">
                                    <div className="flex flex-col font-light mx-auto">
                    {r.city && <span className="text-lg ">{r.city},</span>}
                    {r.postcode && <span className="text-lg ">{r.postcode}</span>}
                    
                </div>
                        </div>

                        <div className="w-full flex flex-col justify-end">
                            <div className="w-full flex flex-row flex-wrap justify-end space-x-4">
                                <div className="rounded-full border border-black p-1">
                                    {r.area} m<sup>2</sup>
                                </div>
                                <div className="rounded-full border border-black p-1">
                                    {r.street} {r.street_number}
                                </div>
                            </div>
                        </div>
                        </div>
                    </Link>

                ))
            ) : (
                <div className="p-4 text-red-500">Nebyly nalezeny žádné nemovitosti na prodej.</div>
            )}
        </div>
    )
}