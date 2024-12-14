
import SignInForm from '@/components/signInForm'
import Link from 'next/link'
import React from 'react'

export default function SignInPage() {

    return (
        <main className='w-full min-h-screen flex flex-col justify-center items-center'>
            <section className='w-full flex  p-4 flex-col items-center rounded-xl space-y-4'>
                <SignInForm />
                <div className='w-full flex flex-col text-center'>
                    <span className='text-lg'>Máte již účet?</span>
                    <Link className='text-lg underline underline-offset-2' href={"/log-in"}>Přihlaste se</Link>
                </div>
            </section>

        </main>
    )
}