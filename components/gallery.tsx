"use client";
import Image from "next/image";
import { BentoGrid, BentoGridItem  } from "./ui/bento-grid";

export default function Gallery(){
    function Skeleton({children}: {children: React.ReactNode}){
        return <div className="relative flex flex-1 w-full h-full min-h-[32rem] md:min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">{children}</div>
    }
    const items = [
        {
            header: <Skeleton><Image src={"/images/header-photo.png"} fill={true} className="obejct-fill bg-cover" alt={"Fotogalerie"}/></Skeleton>
        },
        {
            header: <Skeleton><Image src={"/images/header-photo.png"} fill={true} className="obejct-fill bg-cover" alt={"Fotogalerie"}/></Skeleton>
        },
        {
            header: <Skeleton><Image src={"/images/header-photo.png"} fill={true} className="obejct-fill bg-cover" alt={"Fotogalerie"}/></Skeleton>
        },
        {
            header: <Skeleton><Image src={"/images/header-photo.png"} fill={true} className="obejct-fill bg-cover" alt={"Fotogalerie"}/></Skeleton>
        },
        {
            header: <Skeleton><Image src={"/images/header-photo.png"} fill={true} className="obejct-fill bg-cover" alt={"Fotogalerie"}/></Skeleton>
        },
        {
            header: <Skeleton><Image src={"/images/header-photo.png"} fill={true} className="obejct-fill bg-cover" alt={"Fotogalerie"}/></Skeleton>
        },
        {
            header: <Skeleton><Image src={"/images/header-photo.png"} fill={true} className="obejct-fill bg-cover" alt={"Fotogalerie"}/></Skeleton>
        },
    ]
    return(
        <section className="w-full bg-secondary p-16">
            <BentoGrid>
      {items.map((item, i:number) => (
        <BentoGridItem
          key={i}
          header={item.header}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
        </section>
    )
};