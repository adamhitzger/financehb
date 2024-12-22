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
            icon: "/images/main.jpg"
          },
          applicationName: "Finance HB",
          generator: "Next.ts",
          title: `Petr Krajcigr, Finance HB - ${r.name}`,
          description: r.overview,
          authors: [{name: "Adam Hitzger"}, {name: "Petr Krajcigr"}],
          keywords: [
            r.name, `${r.street} ${r.street_number} ${r.city} ${r.postcode}`, r.overview, 
            "správa portfolia Havlíčkův Brod",
            "investice Havlíčkův Brod",
            "portfolio management Havlíčkův Brod",
            "investiční poradce Havlíčkův Brod",
            "peníze na investice Havlíčkův Brod",
            "zhodnocení financí Havlíčkův Brod",
            "finanční plánování Havlíčkův Brod",
            "osobní investice Havlíčkův Brod",
            "dlouhodobé investování Havlíčkův Brod",
            "investiční služby Havlíčkův Brod",
            "portfolio manažer Havlíčkův Brod",
            "finanční poradenství Havlíčkův Brod",
            "zajištění investic Havlíčkův Brod",
            "investiční strategie Havlíčkův Brod",
            "kapitálové trhy Havlíčkův Brod",
            "profesionální správa portfolia Havlíčkův Brod",
            "investice do akcií Havlíčkův Brod",
            "investování s expertem Havlíčkův Brod",
            "finanční nezávislost Havlíčkův Brod",
            "pasivní příjem Havlíčkův Brod",
            "správa investičních fondů Havlíčkův Brod",
            "peníze a investice Havlíčkův Brod",
            "investování pro budoucnost Havlíčkův Brod",
            "kvalitní finanční služby Havlíčkův Brod",
            "investiční příležitosti Havlíčkův Brod"
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