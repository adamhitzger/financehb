import CalendlyPop from "@/components/calendlyPop";
import Contact from "@/components/contact";
import Newsletter from "@/components/newsletter";
import Slider from "@/components/slider";
import { Button } from "@/components/ui/button";
import { Services, Socials } from "@/constants";
import { sanityFetch } from "@/sanity/lib/client";
import { HOME_ARTICLES_QUERY, REVIEWS_QUERY } from "@/sanity/lib/queries";
import { Articles, Reviews, Service, SocialNetwork } from "@/types";
import { ArrowRight, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { HomeArticles } from "@/components/articles";
import Header from "@/components/header";
import About from "@/components/about";
import Gallery from "@/components/gallery";
export default async function Home() {
  const articlesPromise: Articles[] = await sanityFetch<Articles[]>({ query: HOME_ARTICLES_QUERY });
  const reviewsPromise: Reviews[] = await sanityFetch<Reviews[]>({ query: REVIEWS_QUERY });
  const [articles, reviews] = await Promise.all([
    articlesPromise,
    reviewsPromise
  ]);
  console.log(articles);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Header/>
      <section className="flex flex-col w-full p-8 space-y-8 bg-primary-foreground" id="sluzby">
        <h2 className={`text-secondary-foreground font-bold tracking-wide  text-5xl font-ibarra`}>Čemu se věnuji</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-5">
          {Services.map((s: Service, i: number) => (
            <div key={i} className="bg-primary p-5 rounded-lg  flex w-full flex-col space-y-4  shadow-lg shadow-secondary-foreground">
              <h3 className="text-2xl xl:text-3xl text-secondary-foreground">{s.heading}</h3>
              <p className="font-light text-lg xl:text-xl text-black">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
      <About/>
      <Gallery/>
      <section className="flex flex-col w-full p-8 space-y-8 bg-primary-foreground" >
        <h2 className={`font-ibarra font-bold tracking-wide text-secondary-foreground text-5xl`}>Sledujte mě</h2>
        <div className="w-full grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-2 ">
          {Socials.map((s: SocialNetwork, id) => (
            <div key={id} className=" rounded-xl p-3 shadow-lg shadow-secondary-foreground">
              <h3 className={`text-secondary-foreground text-3xl font-medium font-ibarra`}>{s.heading}</h3>
              <hr className="border-1 border-secondary-foreground" />
              <div className="flex flex-row space-x-1.5 my-2 items-center">
                <div className="w-8 h-8 p-1 rounded-full bg-secondary-foreground">
                  <ArrowRight className="text-primary " />
                </div>
                <Link href={s.href} className="text-md">{s.value}</Link>
              </div>
              <p className="text-md">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="w-full md:w-4/5 flex flex-col  p-5 space-y-4 bg-secondary rounded-xl text-primary mx-auto">
          <h3 className="font-ibarra font-extrabold text-2xl">Přihlaste se k měsíčnímu reportu a odebírejte netradiční finanční rady !</h3>
          <Newsletter />
        </div>
        <p className="font-light text-center">* Jednou týdně Vám zašleme souhrn aktuálních informací z kapitálových trhů. Vše komentujeme optikou dlouhodobých investorů.</p>
      </section>
      <section className="flex flex-col w-full p-4 sm:p-8 space-y-8 bg-secondary" >
        <h2 className="text-secondary-foreground font-ibarra font-bold tracking-wide  text-5xl">Reference</h2>
        <p className="text-2xl font-light text-center md:text-left text-primary">Naši investoři jsou úspěšní lidé z řad podnikatelů, vrcholových manažerů či specialistů na světové úrovni, např. z oblasti IT. Jejich úspěch je spojen s nabytým majetkem v hodnotě desítek či stovek milionů korun. Péči o takový majetek chtějí svěřit profesionálům. Od nás očekávají, že jim majetek pomůžeme ochránit před zbytečnými riziky, zhodnotíme ho pár procent nad inflaci, zajistíme jim čerpání nekonečné renty a připravíme majetek pro budoucí mezigenerační přenos.</p>
        <div className="w-full mx-auto">
          <Slider slides={reviews} />
        </div>
      </section>

      <section className="flex flex-col w-full p-8 space-y-8">
        <h2 className=" font-ibarra font-bold tracking-wide text-secondary text-5xl">Články</h2>
        <HomeArticles articles={articles}/>
        <Link href={"/clanky"} className=" mx-auto"><Button size={"lg"} className="justify-between underline underline-offset-4 bg-secondary text-primary text-lg mx-auto">Starší články <MoveUpRight /></Button></Link>
      </section>
      <CalendlyPop />
      <section className="flex flex-col w-full p-8 space-y-8 bg-primary-foreground" id="contact">
        <h2 className="text-secondary-foreground font-ibarra font-bold tracking-wide  text-5xl">Kontaktujte mě</h2>
        <p className="text-2xl font-light text-center md:text-left">Zanechte mi na sebe kontakt a já se Vám obratem ozvu. Nebo si vyberte termín schůzky z <a href="#calendly" className="underline underline-offset-2">kalendáře</a>.</p>
        <Contact />

      </section>
    </main >
  );
}
