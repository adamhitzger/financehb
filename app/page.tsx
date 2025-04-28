import Newsletter from "@/components/newsletter";
import { Button } from "@/components/ui/button";
import { Socials } from "@/constants";
import { sanityFetch } from "@/sanity/lib/client";
import { HOME_ARTICLES_QUERY,  SOCIAL_FEED } from "@/sanity/lib/queries";
import { Articles, Socialfeed, SocialNetwork } from "@/types";
import { ArrowRight, MoveUpRight } from "lucide-react";
import Link from "next/link";
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
    <>
      <Header/>
      <MainPage feed={feed}/>
      <About/>
      <HomeArticles articles={articles}/>

      
    </ >
  );
}
