import RealityComponent from "@/components/reality";
import { sanityFetch } from "@/sanity/lib/client"
import { REALITY_QUERY } from "@/sanity/lib/queries"
import { Reality } from "@/types"
import { notFound } from "next/navigation";
import { Metadata } from "next";
export async function generateMetadata({params}:{params: Promise<{ slug: string}>}):Promise<Metadata>{
    let r = await sanityFetch<Reality>({ query: REALITY_QUERY, params });
    
    return{
        icons: {
            icon: "/logo.png"
          },
          applicationName: "Finance HB",
          generator: "Next.ts",
          title: `Finance HB, správa investic a financí`,
          description: r.overview,
          authors: [{name: "Adam Hitzger"}, {name: "Petr Krajcigr"}],
          keywords: [
            r.name, `${r.street} ${r.street_number} ${r.city} ${r.postcode}`, r.overview, 
            "správa portfolia",
            "investice",
            "portfolio management",
            "investiční poradce",
            "peníze na investice",
            "zhodnocení financí Havlíčkův Brod",
        ],
        creator: "Adam Hitzger",
                publisher: "Adam Hitzger",
                formatDetection: {
                    email: false,
                    address: false,
                    telephone: false,
                  },
        openGraph: {
          title: `Finance Havlíčkův Brod - ${r.name}`,
          description: r.overview,
          url: `https://www.financehb.cz/nemovitosti/${r.slug}`,
          siteName: "Finance Havlíčkův Brod",
          locale: "cs_CZ",
          type: "website"
        }
    }
}
export default async function Nevomitosti({ params }: { params: Promise<{ slug: string }> }){
    const reality = await sanityFetch<Reality>({query: REALITY_QUERY, params: params});
    console.log(reality);
    if (!reality) {
        return notFound()
    }
    return(
        <RealityComponent reality={reality}/>
    )
}