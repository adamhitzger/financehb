
import SignInForm from '@/components/signInForm'
import Link from 'next/link'
import React from 'react'

export default function LogInPage() {

    return (
        <main className='w-full min-h-screen flex flex-col justify-center items-center'>
            <section className='w-full p-8 flex flex-col items-center rounded-xl space-y-4'>
                <SignInForm />
                <div className='w-full flex flex-col text-center'>
                    <span className='text-2xl'>Máte již účet?</span>
                    <Link className='text-2xl underline underline-offset-2' href={"/log-in"}>Přihlaste se</Link>
                </div>
            </section>

        </main>
    )
}