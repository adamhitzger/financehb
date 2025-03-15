import EbookForm from "@/components/ebookForm";
import { sanityFetch } from "@/sanity/lib/client"
import { EBOOK_QUERY } from "@/sanity/lib/queries"
import { Ebook } from "@/types"

export default async function EbookPage() {
    const ebook = await sanityFetch<Ebook>({ query: EBOOK_QUERY });
    console.log(ebook);
    return (   
        <EbookForm ebook={ebook} />                                 
    )
}
