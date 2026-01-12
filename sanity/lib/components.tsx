import Link from "next/link";
import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { dataset, projectId } from "../env"
import { urlForImage } from "./image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
export const components: Partial<PortableTextComponents> = {
    list: {
        bullet: ({ children }) => <ul className="mt-xl text-lg">{children}</ul>,
        number: ({ children }) => <ol className="mt-lg text-lg">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li style={{ listStyleType: 'disc' }}>{children}</li>,
    },
    
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-bold">{children}</h4>,
        h5: ({ children }) => <h5 className="font-lg">{children}</h5>,
        h6: ({ children }) => <h6 className="font-lg">{children}</h6>,
        blockquote: ({ children }) => <blockquote className="border-l-secondary-background">{children}</blockquote>,
        normal: ({children}) => <span className="text-lg">{children}</span>
    },
    marks: {
        em: ({ children }) => <em className="text-lg font-semibold">{children}</em>,
        strong: ({ children }) => <span className="text-lg font-bold">{children}</span>,
        u: ({ children }) => <span className="text-lg text-underline">{children}</span>,
        strike: ({ children }) => <s className="text-lg font-bold">{children}</s>,
        link: ({ children, value }) => {
            const ytb: boolean = value.href.startsWith("https://www.youtube.com/embed/");
            if (ytb) return <iframe src={value?.href} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="mx-auto w-full lg:w-1/2 h-96"></iframe>
            else return <Link target="_blank" href={value?.href} className="underline text-secondary-foreground text-lg">{children}</Link>
        },
        
    },
    types: {
        image: ({ value }: { value: any }) => (
          <div className="w-full flex flex-col my-10">
              <Dialog >
          <DialogTrigger className="mx-auto">
              <Image
  src={urlForImage(value)}
  alt={value.asset._ref}
  width={700}
  height={700}
  className="rounded-lg min-h-[44rem] min-w-[44rem] mx-auto"
/>
<span className="underline underline-offset-4 decoration-3 decoration-secondary-background font-semibold">Pro detail rozklikněte obrázek</span>
          </DialogTrigger>
          <DialogContent className="max-w-3xl bg-white">
            <DialogTitle className="sr-only">Obrázek</DialogTitle>
            <Image
  src={urlForImage(value)}
  alt={value.asset._ref}
  width={800}
  height={800}
  className="rounded-lg w-full mx-auto"
/>
          </DialogContent>
         </Dialog>
          </div>
         
       
        ),
        file: ({ value }: { value: any }) => {
            const videoUrl = value.asset?._ref
              ? `https://cdn.sanity.io/files/${projectId}/${dataset}/${value.asset._ref.split('-')[1]}.${value.asset._ref.split('-')[2]}`
              : null;
        
            return videoUrl ? (
              <video controls className="rounded-lg border-secondary-foreground mx-auto w-[30rem]">
                <source src={videoUrl} type="video/mp4" />
                Váš prohlížeč nepodporuje HTML Element video.
              </video>
            ) : (
              <p>Invalid video asset</p>
            );
        }
      },
}