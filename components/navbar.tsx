"use client"
import { navLinks } from '@/constants'
import { Links } from '@/types'
import React from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useGetUser } from '@/auth/client'

export default function Navbar() {
    const user = useGetUser();
    return (
        <nav className='w-full p-7 flex text-primary items-center justify-between flex-row bg-secondary '>
            <Link href={"/"}>
                <div className='w-fit p-3  bg-secondary-foreground font-extrabold text-2xl tracking-wider'>
                    FINANCE<span className='text-secondary'>HB</span>.cz
                </div>
            </Link>
            <div className='space-x-5 text-xl hidden lg:flex'>
                {navLinks.map((l: Links, i: number) => (
                    <a key={i} href={l.route}>
                        {l.name}
                    </a>
                ))}
            </div>
            {user && user.name && user.surname ? (
                <Link href={"/user"} className='underline underline-offset-2 text-2xl hidden lg:flex'>{`${user.name ?? ""} ${user.surname ?? ""}`}</Link>
            ) : (
                <Link href={"/log-in"}><Button variant={"default"} className='p-5 font-semibold text-lg hidden lg:inline-flex'>Přihlásit se</Button></Link>
            )}
            <div className='flex lg:hidden'>
                <Sheet >
                    <SheetTrigger><Menu width={36} height={36} /></SheetTrigger>
                    <SheetContent side={"right"}>
                        <div className='gap-5 w-full text-3xl underline underline-offset-4 font-light text-primary flex flex-col justify-center h-full '>
                            {navLinks.map((l: Links, i: number) => (
                                <div key={i}>
                                    <a href={l.route}>
                                        {l.name}
                                    </a>
                                </div>
                            ))}
                            {user && user.name && user.surname ? (
                                <Link href={"/user"} className='underline underline-offset-2 text-2xl'>{`${user.name ?? ""} ${user.surname ?? ""}`}</Link>
                            ) : (
                                <Link href={"/log-in"}><Button variant={"default"} className='p-5 font-semibold text-lg'>Přihlásit se</Button></Link>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
