import { Button } from '@/components/ui/button';
import { sanityFetch } from '@/sanity/lib/client'
import { components } from '@/sanity/lib/components';
import { ARTICLE_QUERY } from '@/sanity/lib/queries'
import { Article } from '@/types'
import { PortableText } from 'next-sanity';
import React from 'react'
import Link from 'next/link';
import { Metadata } from 'next';
export async function generateMetadata({params}:{params: Promise<{ slug: string}>}):Promise<Metadata>{
    const p: Article = await sanityFetch<Article>({ query: ARTICLE_QUERY, params: params });
  
    return{
        icons: {
            icon: "/images/main.jpg"
          },
          applicationName: "Finance HB",
          generator: "Next.ts",
          title: `Petr Krajcigr, Finance HB - ${p.name}`,
          description: p.overview,
          authors: [{name: "Adam Hitzger"}, {name: "Petr Krajcigr"}],
          keywords: [
             p.overview, 
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
          title: `Finance Havlíčkův Brod - ${p.name}`,
          description: p.overview,
          url: `https://www.financehb.cz/nemovitosti/${p.slug}`,
          siteName: "Finance Havlíčkův Brod",
          images: [
            {
                url: p.picture,
                width: 800,
                height: 600,
            },
        ],
          locale: "cs_CZ",
          type: "website",
        }
    }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const article = await sanityFetch<Article>({ query: ARTICLE_QUERY, params: params });
    console.log(article)
    return (
        <main className="flex min-h-screen flex-col space-y-3 p-8">
            <h2 className="mt-10 font-ibarra text-left tracking-wide text-secondary font-semibold text-3xl">{new Date(article.datum).toISOString().split("T")[0]} / {article.name}</h2>
            <article className={`w-full flex flex-row border-t-2 border-t-secondary-foreground`}>
                <div className="w-full  sm:w-1/2 bg-cover h-96 bg-no-repeat backdrop-opacity-10 backdrop-invert z-10  before:content-[''] before:absolute before:inset-0 before:block before:bg-gray-600 sm:before:bg-transparent  before:opacity-75 before:z-[-5] bg-center" style={{ backgroundImage: `url(${article.picture})` }}>
                    <div className={`z-50  top-5 right-5 w-full p-5 flex flex-col space-y-2 text-right text-base sm:hidden`}>
                        <PortableText value={article.overview} components={components} />
                    </div>
                </div>
                <div className={`hidden w-1/2 sm:flex flex-col justify-center border-l-2 border-l-secondary-foreground text-right text-lg  py-12 px-5 font-light space-y-2 lg:p-10`}>
                    <PortableText value={article.overview} components={components} />
                </div>

            </article>
            <div className=' text-lg space-y-6 mt-5'>
                <PortableText value={article.unpaid_text} components={components} />
                {article.paid_text ? <div className='w-full flex flex-col text-center'>
                    <span className='text-lg'>Chcete si přečíst celý článek?
                        Díky předplatnému získáte nejnovější informace!</span>
                    <Link className='text-lg underline underline-offset-2' href={"/paywall"}>Začít odebírat</Link>
                </div> : null}
            </div>
        </main>
    )
}

