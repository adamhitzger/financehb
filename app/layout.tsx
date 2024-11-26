import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { ibarra } from "./font";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  icons: {
    icon: "/images/main.jpg"
  },
  applicationName: "Finance HB",
  generator: "Next.ts",
  title: "Petr Krajcigr, Finance HB",
  description: "V oboru financí pracuji od roku 1998 tedy více jak 24 let. Specializuji se na investice a rizika v osobních financích. Mými klienty jsou převážně manažeři a majitelé firem. Nikdy však neodmítnu pomoc s důležitým finančním rozhodnutím každému, kdo se na mě s důvěrou obrátí. Práce je mou vášní. Proto cílevědomě kombinuji praxi s teorií a mezinárodně uznávaný titul European Financial Advisor (EFA) vnímám jako potvrzení, že jsem na dobré cestě. Pravou motivací pro mě je, když mohu sledovat, jak výsledky mé práce přispívají k naplnění snů mých klientů.",
  authors: [{name: "Adam Hitzger"}, {name: "Petr Krajcigr"}],
  keywords: [
    "správa portfolia Havlíčkův Brod",
    "investice Havlíčkův Brod",
    "portfolio management Havlíčkův Brod",
    "investiční poradce Havlíčkův Brod",
    "peníze na investice Havlíčkův Brod",
    "zhodnocení financí Havlíčkův Brod",
    "finanční plánování Havlíčkův Brod",
    "osobní investice Havlíčkův Brod",
    "dlouhodobé investování Havlíčkův Brod",
    "investiční služby Havlíčkův Brod",
    "portfolio manažer Havlíčkův Brod",
    "finanční poradenství Havlíčkův Brod",
    "zajištění investic Havlíčkův Brod",
    "investiční strategie Havlíčkův Brod",
    "kapitálové trhy Havlíčkův Brod",
    "profesionální správa portfolia Havlíčkův Brod",
    "investice do akcií Havlíčkův Brod",
    "investování s expertem Havlíčkův Brod",
    "finanční nezávislost Havlíčkův Brod",
    "pasivní příjem Havlíčkův Brod",
    "správa investičních fondů Havlíčkův Brod",
    "peníze a investice Havlíčkův Brod",
    "investování pro budoucnost Havlíčkův Brod",
    "kvalitní finanční služby Havlíčkův Brod",
    "investiční příležitosti Havlíčkův Brod"
],
creator: "Adam Hitzger",
        publisher: "Adam Hitzger",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
          },
openGraph: {
  title: "Finance Havlíčkův Brod",
  description: "V oboru financí pracuji od roku 1998 tedy více jak 24 let. Specializuji se na investice a rizika v osobních financích. Mými klienty jsou převážně manažeři a majitelé firem. Nikdy však neodmítnu pomoc s důležitým finančním rozhodnutím každému, kdo se na mě s důvěrou obrátí. Práce je mou vášní. Proto cílevědomě kombinuji praxi s teorií a mezinárodně uznávaný titul European Financial Advisor (EFA) vnímám jako potvrzení, že jsem na dobré cestě. Pravou motivací pro mě je, když mohu sledovat, jak výsledky mé práce přispívají k naplnění snů mých klientů.",
  url: "https://www.financehb.cz",
  siteName: "Finance Havlíčkův Brod",
  locale: "cs_CZ",
  type: "website"
}

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${inter.className} ${ibarra.variable} `}>
        <Navbar />
        {children}
        <Footer />
        <Toaster
          toastOptions={{
            style: {
              textAlign: "center",
            }
          }}
        />
      </body>
    </html>
  );
}
