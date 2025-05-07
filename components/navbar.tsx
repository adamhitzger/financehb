"use client"
import { navLinks } from "@/constants"
import { Links, DBUser, FullUser } from '@/types'
import React from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar({user}: {user : FullUser | null| undefined}) {
       console.log(user)
    return (
        <nav className='pr-6 w-full flex text-primary items-center justify-between flex-row bg-secondary border-b-secondary-foreground border-b'>
            <Link href={"/"} className='self-start'>
                <Image  src={"/logo.png"} alt='Logo Financehb.cz' width={220} height={1028}/>
            </Link>
       
            <div className='space-x-5 py-7 text-xl hidden lg:flex'>
                {navLinks.map((l: Links, i: number) => (
                    <a key={i} href={l.route}>
                        {l.name}
                    </a>
                ))}
            </div>
            {user && user.first_name && user.last_name ? (
                <Link href={"/user"} className='underline underline-offset-2 text-2xl hidden lg:flex'>{`${user.first_name ?? ""} ${user.last_name ?? ""}`}</Link>
            ) : (
                <Link href={"/log-in"}><Button variant={"default"} className='font-medium text-lg hidden lg:inline-flex'>Přihlásit se</Button></Link>
            )}
            <div className='flex lg:hidden '>
                <Sheet >
                    <SheetTrigger aria-roledescription='dialog' aria-label="Open menu"><Menu width={36} height={36} /></SheetTrigger>
                    <SheetContent side={"right"}>
                        <div className='gap-5 w-full text-2xl  font-light text-black flex flex-col justify-center h-full '>
                            {navLinks.map((l: Links, i: number) => (
                                <div key={i}>
                                    <li >
                                        <a href={l.route}>{l.name}</a>
                                    </li>
                                </div>
                            ))}
                            {user && user.first_name && user.last_name ? (
                                <Link href={"/user"} className='underline underline-offset-2 text-xl'>{`${user.first_name ?? ""} ${user.last_name ?? ""}`}</Link>
                            ) : (
                                <Link href={"/log-in"}><Button variant={"default"} size={"lg"} className='font-medium text-lg'>Přihlásit se</Button></Link>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
