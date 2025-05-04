import { sanityFetch } from "@/sanity/lib/client";
import { HOME_ARTICLES_QUERY,  SOCIAL_FEED } from "@/sanity/lib/queries";
import { Articles, Socialfeed, SocialNetwork } from "@/types";
import { HomeArticles } from "@/components/articles";
import Header from "@/components/header";
import About from "@/components/about";
import MainPage from "@/components/mainPage";
export default async function Home() {
  const articlesPromise: Articles[] = await sanityFetch<Articles[]>({ query: HOME_ARTICLES_QUERY });
  const feedPromise: Socialfeed[] = await sanityFetch<Socialfeed[]>({query: SOCIAL_FEED});
  const [articles,feed] = await Promise.all([
    articlesPromise,
    feedPromise
  ]);
  console.log(articles);
  console.log(feed)
  return (
    <main className="flex min-h-screen w-full overflow-x-hidden flex-col items-center justify-between ">
       <About/>
      <Header/>
      <MainPage feed={feed}/>
    
      <HomeArticles articles={articles}/>  
    </main>
  );
}
