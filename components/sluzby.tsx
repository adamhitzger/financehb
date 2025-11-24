"use client"

import { Check, MoveUpRight, X } from "lucide-react"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Reviews} from "@/types";
import CalendlyPop from "./calendlyPop";
import Contact from "./contact";
import Slider from "./slider";
import { useRef } from "react";
import {motion, useInView} from "framer-motion"
import Link from "next/link";
export default function Sluzby() {
  const sec = useRef(null)
  const sec2 = useRef(null)
  const text = useRef(null)
const isInView = useInView(sec, {amount:0.3})
const isInView2 = useInView(sec2, {amount:0.3})
const services = [
  {
    link:"aktualizace",
    title: "Aktualizace finančního plánu 1× za 24 měsíců",
    description: "Poskytovatel asistuje Odběrateli při řešení otázek týkajících se jeho finanční situace a celkového majetku. Odběratel má právo na osobní schůzku 1× za 24 kalendářních měsíců, na které je mu prezentován přehled stávajícího portfolia produktů a majetku a plnění finančních cílů. Podle informací sdělených Odběratelem jsou na schůzce aktualizovány finanční cíle Odběratele, jeho cashflow a podklady pro finanční plán."
  },
  {
    link:"onAkt",
    title: "On-line finanční aktuality",
    description: "Odběrateli jsou přes evidovanou e-mailovou adresu zasílány novinky a informace z finančního trhu. Odběratel je informován o případných ekonomických změnách a novinkách týkajících se finančních produktů a očekávaného vývoje na finančním trhu a finančních produktů. Odběratel má možnost položit Poskytovateli jakýkoliv upřesňující dotaz týkající se těchto finančních produktů."
  },
  {
    link:"domacnost",
    title: "Služby optimalizace výdajů domácnosti",
    description: "Poskytovatel zajistí Odběrateli na jeho podnět poskytnutí služeb souvisejících s chodem domácnosti. Jedná se o služby, které ovlivňují rodinný rozpočet a poskytují příležitost ke snížení pravidelných nákladů. Konkrétní výčet služeb je platný dle aktuální nabídky Poskytovatele."
  },
  {
    link:"eucs",
    title: "Garance EUCS",
    description: "Odběratel má právo na zajištění bezplatného zastoupení společností EUCS a s ní spolupracující advokátní kanceláří / advokátem při vzniku pojistné události ze životního a úrazového pojištění, havarijního pojištění, pojištění domácnosti, nemovitosti a pojištění odpovědnosti. Odběratel má rovněž právo na zajištění bezplatné konzultace nároků z jiných oblastí pojištění se zvýhodněnými podmínkami případného zastoupení pro řešení nezaviněných dopravních nehod a pracovních úrazů. Kompletní podmínky služby najdete níže."
  },
  {
    link:"finakt",
    title: "Aktualizace finančního plánu",
    description: "Poskytovatel asistuje Odběrateli při řešení otázek týkajících se jeho finanční situace a celkového majetku. Odběratel má právo na osobní schůzku, na které je mu prezentován přehled stávajícího portfolia produktů a majetku a plnění finančních cílů. Podle informací sdělených Odběratelem jsou na schůzce aktualizovány finanční cíle Odběratele, jeho cashflow a podklady pro finanční plán."
  },
  {
    link:"finmat",
    title: "Přehled změn finančního majetku",
    description: "Odběrateli je v daném časovém horizontu předložen aktuální přehled stavu produktů a naspořených finančních prostředků ve srovnání s minulým obdobím."
  },
  {
    link:"analyza",
    title: "Analýza finančního portfolia",
    description: "Poskytovatel asistuje Odběrateli při řešení otázek týkajících se jeho finančního portfolia. Za tímto účelem je Odběrateli předložen aktuální přehled stavu produktů v jeho finančním portfoliu. Odběratel je Poskytovatelem informován o aktuální situaci napříč finančním trhem a o předpokládaném dalším vývoji na finančním trhu, aby měl Odběratel možnost zvolit si optimální řešení. Na vyžádání je Odběratel Poskytovatelem v obecné rovině informován o aktuálních nabídkách dostupných na trhu."
  },
  {
    link:"aktPpp",
    title: "Aktualizace portfolia pojistných smluv",
    description: "Poskytovatel asistuje Odběrateli při aktualizaci jeho portfolia pojistných smluv. Odběratel je Poskytovatelem informován o aktuální situaci na trhu, aby měl Odběratel možnost zvolit si optimální řešení. Obsahem této služby je také obecné informování o vývoji a možnostech na pojistném trhu za účelem zvyšování znalostí Odběratele, jeho finanční gramotnosti a orientace na pojistném trhu."
  },
  {
    
    link:"aktUv",
    title: "Aktualizace portfolia úvěrů",
    description: "Poskytovatel asistuje Odběrateli při aktualizaci jeho portfolia úvěrových smluv. Odběratel je Poskytovatelem informován o aktuální situaci na trhu, aby měl Odběratel možnost zvolit si optimální řešení. Obsahem této služby je také obecné informování o vývoji a možnostech na úvěrovém trhu za účelem zvyšování znalostí Odběratele, jeho finanční gramotnosti a orientace na úvěrovém trhu."
  },
  {
    link:"aktIn",
    title: "Aktualizace portfolia investic",
    description: "Poskytovatel asistuje Odběrateli při aktualizaci jeho portfolia investičních smluv. Odběratel je Poskytovatelem informován o aktuální situaci na trhu, aby měl Odběratel možnost zvolit si optimální řešení. Obsahem této služby je také pravidelné obecné informování o vývoji a možnostech na finančním trhu, příp. osvětové a metodické informace a materiály, to vše za účelem zvyšování znalostí a kompetencí a finanční gramotnosti Odběratele. Na vyžádání je Odběratel Poskytovatelem informován o aktuálních zvýhodněných nabídkách na trhu v obecné rovině."
  },
  {
    link:"hlaseni",
    title: "Hlášení pojistných událostí",
    description: "Poskytovatel poskytne Odběrateli základní administrativní asistenci v souvislosti s hlášením pojistné události. Poskytovatel zašle Odběrateli k vyplnění příslušné formuláře pojišťovny, příp. kontaktní údaje pojišťovny nebo jiné pověřené osoby (telefon, e-mail) či webové rozhraní, kde lze nahlásit pojistnou událost pojišťovně on-line a kde nalezne informace o podkladech, které bude pojišťovna po Odběrateli požadovat k řádnému nahlášení pojistné události (např. lékařské zprávy, rodný list)."
  },
  {

    link:"uvery",
    title: "Obecná konzultace s úvěrovými odborníky",
    description: "Odběratel může využít možnosti získat všeobecné informace týkající se oblasti úvěrů."
  },
  {

    link:"investOdb",
    title: "Obecná konzultace s investičními odborníky",
    description: "Odběratel může využít možnosti získat všeobecné informace týkající se oblasti investic."
  },
  {
    link:"privacy",
    title: "Obecná konzultace s finančními odborníky pro soukromé účely",
    description: "Odběratel může využít možnosti získat všeobecné informace týkající se různých oblastí finančního trhu – pojištění, úvěry, hypotéky, poradenství v oblasti výnosnosti investičních nemovitostí apod."
  },
  {
    link:"foun",
    title: "Poradce na telefonu",
    description: "Poskytovatel zajistí Odběrateli přímý kontakt na Odběratelem zvoleného finančního poradce, na kterého se může obrátit při řešení aktuálních otázek a problémů týkajících se obecně finančního trhu a jeho produktů."
  },
  {

    link:"odbaveni",
    title: "Přednostní odbavení",
    description: "Poskytovatel zajistí Odběrateli přednostní odbavení jeho požadavků se zpětnou reakcí finančního poradce do 1 pracovního dne od zadání konkrétního požadavku Odběratelem na e-mailovou adresu Poskytovatele uvedenou v této smlouvě. Zpětnou reakcí finančního poradce se rozumí kontaktování Odběratele se základním nástinem řešení takového požadavku Odběratele, odhadem časové náročnosti a předpokládaným termínem kompletního zpracování takového požadavku Odběratele, to vše do 1 pracovního dne."
  },
  {
    link:"prodDoc",
    title: "On-line archivace produktové dokumentace",
    description: "Odběratel může nechat ukládat a archivovat dokumentaci k produktovému portfoliu na cloudovém úložišti či vlastním serveru Poskytovatele dále jen datové úložiště, který má Poskytovatel pro tento účel zřízený. Na základě domluvy je produktová dokumentace Odběratele na datovém úložišti Poskytovatele průběžně shromažďována. Může zahrnovat i dokumenty a smlouvy o finančních a jiných produktech, které Odběratel sjednal s jinými osobami, či v rámci Služby optimalizace domácnosti. Odběratel má možnost kdykoli předat Poskytovateli dohodnutým způsobem dokumenty, které chce do produktové dokumentace zařadit. Poskytovatel převzaté dokumenty vyhodnotí a v návaznosti na jejich obsah případně vyrozumí Odběratele o nutnosti podniknout určité kroky, či dokument rovnou zařadí na datové úložiště. Poskytovatel si vyhrazuje právo nezařadit na datové úložiště dokumenty, jejichž důležitost, typ nebo obsah jsou dle jeho názoru nezpůsobilé k uchovávání na datovém úložišti, a to zejména z hlediska bezpečnosti a ochrany osobních údajů. O takové skutečnosti vyrozumí Odběratele. Odběratel má současně právo požadovat, aby byla část nebo celá produktová dokumentace vyřazena z datového úložiště a předána jemu či třetí osobě podle Odběratelových dispozic. Poskytovatel produktovou dokumentaci na datovém úložišti archivuje a třídí podle typu. Pokud to datové úložiště umožňuje, zřídí Poskytovatel Odběrateli nepřetržitý on-line přístup k jeho dokumentům, a to včetně kompletního přehledu uložené dokumentace. Služba nezahrnuje věcné hodnocení obsahu dokumentů, vyhodnocování výročí a splatnosti ani kontrolu korespondence, není-li to výslovně sjednáno. Dokumenty, které je dle zákona Poskytovatel povinen pro Odběratele uchovávat v rámci poskytnutých regulovaných služeb, jsou uchovávány Poskytovatelem zdarma."
  },
  {
    link:"doc",
    title: "Archivace produktové dokumentace",
    description: "Odběratel může ponechat veškerou smluvní dokumentaci k produktovému portfoliu ve správě Poskytovatele. Na základě souhlasu Odběratele a předávacího protokolu je produktová dokumentace u Poskytovatele průběžně shromažďována, a to včetně veškeré korespondence Odběratele k daným produktům. Může zahrnovat i dokumenty a smlouvy o finančních a jiných produktech, které Odběratel sjednal s jinými osobami, či v rámci Služby optimalizace domácnosti. Odběratel má možnost kdykoli na pobočku Poskytovatele nebo jiné odsouhlasené místo přinést dokumenty, které chce do produktové dokumentace zařadit. Současně má Odběratel právo si část nebo celou produktovou dokumentaci na základě předávacího protokolu odnést. Služba nezahrnuje věcné hodnocení obsahu dokumentů, vyhodnocování výročí a splatnosti ani kontrolu korespondence, není-li to výslovně sjednáno. Dokumenty, které je dle zákona Poskytovatel povinen pro Odběratele uchovávat v rámci poskytnutých regulovaných služeb, jsou uchovávány Poskytovatelem zdarma."
  },
  {
    link:"akt",
    title: "Aktualizace finančního plánu 1× za 12 měsíců",
    description: "Poskytovatel asistuje Odběrateli při řešení otázek týkajících se jeho finanční situace a celkového majetku. Odběratel má právo na osobní schůzku 1× za 12 kalendářních měsíců, na které je mu prezentován přehled stávajícího portfolia produktů a majetku a plnění finančních cílů. Podle informací sdělených Odběratelem jsou na schůzce aktualizovány finanční cíle Odběratele, jeho cashflow a podklady pro finanční plán."
  },
  {
    link:"dlePotreby",
    title: "Aktualizace finančního plánu dle potřeby",
    description: "Poskytovatel asistuje Odběrateli při řešení otázek týkajících se jeho finanční situace a celkového majetku. Odběratel má kdykoli dle své potřeby, maximálně 1x za 3 měsíce, právo na osobní schůzku, na které je mu prezentován přehled stávajícího portfolia produktů a majetku a plnění finančních cílů. Podle informací sdělených Odběratelem jsou na schůzce aktualizovány finanční cíle Odběratele, jeho cashflow a podklady pro finanční plán."
  },
  {

    link:"14roku",
    title: "Přehled změn finančního majetku 1× za 3 měsíce",
    description: "Odběrateli je předložen v časovém horizontu 1× za 3 měsíce aktuální přehled stavu produktů a naspořených finančních prostředků ve srovnání s minulým obdobím."
  },
  {
    link:"admin",
    title: "Komplexní zpracování administrativy",
    description: "Poskytovatel poskytuje Odběrateli administrativní činnosti související s jeho majetkem; např. získání příslušných formulářů a podkladů k vyplnění Odběratelem, administrativní zpracování a zaslání potřebných dokumentů na jednotlivé instituce a zároveň vedení evidence odeslané dokumentace pro případné reklamace ve vztahu k institucím. U spotřebitelských úvěrů má Odběratel právo na bezplatné zpracování administrativy související s těmi spotřebitelskými úvěry, u kterých Poskytovatel obdržel odměnu přímo od jejich poskytovatelů."
  },
  {
    link:"krizPlan",
    title: "Krizový plán pro rodinu",
    description: "Odběrateli je vypracován krizový plán pro rodinu pro případ nenadálé události, který obsahuje přehled a evidenci jeho významného movitého a nemovitého majetku, (dlouhodobých) pohledávek, závazků a souvisejícího finančního portfolia. Odběrateli je sestaven plán řešení nenadálé události s ohledem na likviditu jednotlivých aktiv, předpokládané budoucí příjmy rodiny a uspokojení jejích potřeb (zejm. nezbytných provozních nákladů). Poskytovatel se zavazuje poskytnout svou asistenci v případě událostí spojených s výpadkem příjmu, sestavení evidence finančního majetku a ekonomických návrhů pro úspěšné vyřešení situace."
  },
  {
    link:"pojOdb",
    title: "Obecná konzultace s pojišťovacími odborníky",
    description: "Odběratel může využít možnosti získat všeobecné informace týkající se oblasti pojištění."
  },
  {
    link:"zpravy",
    title: "Mimořádné zprávy",
    description: "Padají akcie, v novinách píší o krizi či vyvstanou ve finančním světě jiné nenadálé situace, při všech těchto příležitostech obdrží Odběratel od Poskytovatele zprávu se stručným vysvětlením aktuálního dění. Odběratel má rovněž právo na konzultaci s Poskytovatelem (dle domluvy telefonickou/on-line/osobní) k podrobnějšímu rozebrání aktuální situace."
  },
  {
    link:"konzultace",
    title: "Konzultace s realitními odborníky",
    description: "Poskytovatel zajistí na podnět Odběratele konzultaci s realitními odborníky v širokém spektru otázek týkajících se realitního trhu. V rámci toho může být Odběrateli poskytnuta např. obecná konzultace pro soukromé účely, konzultace týkající se koupě/prodeje/pronájmu nemovitosti, zprostředkování prodeje/pronájmu nemovitosti, odborná konzultace na téma realit, konzultace nad developerskými projekty, informace o aktuální situaci na trhu s realitami, přehled cen na trhu s nemovitostmi a jejich vývoj atp."
  },
  {
    link:"pomoc",
    title: "Pomoc v oblasti investičních nemovitostí",
    description: "Poskytovatel zajistí na podnět Odběratele plán a časový horizont pro pořízení vhodné nemovitosti. V obecné rovině sestaví pro Odběratele postup pro pořízení nemovitosti pomocí finanční páky a informuje Odběratele o možných způsobech financování koupě této nemovitosti. Poskytovatel dále zajistí distribuci poptávky Odběratele po hodících se nemovitostech v rozsáhlé síti partnerů Poskytovatele zabývajících se realitami, kteří budou pro Odběratele vhodné nemovitosti aktivně vyhledávat. Po koupi nemovitosti Poskytovatel vždy nejpozději do 3 měsíců přepočítá finanční situaci Odběratele, díky čemuž bude Odběratel znát výnosnost a rentabilitu pořízené nemovitosti a možnosti koupě další investiční nemovitosti."
  },
  {
    link:"audit",
    title: "Audit sociálního zabezpečení",
    description: "Poskytovatel zajistí Odběrateli vydání informativního osobního listu důchodového pojištění a na základě údajů v tomto dokumentu uvedených provede analýzu stavu důchodového pojištění Odběratele a revizi, jakož i případné doplnění, evidence důchodového pojištění Odběratele u České správy sociálního zabezpečení. Poskytovatel na základě uvedené analýzy dále vypočítá, jak by vypadaly přesné nároky Odběratele v případě výplaty dávek důchodů ze státního systému (nyní i v budoucnu), a poskytne Odběrateli srovnání s optimálnějším nastavením plateb soukromého zabezpečení na penzi pro maximalizaci nároků plynoucích ze státního důchodového zabezpečení. Při zjištěném přepojištění nebo podpojištění Odběratele mu Poskytovatel poskytne srovnání s optimálnějším nastavením dávek soukromého zabezpečení penze tak, aby byly platby pojistného vydávány skutečně efektivně a v budoucnu byl eliminován pokles životní úrovně Odběratele a riziko jeho neschopnosti splácení závazků."
  },
  {
    link:"webWor",
    title: "Webináře a Workshopy",
    description: "Odběratel má právo zúčastnit se 1x ročně webináře nebo workshopu nabízeného v seznamu vzdělávacích akcí aktuálně pořádaných Poskytovatelem a s ním spolupracujícími subjekty, a to dle vlastního výběru Odběratele. Webináře a workshopy se zaměřují na řadu rozmanitých témat ze světa financí, finančního trhu a sebevzdělávání v oblasti finanční gramotnosti a vlastní správy financí."
  },
  {
    link: "asis",
    title: "Asistence při řešení pojistných událostí",
    description: "Poskytovatel zajistí na podnět Odběratele kvalifikované zhodnocení podmínek pojistné události Odběratele, případně osob jemu blízkých (za stanovených podmínek), z hlediska pojistné smlouvy, a to za účelem posouzení likvidity nároku na pojistné plnění a jeho případnou výši. Pokud by bylo takové zhodnocení podmínek pro svůj rozsah již pomocí při uplatňování práv z pojištění nebo by měl Odběratel zájem o odbornou pomoc při nahlášení takové pojistné události u pojišťovny a/nebo vymáhání nároků z takové pojistné události, zajistí Poskytovatel Odběrateli uvedené regulované služby u spolupracujícího specializovaného subjektu (advokáta nebo pojišťovacího makléře). Poskytovatel tak učiní se vším, co bude v jeho možnostech a je nezbytné pro likvidaci pojistné události (tzn. včetně komunikace s pojišťovnou a/nebo doložení potřebných podkladů, bude-li je mít k dispozici). Odběratel je povinen poskytovat Poskytovateli veškerou součinnost potřebnou k řádnému poskytnutí této služby, a to hlavně řádným a včasným doložením úplných podkladů."
  }
]
  const sections = [
    {
    header: "DLOUHODOBÝ INVESTIČNÍ PRODUKT",
    text: "Využijte daňových úlev až 7 200 Kč díky novému DIP! Získejte příspěvek od zaměstnavatele až 50 000 Kč ročně. Ušetřete nejen sobě, ale i své firmě – začněte hned!",
    image: "/images/gallery.jpg",
    flex: "flex-row",
    bg: "primary",
    color: "black",
    ref: sec,
    isInV: isInView ,
      btnText: "Více",
        btnLink: "/clanky/vse-co-potrebujete-o-dipu-vedet",
    },
    {
        header: "ZAJIŠTĚNÍ SVÉHO PŘÍJMU",
        text: "Bez příjmu není budoucnost – zajistěte si ho včas! Chraňte sebe, svou rodinu i plány, na kterých vám záleží. Nejdřív jistota, potom spoření a investice. Začněte budovat finanční stabilitu správným krokem!",
        image: "/images/gallery3.jpg",
        flex: "flex-row-reverse",
        bg: "secondary",
        color: "primary",
        ref: sec2,
        isInV: isInView2,
        btnText: "Poraďte se",
        btnLink: "/sluzby/#contact",
    }
];
  const plans = [
    { name: "Standart se slevou", price: "300 Kč", yrlPrice:  "3300 Kč"},
    { name: "Standard", price: "499 Kč", yrlPrice:  "6500 Kč" },
    { name: "Premium", price: "890 Kč", yrlPrice:  "10900 Kč" },
  ]

  const features = [
    { name: "garance EUCS",info: "eucs", basic: false, pro: true, enterprise: true },
    { name: "Aktualizace finančního plánu 1 ročně", info: "akt",basic: false, pro: false, enterprise: true },
    { name: "Aktualizace finančního plánu 1x za 24 měšíců", info: "aktualizace",basic: true, pro: true, enterprise: false },
    { name: "Aktualizace finančního plánu", info: "finakt",basic: false, pro: true, enterprise: false },
    { name: "Aktualizace finančního plánu dle potřeby", info: "dlePotreby",basic: false, pro: false, enterprise: true },
    { name: "Přehled změn finančního majetku", info: "finmat",basic: false, pro: true, enterprise: true },
    { name: "Přehled změn finančního majetku 1/4 rok", info: "14roku",basic: false, pro: false, enterprise: true },
    { name: "Analýza finančního portfolia", info: "analyza",basic: false, pro: true, enterprise: true },
    { name: "Aktualizace portfolia pojistných smluv ", info: "aktPpp",basic: false, pro: true, enterprise: true },
    { name: "Aktualizace portfolia úvěrů", info: "aktUv",basic: false, pro: true, enterprise: true },
    { name: "Aktualizace portfolia investic",info: "aktIn", basic: false, pro: true, enterprise: true },
    { name: "Komplexní zpracování administrativy", info: "admin",basic: false, pro: false, enterprise: true },
    { name: "Hlášení pojistných událostí", info: "hlaseni",basic: false, pro: true, enterprise: true },
    { name: "Krizový plán pro rodinu", info: "krizPlan",basic: false, pro: false, enterprise: true },
    { name: "Obecná konzultace pojišťovacími odborníky", info: "pojOdb",basic: false, pro: false, enterprise: true },
    { name: "Obecná konzultace úvěrovými odborníky", info: "uvery",basic: false, pro: true, enterprise: true },
    { name: "Obecná konzultace investičními odborníky", info: "investOdb",basic: false, pro: true, enterprise: true },
    { name: "Obecná konzultace s finančními odborníky pro soukromé účely", info: "privacy",basic: false, pro: true, enterprise: true },
    { name: "Poradce na telefonu ", info: "foun",basic: false, pro: true, enterprise: true },
    { name: "Přednostní odbavení", info: "odbaveni",basic: false, pro: true, enterprise: true },
    { name: "On-line finanční aktuality",info: "onAkt", basic: true, pro: true, enterprise: true },
    { name: "Mimořádné zprávy", info: "zpravy",basic: false, pro: false, enterprise: true },
    { name: "On-line archivace produktové dokumentace", info: "prodDoc",basic: false, pro: true, enterprise: true },
    { name: "Archivace produktové dokumentace", info: "doc",basic: false, pro: true, enterprise: true },
    { name: "Konzultace s realitními odborníky", info: "konzultace",basic: false, pro: false, enterprise: true },
    { name: "Pomoc v oblasti investičních nemovitostí", info: "pomoc",basic: false, pro: false, enterprise: true },
    { name: "Audit socialního zapezpečení", info: "audit",basic: false, pro: false, enterprise: true },
    { name: "Webinář a Workshopy ", info: "webWor",basic: false, pro: false, enterprise: true },
    { name: "Služby optimalizace výdajů domácnosti", info: "domacnosti",basic: true, pro: true, enterprise: true },
    { name: "Asistence při řešení pojistných údálostí", info: "asis",basic: false, pro: false, enterprise: true },
  ]

    
  return (
    <>
   
    {sections.map((s,i) => ( 
     
      <motion.section
      ref={s.ref}
      key={i}
          className={`bg-${s.bg} p-8 lg:p-16  text-${s.color}`}>
          <div className={`flex flex-wrap sm:flex-nowrap sm:${s.flex} w-full border-secondary-background border-2 rounded-xl p-3`}>
          <div className="w-full sm:w-1/2 flex flex-col  px-5 justify-center font-light">
              <motion.div 
              initial={{opacity:0, x: -600}}
              animate={s.isInV?{opacity: 1, x:0}: {}}
              exit={{opacity: 0, x: -600}}
              transition={{duration: 0.4}}
              className=" flex flex-col w-full space-y-4 my-3">
                      <h2
                      className={`text-3xl lg:text-5xl  text-left font-ibarra`}>
                          {s.header}
                      </h2>
                  <div className={` text-justify lg:text-left text-xl`}>
                      <p>{s.text}</p>
                  </div>
                  <Link href={s.btnLink} className="mx-auto">
                                <Button size={"lg"}
                                >
                                    {s.btnText}
                        </Button>
                    </Link>
              </motion.div>
          </div>
          <motion.div 
          initial={{opacity:0, x: 600}}
          animate={s.isInV?{opacity: 1, x:0}: {}}
          exit={{opacity: 0, x: 600}}
          transition={{duration: 0.4}}
          className={`w-full sm:w-1/2 flex md:justify-center items-center`}>
              <Image src={s.image} alt="Sjednejte si pojištění" width={512} height={512} className="object-fill bg-cover  hover:shadow-xl hover:shadow-secondary-foreground rounded-xl transition ease-in-out delay-100 duration-200" />
          </motion.div>
          </div>
      </motion.section> 

  ))}
    <div ref={text} className="bg-primary min-h-screen flex flex-col justify-center p-4 space-y-5" id="cenik">
    <h2 
    className="underline underline-offset-4 decoration-secondary-background font-ibarra md:text-left font-bold tracking-wide  text-4xl ">Placené poradenství</h2>
    <h3 
    className=" font-ibarra md:text-left font-bold tracking-wide  text-xl">🔒 Dlouhodobá důvěra, profesionální péče o váš majetek </h3>
    <p 
    
    className="text-base  font-light text-justify md:text-left text-black">Díky mým dlouholetým zkušenostem klienti ví, že se na mě mohou spolehnout – i když sami nemají čas vše sledovat. Chtějí mít kontrolu nad svým majetkem, ale zároveň partnera, který sleduje změny, hlídá detaily a přichází s řešeními. Proto využívají placené poradenství, které jim poskytuje jistotu, klid a VIP přístup ke správě financí. 

    Ať už spravujete majetek do 1 milionu korun, nebo jste manažer či ředitel firmy s portfoliem v řádech milionů – mám pro vás řešení. </p>
    <h3 
    className=" font-ibarra md:text-left font-bold tracking-wide  text-xl">🧩 Co získáte díky placenému poradenství? </h3>
    <ul className="list-disc mx-5 space-y-1">
      <li><span className="font-bold">Pravidelnou péči a kontrolu nad majetkem </span>– minimálně jednou ročně projdeme aktuální hodnotu a úpravy plánu </li>
      <li><span className="font-bold">Aktualizaci finančního plánu a konzultace zdarma</span></li> 

      <li><span className="font-bold">Měsíční aktuality z trhu</span> a přehled novinek bez složitého hledání</li> 

      <li><span className="font-bold">Snížení poplatků u investic </span></li>

      <li><span className="font-bold">Online archivaci smluv, </span>přístup k přehledné majetkové tabulce a hlídání klíčových termínů</li> 

      <li><span className="font-bold">Garanci odpovědi na vaše dotazy do druhého dne </span></li>

      <li><span className="font-bold">Hlášení pojistných událostí přes službu EUCS</span>, včetně právního servisu – bez stresu, bez zdržení </li>
      
    </ul>
    <h3 
    className=" font-ibarra md:text-left font-bold tracking-wide  text-xl">🧭 Vyberte si ze 3 variant poradenství:  </h3>
    <ul className="list-decimal mx-5 space-y-1">
      <li><span className="font-bold">Základní balíček</span> – ideální pro aktivní jednotlivce i rodiny </li>
      <li><span className="font-bold">Rozšířený servis </span>– pro náročnější klienty s vyšším objemem financí </li> 

      <li><span className="font-bold">VIP správa</span> – pro ty, kteří chtějí plný komfort, individuální přístup a maximální efektivitu </li>    
    </ul>
         <p>👉 Posuňte správu svého majetku na vyšší úroveň. Staňte se klientem s profesionální péčí, která šetří čas, peníze i starosti. 

 
<br/>
<span className="font-bold">Pokud vás tato nabídka zaujala, neváhejte se ozvat – rád vám vše osobně představím.</span></p>  
      <div className="w-full max-w-6xl mx-auto items-center bg-secondary text-primary rounded-lg overflow-y-visible">
        <div className="grid grid-cols-4 gap-4 p-6 items-end">
          <div className="text-left font-bold">Tarif</div>
          {plans.map((plan) => (
            <div key={plan.name} className="text-center">
              <h3 className="text-sm sm:text.lg font-bold mb-2">{plan.name}</h3>
              
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 p-6 items-end">
          <div className="text-left font-bold">Měsíční cena</div>
          {plans.map((plan) => (
            <div key={plan.name} className="text-center">
              <h3 className="text-sm sm:text.lg font-bold mb-2">{plan.price}</h3>
              
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 p-6 items-end">
          <div className="text-left font-bold">Roční cena</div>
          {plans.map((plan) => (
            <div key={plan.name} className="text-center">
              <h3 className="text-sm sm:text.lg font-bold mb-2">{plan.yrlPrice}</h3>
              
            </div>
          ))}
        </div>
        <div className="bg-primary-foreground">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`grid grid-cols-4 gap-4 p-4 ${index % 2 === 0 ? "bg-secondary/90" :"bg-secondary" }`}
            >
              <div className="text-left">{feature.name} <Link href={`/sluzby#${feature.info}`}><div className="bg-white w-5 h-5 rounded-full flex flex-col items-center text-black">i</div></Link></div>
              {[feature.basic, feature.pro, feature.enterprise].map((included, i) => (
                <div key={i} className="flex justify-center items-center">
                  {included ? (
                    <Check className="text-secondary-background h-6 w-6" />
                  ) : (
                    <X className="text-primary-foreground h-6 w-6" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Popis služeb</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Kompletní přehled finančních služeb a poradenství pro naše klienty
        </p>
      </header>

      <main className="grid xl:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <section id={service.link} key={index} className="bg-primary-foreground p-5 rounded-lg  flex w-full flex-col space-y-4  hover:shadow-lg hover:shadow-secondary-background transition ease-in-out delay-100 duration-200">
            <h2 className="text-xl font-semibold mb-3 underline underline-offset-4 decoration-secondary-background">{service.title}</h2>
            <p className="text-muted-foreground">{service.description}</p>
          </section>
        ))}
      </main>
    </div>
         
          <CalendlyPop />
          <section className="flex flex-col w-full p-8 space-y-8 bg-primary-foreground" id="contact">
            <h2 className="underline decoration-secondary-background underline-offset-4 font-ibarra font-bold tracking-wide  text-4xl lg:text-5xl">Kontaktujte mě</h2>
            <p className="text-base lg:text-xl font-light text-left">Zanechte mi na sebe kontakt a já se Vám obratem ozvu. Nebo si vyberte termín schůzky z <a href="#calendly" className="underline underline-offset-2">kalendáře</a>.</p>
            <Contact />
            </section>
    </>
  )
}

export function ReviewsComp({reviews}: {reviews: Reviews[]}){
  return(
    <section className="overflow-x-hidden flex flex-col w-full pt-20 p-5 lg:p-16 bg-gradient-to-b from-secondary-background/30 via-transparent to-secondary/25 " style={{clipPath: 'polygon(0 0, 100% 70px, 100% 100%, 0 100%)'}} >
            <div className="max-w-8xl w-full  mx-auto flex flex-col space-y-8">
            <h2 className="font-medium tracking-wide text-4xl sm:text-5xl">Recenze <span className="font-bold underline underline-offset-4 decoration-secondary-background block sm:inline">mých klientů</span> </h2>
            <p className="text-base sm:text-lg md:leading-8 text-wrap font-light  text-justify md:text-left ">Naši investoři jsou úspěšní lidé z řad podnikatelů, vrcholových manažerů či specialistů na světové úrovni, např. z oblasti IT.  Jejich úspěch je spojen s nabytým majetkem v hodnotě desítek či stovek milionů korun. Péči o takový majetek chtějí svěřit profesionálům. Od nás očekávají, že jim majetek pomůžeme ochránit před zbytečnými riziky, zhodnotíme ho pár procent nad inflaci, zajistíme jim čerpání nekonečné renty a připravíme majetek pro budoucí mezigenerační přenos.</p>  
              <Slider slides={reviews} />
            </div>
          </section>
  )
}