import React from 'react'
import { getUser } from '@/auth/server';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import { ChangeDetails } from '@/components/modals/changeDetails';
import { Delete, SignOut } from '@/components/userbuttons';
import { ChangePass } from '@/components/modals/changePass';
import { stripe } from '@/lib/utils';
import { redirect } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createSupabaseClient } from '@/auth/server';
export default async function UserPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const client = createSupabaseClient();
    const user = await getUser();
    const changeDetails = searchParams?.details;
    const changePass = searchParams?.pass
    const { data, error } = await client.from("subscriptions").select("status").eq("userId", user?.id).single();
    async function createCustomerPortal() {
        "use server";

        const session = await stripe.billingPortal.sessions.create({
            customer: user?.stripeId as string,
            return_url:
                process.env.NODE_ENV === "production"
                    ? "https://financehb.vercel.app/user"
                    : "http://localhost:3000/user",
        });

        return redirect(session.url);
    }

    return (
        <main className="flex min-h-screen flex-col items-center py-8 justify-between space-y-4">
            <section className="flex flex-col w-full p-8 space-y-8">
                <h2 className="font-ibarra  font-bold  text-secondary-foreground text-5xl">{`Profil: ${user?.name} ${user?.surname}`}</h2>
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
                </div>
                {data?.status === true
                    &&
                    <Card className="w-full shadow-lg shadow-secondary-foreground">
                        <CardHeader>
                            <CardTitle>Aktivní předplatné</CardTitle>
                            <h4 className='text-2xl font-medium'>K obnově dojde: </h4>
                            <CardDescription>
                                Click on the button below, this will give you the opportunity to
                                change your payment details and view your statement at the same
                                time.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={createCustomerPortal}>
                                <Button variant={"destructive"} size={"lg"}>Přestat odebírat <MoveUpRight /></Button>
                            </form>

                        </CardContent>
                    </Card>

                }
            </section>
        </main>
    )
}

