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
        heading: "04/ Investice do podílových fondů, ETF, nemovitostí komodit a jiných investic",
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
    heading: "Instagram",
    value: "Podívat se na nejnovější příspěvky",
    href: "https://www.instagram.com/financehb.cz/",
    text: "Získejte přísun informací pomocí reelsů a postů na instagramu. Nezapomeňte odebírat a sdílet!",
    type: "img",
    mediaSrc: "https://www.instagram.com/financehb.cz/reel/DIhRHP1tv5r/",
    src: "/images/feed/igFeed.jpeg",
},
{
    heading: "Youtube",
    value: "Přihlásit k odběru",
    href: "https://www.youtube.com/channel/UCkp9gcnCVfZ3L-cPggo4uMw",
    text: "Chcete dostávat aktuální informace ze světa ekonomiky, investic a kapitálových trhů? Přihlaste se k odběru našeho YouTube kanálu.",
    type: "iframe",
    mediaSrc: "https://www.youtube.com/watch?v=Na34V4jE_iY",
    src: "https://www.youtube.com/embed/Na34V4jE_iY?si=KsbW1-Ot3Hwfq_6a",
},
{
    heading: "Facebook",
    value: "Podívat se na nejnovější příspěvky",
    href: "https://www.facebook.com/financehb.cz/",
    text: "Získejte přísun informací pomocí reelsů a postů na instagramu. Nezapomeňte odebírat a sdílet!",
    type: "img",
    mediaSrc: "https://www.facebook.com/photo.php?fbid=1069393931876969&set=pb.100064191151910.-2207520000&type=3",
    src: "/images/feed/fbFeed.png",
},
{
    heading: "LinkedIn",
    value: "Přihlásit k odběru",
    href: "https://cz.linkedin.com/in/petrkrajcigr",
    text: "Chcete dostávat aktuální informace ze světa ekonomiky, investic a kapitálových trhů? Přihlaste se k odběru našeho YouTube kanálu.",
    type: "img",
    mediaSrc: "https://www.linkedin.com/posts/petrkrajcigr_finance-financnigramotnost-investice-activity-7322979281104498690-XJ7s?utm_source=share&utm_medium=member_desktop&rcm=ACoAADmDMp0BgYEK3d6qSb9Sr5_MKxLPXVBKd7I",
    src: "/images/feed/InFeed.png",
},
]
