import { sanityFetch } from "@/sanity/lib/client";
import { Article, Reality, Reviews } from "types";
import { ALL_ARTICLES_QUERY, REALITIES_QUERY } from "@/sanity/lib/queries";
import { MetadataRoute } from "next";

type Route = {
    url: string;
    lastModified: string;
  };
export const dynamic = "force-dynamic"
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl: string = "https://financehb.cz";
    const staticPages: Route[] = [
        "/",
        "/clanky",
        "/e-book",
        "/studio", 
        "/paywall", 
        "/user", 
        "/log-in", 
        "/sign-in", 
        "/update-pass", 
        "/payment/success", 
        "/payment/cancelled",
        "/sluzby",
        "/nemovitosti",
        "/podminky",
        "/ochrana-osobnich-udaju",
      ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString()
      }));
    const articlesPromise: Route[] = await sanityFetch<Article[]>({query: ALL_ARTICLES_QUERY}).then((articles) =>
        articles.map((a: Article) => ({
            url: `${baseUrl}/clanky/${a.slug}`,
            lastModified: new Date().toISOString()
        }))
    );
    const paywallPromise: Route[] = await sanityFetch<Article[]>({query: ALL_ARTICLES_QUERY}).then((articles) =>
      articles.map((a: Article) => ({
          url: `${baseUrl}/paywall/${a.slug}`,
          lastModified: new Date().toISOString()
      }))
  );
    const realitiesPromise: Route[] = await sanityFetch<Reality[]>({query: REALITIES_QUERY}).then((realities) =>
        realities.map((r: Reality) => ({
            url: `${baseUrl}/nemovitosti/${r.slug}`,
            lastModified: new Date().toISOString()
        }))
    );
    let fetchedRoutes: Route[] = [];
    try{
        fetchedRoutes = (await Promise.all([articlesPromise, paywallPromise,realitiesPromise])).flat();

    }catch(error){
        throw JSON.stringify(error)
    } 
    return [...staticPages, ...fetchedRoutes];
}