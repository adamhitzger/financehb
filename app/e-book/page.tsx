import EbookForm from "@/components/ebookForm";
import { sanityFetch } from "@/sanity/lib/client"
import { components } from "@/sanity/lib/components";
import { EBOOK_QUERY } from "@/sanity/lib/queries"
import { Ebook } from "@/types"
import { PortableText } from "next-sanity";
import Image from "next/image";
export default async function EbookPage() {
    const ebook = await sanityFetch<Ebook>({ query: EBOOK_QUERY });
    console.log(ebook);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between space-y-4">
            <section className="flex flex-col w-full p-8 space-y-20">
                <h2 className="font-ibarra  font-bold tracking-wide text-secondary-foreground text-5xl md:text-6xl">Stáhněte si e-book</h2>
                <div className=" w-full flex flex-col-reverse  md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 rounded-xl my-10 md:my-0 flex flex-col justify-between shadow-xl bg-primary-foreground p-8 space-y-12 text-xl font-light">
                        {ebook.heading ? <span className="text-2xl font-medium">{ebook.heading}</span> : null}
                        {ebook.text ? <PortableText value={ebook.text} components={components} /> : null}
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center space-x-0.5">
                        <div className="px-1 bg-black skew-x-4 h-auto">
                        </div>
                        <Image src={ebook.picture} alt={ebook.picture} width={300} height={280} className="object-fill bg-cover skew-x-4 " />
                    </div>
                </div>

                <div className="w-full md:w-4/5 flex flex-col space-y-2 p-5 bg-secondary rounded-xl text-primary mx-auto">
                    <div className="w-full flex flex-col space-y-2 text-center">
                        <p className="font-light text-2xl">Rádi byste se dozvěděli, jak si nejlépe zajistit svojí budoucnost? Vyplňte formulář a stáhněte si E-BOOK ZDARMA!</p>
                    </div>
                    <EbookForm file={ebook.file} />
                </div>
            </section>
        </main>
    )
}
