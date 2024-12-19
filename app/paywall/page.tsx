import {ArticlesComp} from '@/components/articles';
import PaginationComp from '@/components/pagination';
import PaymentButton from '@/components/paymentButton';
import { sanityFetch } from '@/sanity/lib/client';
import { ALL_ARTICLES_QUERY, COUNT_ALL_ARTICLES, SUBSCRIPTIONS_QUERY } from '@/sanity/lib/queries';
import { Articles, Subscriptions } from '@/types';
import { createSupabaseClient, getUser } from '@/auth/server';
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
                <h2 className=" font-ibarra font-bold tracking-wide text-secondary-foreground text-3xl lg:text-5xl">Předplatné</h2>
                <p className="text-base lg:text-xl font-light text-center md:text-left">Naši investoři jsou úspěšní lidé z řad podnikatelů, vrcholových manažerů či specialistů na světové úrovni, např. z oblasti IT. Jejich úspěch je spojen s nabytým majetkem v hodnotě desítek či stovek milionů korun. Péči o takový majetek chtějí svěřit profesionálům. Od nás očekávají, že jim majetek pomůžeme ochránit před zbytečnými riziky, zhodnotíme ho pár procent nad inflaci, zajistíme jim čerpání nekonečné renty a připravíme majetek pro budoucí mezigenerační přenos.</p>
            </section>
            {supabase?.status !== "active" ? 
            <section className='w-full flex flex-col py-8 px-4 text-secondary text-center space-y-5'>
                <div className='w-full border grid grid-cols-1 grid-rows-4 md:grid-rows-1 md:grid-cols-4 gap-4'>
                    {subs.map((s: Subscriptions, id: number) => (
                        <div key={id} className='bg-primary-foreground rounded-xl w-full flex flex-col items-center justify-between p-14 shadow-xl space-y-8'>
                            <div className='flex flex-col text-center w-fit text-secondary'>
                                <span className='text-3xl font-medium'>{s.price} Kč</span>
                                <span className='text-lg '>{s.season}</span>
                            </div>

                            <div className='w-fit'>
                                <PaymentButton stripeId={s.stripePriceId} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>: <section className='w-full flex flex-col p-8 space-y-8'>
                <ArticlesComp articles={articles}  page='paywall'/>
                <PaginationComp currentPage={currentPage} totalPages={totalPages} />
            </section>}
            

        </main>
    )
}