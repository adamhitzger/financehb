import { sanityFetch } from "@/sanity/lib/client";
import { HOME_ARTICLES_QUERY } from "@/sanity/lib/queries";
import { Articles } from "@/types";
import { HomeArticles } from "@/components/articles";
import About from "@/components/about";
import MainPage from "@/components/mainPage";
import { Reviews } from "@/types";
import { REVIEWS_QUERY } from "@/sanity/lib/queries";
import { ReviewsComp } from "@/components/sluzby";

export default async function Home() {
  const articles: Articles[] = await sanityFetch<Articles[]>({ query: HOME_ARTICLES_QUERY }); 
  const reviews: Reviews[] = await sanityFetch<Reviews[]>({ query: REVIEWS_QUERY });
  console.log(articles);
  return (
    <main className="flex min-h-screen w-full overflow-x-hidden flex-col items-center justify-between ">
       <About/>
      <MainPage/>
      <ReviewsComp reviews={reviews}/>
      <HomeArticles articles={articles}/>  
    </main>
  );
}
