"use client"
import FullInForm from '@/components/fullInForm'
import React, { Suspense } from 'react'

export default function FullUpPage() {

    return (
        <main className='w-full min-h-screen flex flex-col justify-center items-center'>
            <section className='w-full flex  p-4 flex-col items-center rounded-xl space-y-4'>
                <Suspense>
                <FullInForm />
                </Suspense>
            </section>
        </main>
    )
}