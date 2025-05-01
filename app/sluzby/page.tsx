import { Reviews } from "@/types";
import { sanityFetch } from "@/sanity/lib/client";
import { REVIEWS_QUERY } from "@/sanity/lib/queries";
import Sluzby from "@/components/sluzby";
export default async function PoradenstviPage(){
    const reviews: Reviews[] = await sanityFetch<Reviews[]>({ query: REVIEWS_QUERY });
  
    return(
        <main className="flex min-h-screen w-full overflow-x-hidden flex-col items-center justify-between ">
            <Sluzby reviews={reviews}/>
            </main>
    )
}