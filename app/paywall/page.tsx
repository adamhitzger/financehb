import {ArticlesComp} from '@/components/articles';
import PaginationComp from '@/components/pagination';
import PaymentButton from '@/components/paymentButton';
import { sanityFetch } from '@/sanity/lib/client';
import { ALL_ARTICLES_QUERY, COUNT_ALL_ARTICLES, SUBSCRIPTIONS_QUERY } from '@/sanity/lib/queries';
import { Articles, Subscriptions } from '@/types';
import { createSupabaseClient, getUser } from '@/auth/server';
import Subscription from '@/components/PaywallComp';
export default async function ArticlesPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const client = await createSupabaseClient();
    const userPromise = await getUser();
    const { data, error } = await client.from("subscriptions").select("status").eq("user_id", userPromise?.id).single();
    console.log(data)
    if(error) console.log(error.message)
    const PAGE_SIZE = 4;
    console.log(process.env)
const searchParams = await props.searchParams
    const currentPage = parseInt(searchParams.page || '1');
    const size = currentPage > 1 ? PAGE_SIZE + 1 : PAGE_SIZE;
    const start = (currentPage - 1) * size;
    const end = start + PAGE_SIZE
    const articlesPromise: Articles[] = await sanityFetch<Articles[]>({ query: ALL_ARTICLES_QUERY, params: { start, end } });
    const countPromise: number = await sanityFetch({ query: COUNT_ALL_ARTICLES });
    const subsPromise: Subscriptions[] = await sanityFetch<Subscriptions[]>({ query: SUBSCRIPTIONS_QUERY });
    const [articles, count, subs, myUser, supabase] = await Promise.all([
        articlesPromise,
        countPromise,
        subsPromise,
        userPromise,
        data
    ]);
    const totalPages = Math.ceil(count / PAGE_SIZE);
    console.log(subs)
    return (
        <main className="flex flex-col items-center justify-between space-y-4">
            <section className="flex flex-col w-full p-8 space-y-8">
                <h2 className=" font-ibarra font-bold tracking-wide text-secondary-foreground text-3xl lg:text-5xl">Měsíční aktuality</h2>
                <p className="text-base lg:text-xl font-light text-center md:text-left">Naši investoři bývají úspěšní podnikatelé, vrcholoví manažeři nebo specialisté s majetkem v řádech desítek až stovek milionů korun. <br/>

 

Chtějí jistotu, že jejich peníze pracují efektivně, bezpečně a s výhledem na další generace. Ale jestli zrovna nejste dolarový milionář, nevadí – i pro vás máme místo. Právě proto si zde můžete vyzvednout naše finanční "Měsíční aktuality" a držet si informační náskok. 
Protože vědět, co se děje, se vyplatí. I když zatím nemáte vlastní ostrov. <br/>

(A když mi dáte vědět, co by vás zajímalo příště, rád to do příštích aktualit přidám – informací mám dost, jen ty vaše otázky mi zatím chybí.) </p>
            </section>
            {supabase?.status !== "active" && myUser  ? 
            <section className='w-full flex flex-col py-8 px-4 text-secondary text-center space-y-5'>
                    <Subscription subs={subs} user={myUser}/>
            </section>: <section className='w-full flex flex-col p-8 space-y-8'>
                <ArticlesComp articles={articles}  page='paywall'/>
                <PaginationComp currentPage={currentPage} totalPages={totalPages} />
            </section>}
            

        </main>
    )
}