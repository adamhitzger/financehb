"use client"
import { UpdatePass } from '@/components/updatePass'

export default function UpdateForgotPass() {

    return (
        <main className='w-full min-h-screen p-4 flex flex-col justify-center items-center'>
            <section className='w-full flex flex-col items-center rounded-xl space-y-4'>
                <UpdatePass />
            </section>
        </main>
    )
}