"use client";

import Image from "next/image";
import { Reality,  } from "@/types";
import Link from "next/link";

export default function Realities({ realities }: { realities: Reality[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3  w-full mx-auto lg:w-3/4 gap-5 ">
            {realities?.length > 0 ? (
                realities.map((r, i) => (
                    <div key={i} className="w-full border-secondary-foreground transition ease-in-out hover:shadow-lg hover:shadow-secondary-foreground h-96 flex flex-col hover:z-10 hover:rounded-[15px] hover:p-3 hover:scale-125 hover:animate-card bg-white border-2">
                        <div className="w-full relative h-3/4">
                            <Image
                                src={r.imageUrl}
                                alt={`Petr Krajcigr - ${r.name}`}
                                fill={true}
                                className="object-cover h-full w-full"
                            />
                        </div>
                        <div className="p-3 space-y-2">
                            <Link href={`/nemovitosti/${r.slug}`}><span className="text-lg underline underline-offset-2">{r.name}</span></Link>
                            <p className="font-light text-base">{r.overview}</p>
                        </div>
                    </div>

                ))
            ) : (
                <div className="p-4 text-red-500">Nebyly nalezeny žádné nemovitosti na prodej.</div>
            )}
        </div>
    )
}