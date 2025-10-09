import { Links, SocialNetwork } from "@/types";


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
