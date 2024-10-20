import RealityComponent from "@/components/reality";
import { sanityFetch } from "@/sanity/lib/client"
import { REALITY_QUERY } from "@/sanity/lib/queries"
import { Reality } from "@/types"
import { notFound } from "next/navigation";

export default async function Nevomitosti({ params }: { params: { slug: string } }){
    const reality = await sanityFetch<Reality>({query: REALITY_QUERY, params: params});
    console.log(reality);
    if (!reality) {
        return notFound()
    }
    return(
        <RealityComponent reality={reality}/>
    )
}