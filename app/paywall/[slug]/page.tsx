import { sanityFetch } from '@/sanity/lib/client'
import { components } from '@/sanity/lib/components';
import { ARTICLE_QUERY } from '@/sanity/lib/queries'
import { Article } from '@/types'
import { PortableText } from 'next-sanity';
import { Metadata } from 'next';

export async function generateMetadata(props:{params: Promise<{ slug: string}>}):Promise<Metadata> {
    const params = await props.params;
    const p: Article = await sanityFetch<Article>({ query: ARTICLE_QUERY, params: params });

    return{
        icons: {
            icon: "/logo.png"
          },
          applicationName: "Finance HB",
          generator: "Next.ts",
          title: `Finance HB, správa investic a financí`,
          description: p.overview,
          authors: [{name: "Adam Hitzger"}, {name: "Petr Krajcigr"}],
          keywords: [
             p.overview, 
            "správa portfolia",
            "investice",
            "portfolio management",
            "investiční poradce",
            "peníze na investice",
            "zhodnocení financí",
            "finanční plánování",
            "Havlíčkův Brod"
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

export default async function ArticlePage(props: { params: Promise<{ slug: string }>}) {
    const params = await props.params;
    const article = await sanityFetch<Article>({ query: ARTICLE_QUERY, params: params });
    console.log(article.paid_text);
    return (
        <main className="flex min-h-screen flex-col items-center space-y-3 p-8">
            <div className='max-w-5xl flex flex-col space-y-5'>
        <h2 className="mt-10 font-ibarra text-left tracking-wide font-semibold text-6xl">{article.name}</h2>
                           <span>{new Date(article.datum).toLocaleDateString("cs-CZ")}</span>
                            <PortableText value={article.overview} components={components} />
                            
                            <div className="w-full   bg-contain h-96 bg-no-repeat backdrop-opacity-10  z-10  before:block before:bg-transparent  bg-center" style={{ backgroundImage: `url(${article.picture})` }}>
                                 
                            </div>
                            
            <div className=' space-y-6 mt-5'>
                <PortableText value={article.unpaid_text} components={components} />
                {article.paid_text ? <PortableText value={article.paid_text} components={components} /> : null}
            </div>
            </div>
            
        </main>
    )
}

