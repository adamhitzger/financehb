import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import CookiesBanner from "@/components/modals/cookiesAllow";
import { sanityFetch } from "@/sanity/lib/client"
import { EBOOK_QUERY } from "@/sanity/lib/queries"
import { Ebook } from "@/types"
import EbookModal from "@/components/modals/ebookModal";
import { getCurrentUser } from "@/database/currentUser";
import {  Poppins } from "next/font/google";

const poppins = Poppins({
     subsets: ["latin"] , 
     variable: "--font-poppins",
     weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});


export const metadata: Metadata = {
  icons: {
    icon: "/logo.png"
  },
  applicationName: "Finance HB",
  generator: "Next.ts",
  title: "Finance HB, správa investic a financí",
  description: "V oboru financí pracuji od roku 1998 tedy více jak 27 let. Specializuji se na investice a rizika v osobních financích. Na mém webu najdete články, ebook, newsletter a můžete si předplatit obsah.",
  authors: [{name: "Adam Hitzger"}, {name: "Petr Krajcigr"}],
  keywords: [
    "správa portfolia ",
    "investice",
    "portfolio management",
    "investiční poradce",
    "finanční plánování",
    "osobní investice",
    " Havlíčkův Brod",
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
  description: "V oboru financí pracuji od roku 1998 tedy více jak 27 let. Specializuji se na investice a rizika v osobních financích. Na mém webu najdete články, ebook, newsletter a můžete si předplatit obsah.",
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
  const userPromise = await getCurrentUser({withFullUser: true})
  const ebookPromise = await sanityFetch<Ebook>({ query: EBOOK_QUERY });
  const [user, ebook] = await Promise.all([
    userPromise,
    ebookPromise
  ])
  return (
    <html lang="cs">
      <head>
      <link
          rel="canonical"
          href="https://www.financehb.cz"
          key="canonical"
        />
      </head>
      <body className={`${poppins.variable} font-poppins  overflow-x-hidden`}>
      <EbookModal ebook={ebook}/>
      <CookiesBanner/>
        <Navbar user={user}/>
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
