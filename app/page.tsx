import CalendlyPop from "@/components/calendlyPop";
import Contact from "@/components/contact";
import Newsletter from "@/components/newsletter";
import Slider from "@/components/slider";
import { Button } from "@/components/ui/button";
import { Services, Socials } from "@/constants";
import { sanityFetch } from "@/sanity/lib/client";
import { HOME_ARTICLES_QUERY, REVIEWS_QUERY } from "@/sanity/lib/queries";
import { Articles, Reviews, Service, SocialNetwork } from "@/types";
import { ArrowRight, HousePlus, MoveUpRight, ThumbsUp, User, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ArticlesComp from "@/components/articles";
import { ibarra } from "./font";

export default async function Home() {
  const praxe = new Date().getFullYear() - 1998;
  const statistics = [
    {
      node: <Wallet strokeWidth={1.3} className="w-12 h-12" />,
      heading: "800 mil. Kč",
      text: "Zprostředkoval jsem investice firmám a obcím"
    },
    {
      node: <User strokeWidth={1.3} className="w-12 h-12" />,
      heading: "3000 klientům",
      text: "jsem pomohl najít správnou cestu"
    },
    {
      node: <HousePlus strokeWidth={1.3} className="w-12 h-12" />,
      heading: "150 rodin",
      text: "důvěřuje mým zkušenostem"
    },
    {
      node: <ThumbsUp strokeWidth={1.3} className="w-12 h-12" />,
      heading: `${String(praxe)} let`,
      text: "praxí a zkušeností za mnou"
    },
  ];
  const articlesPromise: Articles[] = await sanityFetch<Articles[]>({ query: HOME_ARTICLES_QUERY });
  const reviewsPromise: Reviews[] = await sanityFetch<Reviews[]>({ query: REVIEWS_QUERY });
  const [articles, reviews] = await Promise.all([
    articlesPromise,
    reviewsPromise
  ]);
  console.log(articles);
  console
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <header className="bg-secondary/85 flex flex-col w-full p-4 md:p-8 md:pt-12 text-primary max-h-screen space-y-4">
        <div className=" w-full font-extrabold">
          <p className="uppercase text-4xl sm:text-5xl md:text-7xl text-center text-primary">UKÁŽU VÁM CESTU K FINANČNÍ NEZÁVISLOSTI</p>
        </div>
        <div className="md:relative md:top-[-40px] xl:top-[-50px] h-auto md:left-0 flex flex-row space-y-3 sm:space-y-0 space-x-4">
          <div className="flex flex-col w-1/2 sm:w-1/3 space-y-3 md:space-y-10 md:pt-40">
            <div className="p-3 rounded-xl bg-destructive  flex flex-col md:flex-row items-center space-x-2">
              <span className="text-left text-5xl lg:text-8xl font-bold">DIP</span>
              <span className="text-center md:text-right text-md lg:text-lg font-light">Zjistěte podrobně  o <Link href={"/dip"} className="underline underline-offset-2">dlouhodobém investičním produktu</Link></span>
            </div>

            <div className="p-3 rounded-xl bg-secondary text-2xl lg:text-5xl font-bold text-primary leading-0.5">
              <span>Stáhněte si </span><br />
              <Link href={"/e-book"} className="underline underline-offset-2">e-book</Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:w-1/3 justify-center">
            <div className="relative w-full  lg:w-full xl:w-4/5 2xl:w-3/4 ">
              <Image src={"/images/header-photo.png"} alt="Header photo" fill={true} className="object-fill bg-cover " />
            </div>
          </div>
          <div className="flex flex-col w-1/2 sm:w-1/3 space-y-3 md:space-y-10  md:pt-40 ">
            <p className="md:pl-6 text-right text-lg md:text-2xl font-light">
              Pomocí předplatného získáte přístup k informacím z kapitálových trhů, měsíční reporty aj.
            </p>
            <div className="flex justify-center h-full items-center">
              <Link href={"#contact"} className="text-lg md:text-3xl font-medium">· Kontaktujte mě ·</Link>
            </div>
          </div>
        </div>
      </header>
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
      <section className="flex flex-row w-full  space-x-8 bg-gradient-to-r from-secondary from-20% md:from-20% to-primary-foreground md:to-primary md:to-90%" id="omne">
        <div className="text-primary w-full md:w-2/3 px-8 py-8 lg:py-20 xl:py-48 flex flex-col space-y-14 font-extralight">
          <h2 className="text-5xl uppercase tracking-wide">Petr Krajcigr, EFA</h2>
          <p className="text-lg">V oboru financí pracuji od roku 1998 tedy více jak {praxe} let. Specializuji se na investice a rizika v osobních financích. Mými klienty jsou převážně manažeři a majitelé firem. Nikdy však neodmítnu pomoc s důležitým finančním rozhodnutím každému, kdo se na mě s důvěrou obrátí.
            Práce je mou vášní. Proto cílevědomě kombinuji praxi s teorií a mezinárodně uznávaný titul European Financial Advisor (EFA) vnímám jako potvrzení, že jsem na dobré cestě. Pravou motivací pro mě je, když mohu sledovat, jak výsledky mé práce přispívají k naplnění snů mých klientů.</p>
          <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-3 w-full justify-between">
            {statistics.map((s, id) => (
              <div className="flex flex-col space-y-1 text-center items-center w-full" key={id}>
                <span>{s.node}</span>
                <span className="font-medium text-lg lg:text-xl ">{s.heading}</span>
                <p>{s.text}</p>
              </div>
            ))}

          </div>
        </div>
        <div className="relative hidden md:flex md:w-1/3">
          <Image src={"/images/about-section.png"} alt={"/images/about-section.png"} fill={true} className="object-fill bg-cover" />
        </div>
      </section>

      <section className="flex flex-col w-full p-8 space-y-8 bg-primary-foreground" >
        <h2 className={`font-ibarra font-bold tracking-wide text-secondary-foreground text-5xl`}>Sledujte mě</h2>
        <div className="w-full grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-2 ">
          {Socials.map((s: SocialNetwork, id) => (
            <div key={id} className=" rounded-xl p-3 shadow-lg shadow-secondary-foreground">
              <h3 className={`text-secondary-foreground text-3xl font-medium ${ibarra.className}`}>{s.heading}</h3>
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
        <ArticlesComp articles={articles} page="clanky" />
        <Link href={"/clanky"} className=" mx-auto"><Button size={"lg"} className="justify-between underline underline-offset-4 bg-secondary text-primary text-lg mx-auto">Starší články <MoveUpRight /></Button></Link>
      </section>
      <CalendlyPop />
      <section className="flex flex-col w-full p-8 space-y-8" id="contact">
        <h2 className="text-secondary-foreground font-ibarra font-bold tracking-wide  text-5xl">Kontaktujte mě</h2>
        <p className="text-2xl font-light text-center md:text-left">Zanechte mi na sebe kontakt a já se Vám obratem ozvu. Nebo si vyberte termín schůzky z <a href="#calendly" className="underline underline-offset-2">kalendáře</a>.</p>
        <Contact />

      </section>
    </main >
  );
}
