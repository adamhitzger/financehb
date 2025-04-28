import { Reviews } from "@/types";
import { sanityFetch } from "@/sanity/lib/client";
import { REVIEWS_QUERY } from "@/sanity/lib/queries";
import Sluzby from "@/components/sluzby";
export default async function PoradenstviPage(){
    const reviews: Reviews[] = await sanityFetch<Reviews[]>({ query: REVIEWS_QUERY });
  
    return(
        
            <Sluzby reviews={reviews}/>
    )
}