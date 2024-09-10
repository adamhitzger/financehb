import React, { useTransition } from 'react'
import { getUser } from '@/auth/server';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import { ChangeDetails } from '@/components/modals/changeDetails';
import { Delete, SignOut } from '@/components/userbuttons';
import { ChangePass } from '@/components/modals/changePass';

export default async function UserPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const user = await getUser();
    const changeDetails = searchParams?.details;
    const changePass = searchParams?.pass

    return (
        <main className="flex min-h-screen flex-col items-center py-8 justify-between space-y-4">
            <section className="flex flex-col w-full p-8 space-y-8">
                <h2 className="  font-bold  text-secondary text-5xl">{`Profil: ${user?.name} ${user?.surname}`}</h2>
                <hr className="w-full border-secondary border-2" />
                <div className='w-full flex flex-col md:flex-row gap-4'>
                    <div className='bg-primary-foreground rounded-xl w-full flex flex-col p-5 shadow-xl space-y-4'>
                        <h3 className='text-4xl font-bold'>Osobní údaje</h3>
                        <Input defaultValue={user?.name} />
                        <Input defaultValue={user?.surname} />
                        <Input defaultValue={user?.email} />
                        <div className='grid grid-cols-1 grid-rows-4 gap-5 md:grid-cols-2 mdgrid-rows-2'>
                            <Link href={"/user?details=true"}>
                                <Button variant={"secondary"} size={"lg"}>Změnit údaje</Button>
                            </Link>
                            <Link href={"/user?pass=true"}>
                                <Button variant={"secondary"} size={"lg"}>Změnit heslo</Button>
                            </Link>
                            <SignOut />
                            {user && user?.id &&
                                <Delete id={user.id} />
                            }

                            {changeDetails && <ChangeDetails id={user?.id} name={user?.name} surname={user?.surname} email={user?.email} />}
                            {changePass && <ChangePass />}
                        </div>
                    </div>
                    <div className='bg-primary-foreground rounded-xl w-full flex flex-col  p-5 shadow-xl space-y-4'>
                        <h3 className='text-4xl font-bold'>Aktivní předplatné</h3>
                        <h4 className='text-2xl font-medium'>K obnově dojde: </h4>
                        <div className='bg-primary rounded-xl w-fit flex flex-col items-center justify-between p-14 shadow-xl space-y-8'>
                            <div className='flex flex-col text-center w-fit text-secondary'>
                                <span className='text-5xl font-medium'>50 Kč</span>
                                <span className='text-xl '>měsíčně</span>
                            </div>

                            <div className='w-fit'>
                                <Link href={"/"}>
                                    <Button variant={"destructive"} size={"lg"}>Přestat odebírat <MoveUpRight /></Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

