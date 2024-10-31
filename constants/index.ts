import { Links, Service, SocialNetwork } from "@/types";

export const navLinks: Links[] = [
    {
        name: "O mně",
        route: "/#omne",
    },
    {
        name: "Služby",
        route: "/sluzby",
    },
    {
        name: "Články",
        route: "/clanky",
    },
    {
        name: "E-book",
        route: "/e-book",
    },
    {
        name: "Členská sekce",
        route: "/paywall"
    }
];

export const Services: Service[] = [
    {
        heading: "01/ Vytvoření finančního plánu",
        text: "Chcete na své finance nahlížet z dlouhodobého hlediska? Vytvořím vám finanční plán, který vám padne. Při dlouhodobé spolupráci budu po vašem boku při řešení jakékoliv překážky. Není nad to mít partnera, který plánuje za vás, a hlavně pro vás.",
    },
    {
        heading: "02/ Zajištění pravidelného pasivního příjmu",
        text: "Máte aktuálně větší obnos peněz a nechcete je nechat jen tak ležet v bance? Zajímá vás, jak to udělat, aby vám vaše peníze chytrou investicí přinášeli pravidelný pasivní příjem? Zprostředkuji Vám produkty do Vašeho portfolia, které vám pravidelně budou generovat zajímavé výnosy.",
    },
    {
        heading: "03/ Zajištění příjmu a životního pojištění",
        text: "Pokud nemáte dostatek času nebo chuti přemýšlet nad svou budoucností, obraťte se na mě. Společně se podíváme na to, co je pro vaši budoucnost nejlepší. A díky mým zkušenostem nám to půjde hladce.",
    },
    {
        heading: "04/ Investice do podílových fondů",
        text: "Rozhodli jste se investovat do podílových fondů, ale nejste si v tomto oboru zcela jistí? Jsem zde pro vás, a díky tomu, že mám za sebou již řadu úspěšných investic, najdeme společně tu správnou cestu bez zbytečných komplikací.",
    },
    {
        heading: "05/ Zajištění majetku a odpovědností, pojištění aut",
        text: "Potřebujete poradit se správou majetku? Spolehněte se na mě, protože nevynechám ani sebemenší detail. Nemáte rádi nemilá překvapení? Já také ne, proto nejen při plánování zajištění majetku postupuju s nejvyšší důsledností.",
    },
    {
        heading: "06/ Konsolidace dluhů",
        text: "Chcete najít cestu z tíživé finanční situace? Přenechte řešení svých dluhů na mně. Navrhnu skutečně efektivní plán na bezproblémovou konsolidaci dluhů, který vám přinese opravdu fungující řešení vaší situace.",
    },
];

export const Socials: SocialNetwork[] = [
    {
        heading: "E-book",
        value: "Chci se dozvědět víde o e-booku",
        href: "/e-book",
        text: "V našem e-booku Jak investují dolaroví milionáři se dozvíte, jak investují a jak se od nich můžete inspirovat. Jakým způsobem přemýšlí nad majetkem a jakých chybám se vyvarovat."
},
{
    heading: "Předplatné",
    value: "Chci si zaplatit předplatné",
    href: "/predplatne",
    text: "Pomocí předplatného získáte přístup k informacím z kapitálových trhů, měsíční reporty aj."
},
{
    heading: "Instagram",
    value: "Podívat se na nejnovější příspěvky",
    href: "https://www.instagram.com/financehb.cz/",
    text: "Získejte přísun informací pomocí reelsů a postů na instagramu. Nezapomeňte odebírat a sdílet!"
},
{
    heading: "Youtube",
    value: "Přihlásit k odběru",
    href: "https://www.youtube.com/channel/UCkp9gcnCVfZ3L-cPggo4uMw",
    text: "Chcete dostávat aktuální informace ze světa ekonomiky, investic a kapitálových trhů? Přihlaste se k odběru našeho YouTube kanálu.,"
},
]
