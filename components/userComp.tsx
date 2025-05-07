"use client"
import { FullUser } from "@/types";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChangeDetails } from '@/components/modals/changeDetails';
import { Delete, SignOut } from '@/components/userbuttons';
import { ChangePass } from '@/components/modals/changePass';
import SubInfoForm, { SignOutFromNews } from '@/components/subInfoForm';
import { useSearchParams } from "next/navigation";
import {motion} from "framer-motion"
export default function UserComp({user, status}: {user: FullUser| undefined | null, status: string}){
    const searchParams = useSearchParams()
    const changeDetails =  searchParams.get("details");
    const changePass =  searchParams.get("pass")
    console.log(user)
    return(
        <main className="flex min-h-screen flex-col items-center py-8 justify-between space-y-4">
        <section className="flex flex-col w-full p-8 space-y-8">
            <motion.h2
            initial={{opacity:0, x: -250}}
            animate={{opacity: 1, x:0}}
            exit={{opacity: 0, x: -250}}
            transition={{duration: 0.7}}
            
            className="font-ibarra  font-bold  text-secondary-foreground text-3xl lg:text-5xl">{`Profil: ${user?.first_name} ${user?.last_name}`}</motion.h2>
            <hr className="w-full border-secondary border-2" />
            <div className='w-full flex flex-col md:flex-row gap-4'>
                <motion.div
                initial={{opacity:0, x: 500}}
                animate={{opacity: 1, x:0}}
                exit={{opacity: 0, x: 500}}
                transition={{duration: 0.5}}
                className='bg-primary-foreground max-w-screen-sm mx-auto rounded-xl w-full flex flex-col p-5 shadow-xl space-y-4'>
                    <h3 className='text-4xl font-bold'>Osobní údaje</h3>
                    <Input defaultValue={user?.first_name} readOnly/>
                    <Input defaultValue={user?.last_name} readOnly/>
                    <Input defaultValue={user?.email} readOnly/>
                    <div className='grid grid-cols-2  gap-5 sm:grid-cols-2 sm:grid-rows-2'>
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

                        {changeDetails && <ChangeDetails id={user?.id} name={user?.first_name} surname={user?.last_name} email={user?.email} />}
                        {changePass && user?.id && <ChangePass id={user.id}/>}
                        {status === "active"
                && user?.stripe_id &&
                
                       <SubInfoForm stripeId={user.stripe_id}/>
            }
            {user?.is_mail_sub && user?.raynet_id && user?.id &&
                    <SignOutFromNews raynetId={user.raynet_id} dbId={user.id}/>
            }
            
                    </div>
                </motion.div>
            </div>
           
        </section>
    </main>
    )
}