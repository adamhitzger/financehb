import {ArticlesComp }from '@/components/articles';
import PaginationComp from '@/components/pagination';
import { sanityFetch } from '@/sanity/lib/client';
import { ARTICLES_QUERY, COUNT_ARTICLES } from '@/sanity/lib/queries';
import { Articles } from '@/types';

export default async function ArticlesPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const PAGE_SIZE = 4;
    const searchParams = await props.searchParams
    const currentPage = parseInt(searchParams.page || '1');
    const size = currentPage > 1 ? PAGE_SIZE + 1 : PAGE_SIZE;
    const start = (currentPage - 1) * size;
    const end = start + PAGE_SIZE;
    const articlesPromise: Articles[] = await sanityFetch<Articles[]>({ query: ARTICLES_QUERY, params: { start, end } });
    const countPromise: number = await sanityFetch({ query: COUNT_ARTICLES });
    const [articles, count] = await Promise.all([
        articlesPromise,
        countPromise
    ]);
    const totalPages = Math.ceil(count / PAGE_SIZE);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between ">
            
            <section className="flex flex-col w-full p-8 md:p-16 space-y-8">
                <h2 className="  font-bold tracking-wide text-secondary text-5xl">Články</h2>
                <ArticlesComp articles={articles}  page='clanky'/>
               
                <PaginationComp currentPage={currentPage} totalPages={totalPages} />
            
              
                </section>
        </main>
    )
}