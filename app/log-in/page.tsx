import LogInForm from '@/components/logInForm'
import { ForgotPass } from '@/components/modals/forgotPass';
import Link from 'next/link'
import React from 'react'

export default async function LogInPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const searchParams = await props.searchParams
    const forgotPass = searchParams?.forgot;
    return (
        <main className='w-full min-h-screen flex flex-col justify-center items-center'>
            <section className='w-full p-4 flex flex-col items-center rounded-xl space-y-4'>
                <LogInForm />
                <div className='w-full flex flex-col text-center'>
                    <span className='text-lg'>Zapomeněli jste heslo?</span>
                    <Link className='text-lg underline underline-offset-2' href={"/log-in?forgot=true"}>Obnovte si heslo</Link>
                </div>
                <div className='w-full flex flex-col text-center'>
                    <span className='text-lg'>Nemáte jěště účet?</span>
                    <Link className='text-lg underline underline-offset-2' href={"/sign-in"}>Zaregistrujte se</Link>
                </div>
                {forgotPass && <ForgotPass />}
            </section>

        </main>
    )
}

8