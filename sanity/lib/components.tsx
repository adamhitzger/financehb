import Link from "next/link";
import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { urlForImage } from "./image";
import { dataset, projectId } from "../env"
export const components: Partial<PortableTextComponents> = {
    list: {
        bullet: ({ children }) => <ul className="mt-xl">{children}</ul>,
        number: ({ children }) => <ol className="mt-lg">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li style={{ listStyleType: 'disclosure-closed' }}>{children}</li>,
    },
    block: {
        h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-bold">{children}</h3>,
        h4: ({ children }) => <h4 className="text-lg font-bold">{children}</h4>,
        h5: ({ children }) => <h5 className="font-bold">{children}</h5>,
        h6: ({ children }) => <h6 className="font-bold">{children}</h6>,
        blockquote: ({ children }) => <blockquote className="border-l-purple-500">{children}</blockquote>,
    },
    marks: {
        em: ({ children }) => <em className=" font-semibold">{children}</em>,
        strong: ({ children }) => <span className=" font-bold">{children}</span>,
        u: ({ children }) => <span className="text-underline">{children}</span>,
        strike: ({ children }) => <s className=" font-bold">{children}</s>,
        link: ({ children, value }) => {
            const ytb: boolean = value.href.startsWith("https://www.youtube.com/embed/");
            if (ytb) return <iframe src={value?.href} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="mx-auto h-96"></iframe>
            else return <Link href={value?.href} className="underline text-secondary-foreground">{children}</Link>
        }
    },
    types: {
        image: ({ value }: { value: any }) => (
          <Image
            src={value?.asset?._ref}
            alt={value}
            className="rounded-lg w-96 mx-auto"
          />
        ),
        file: ({ value }: { value: any }) => {
            const videoUrl = value.asset?._ref
              ? `https://cdn.sanity.io/files/${projectId}/${dataset}/${value.asset._ref.split('-')[1]}.${value.asset._ref.split('-')[2]}`
              : null;
        
            return videoUrl ? (
              <video controls className="rounded-lg border-secondary-foreground mx-auto h-96">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Invalid video asset</p>
            );
        }
      },
}