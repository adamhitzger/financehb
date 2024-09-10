
import { UpdatePass } from '@/components/updatePass'
import React from 'react'

export default function UpdateForgotPass() {

    return (
        <main className='w-full min-h-screen flex flex-col justify-center items-center'>
            <section className='w-full p-8 flex flex-col items-center rounded-xl space-y-4'>
                <UpdatePass />
            </section>
        </main>
    )
}