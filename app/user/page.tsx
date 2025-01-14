import React from 'react'
import { getUser } from '@/auth/server';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChangeDetails } from '@/components/modals/changeDetails';
import { Delete, SignOut } from '@/components/userbuttons';
import { ChangePass } from '@/components/modals/changePass';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createSupabaseClient } from '@/auth/server';
import SubInfoForm from '@/components/subInfoForm';
export default async function UserPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const client = await createSupabaseClient();
    const user = await getUser();
    const searchParams = await props.searchParams
    const changeDetails =  searchParams?.details;
    const changePass =  searchParams?.pass
    const { data, error } = await client.from("subscriptions").select("status").eq("user_id", user?.id).single();
    console.log(data)
    if(error) console.log(error.message)
    console.log(user?.raynet_id)

    return (
        <main className="flex min-h-screen flex-col items-center py-8 justify-between space-y-4">
            <section className="flex flex-col w-full p-8 space-y-8">
                <h2 className="font-ibarra  font-bold  text-secondary-foreground text-3xl lg:text-5xl">{`Profil: ${user?.name} ${user?.surname}`}</h2>
                <hr className="w-full border-secondary border-2" />
                <div className='w-full flex flex-col md:flex-row gap-4'>
                    <div className='bg-primary-foreground rounded-xl w-full flex flex-col p-5 shadow-xl space-y-4'>
                        <h3 className='text-4xl font-bold'>Osobní údaje</h3>
                        <Input defaultValue={user?.name} readOnly/>
                        <Input defaultValue={user?.surname} readOnly/>
                        <Input defaultValue={user?.email} readOnly/>
                        <div className='grid grid-cols-1 grid-rows-4 gap-5 md:grid-cols-2 mdgrid-rows-2'>
                            <Link href={"/user?details=true"}>
                                <Button variant={"secondary"} size={"lg"}>Změnit údaje</Button>
                            </Link>
                            <Link href={"/user?pass=true"}>
                                <Button variant={"secondary"} size={"lg"}>Změnit heslo</Button>
                            </Link>
                            <SignOut />
                            {user && user?.id &&
                                <Delete id={user.id} raynet_id={user.raynet_id}/>
                            }

                            {changeDetails && <ChangeDetails id={user?.id} name={user?.name} surname={user?.surname} email={user?.email} />}
                            {changePass && <ChangePass />}
                        </div>
                    </div>
                </div>
                {data?.status === "active"
                    && user?.stripeId &&
                    <Card className="w-full bg-primary-foreground shadow-lg shadow-secondary-foreground">
                        <CardHeader>
                            <CardTitle>Aktivní předplatné</CardTitle>
                            
                        </CardHeader>
                        <CardContent>
                           <SubInfoForm stripeId={user.stripeId}/>

                        </CardContent>
                    </Card>

                }
            </section>
        </main>
    )
}

