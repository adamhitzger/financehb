"use client"
import FullInForm from '@/components/fullInForm'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default function FullUpPage() {

    return (
        <main className='w-full min-h-screen flex flex-col justify-center items-center'>
            <section className='w-full flex  p-4 flex-col items-center rounded-xl space-y-4'>
                <Suspense>
                <FullInForm />
                </Suspense>
                <div className='w-full flex flex-col text-center'>
                    <span className='text-lg'>Máte již účet?</span>
                    <Link className='text-lg underline underline-offset-2' href={"/log-in"}>Přihlaste se</Link>
                </div>
            </section>
        </main>
    )
}