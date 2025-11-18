import Realities from "@/components/realities";
import { sanityFetch } from "@/sanity/lib/client"
import { REALITIES_QUERY } from "@/sanity/lib/queries"
import { Reality } from "@/types"

export default async function Nevomitosti(){
    const reality = await sanityFetch<Reality[]>({query: REALITIES_QUERY});
    console.log(reality);
    
    return(
        <main className="flex flex-col w-full space-y-10 p-5 md:p-16">
            <h1 className="text-left text-5xl underline underline-offset-2 decoration-secondary-background font-semibold ">Nemovitosti</h1>
        <Realities realities={reality}/>
        </main>
    )
}