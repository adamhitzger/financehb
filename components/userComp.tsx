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
export default function UserComp({user, price, endDate, interval,status}: {user: FullUser| undefined | null,price: number, endDate: number, interval: string, status: string}){
    const searchParams = useSearchParams()
    const changeDetails =  searchParams.get("details");
    const changePass =  searchParams.get("pass")
    console.log(price)
    const end_priod = new Date(endDate*1000).toLocaleDateString("cs-CZ")
    return(
        <main className="flex min-h-screen flex-col md:flex-row items-center py-8 justify-between space-y-4">
        <section className="flex flex-col w-full md:w-1/2 p-8 space-y-8">
            <motion.h2
            initial={{opacity:0, x: -250}}
            animate={{opacity: 1, x:0}}
            exit={{opacity: 0, x: -250}}
            transition={{duration: 0.7}}
            
            className="font-ibarra  font-bold  decoration-secondary-background underline underline-offset-4 text-5xl">{`Profil`}</motion.h2>
            <div className='w-full flex flex-col md:flex-row gap-4 border-2 p-4 rounded-2xl'>
                <motion.div
                initial={{opacity:0, x: 500}}
                animate={{opacity: 1, x:0}}
                exit={{opacity: 0, x: 500}}
                transition={{duration: 0.5}}
                className=' max-w-screen-sm mx-auto rounded-xl w-full flex flex-col p-5 space-y-4'>
                    <h3 className='text-4xl font-bold'>Osobní údaje</h3>
                    <Input defaultValue={user?.first_name} readOnly/>
                    <Input defaultValue={user?.last_name} readOnly/>
                    <Input defaultValue={user?.email} readOnly/>
                    <div className='grid grid-cols-2  gap-5 sm:grid-cols-2 sm:grid-rows-2'>
                        <Link href={"/user?details=true"}>
                            <Button  size={"lg"}>Změnit údaje</Button>
                        </Link>
                        <Link href={"/user?pass=true"}>
                            <Button  size={"lg"}>Změnit heslo</Button>
                        </Link>
                        <SignOut />
                        {user && user?.id &&
                            <Delete id={user.id} raynet_id={user.raynet_id}/>
                        }

                        {changeDetails && <ChangeDetails id={user?.id} name={user?.first_name} surname={user?.last_name} email={user?.email} />}
                        {changePass && user?.id && <ChangePass id={user.id}/>}
                   
            {user?.is_mail_sub && user?.raynet_id && user?.id &&
                    <SignOutFromNews raynetId={user.raynet_id} dbId={user.id}/>
            }
            
                    </div>
                </motion.div>
            </div>
           
        </section>
         <section className="flex flex-row w-full md:w-1/2 p-8 space-y-8">
         {status === "active" &&
               user?.stripe_id && 
               <div className="w-full flex flex-col justify-center space-y-4">
            <h3 className='text-4xl font-bold'>Aktivní předplatné</h3>
            <div className="bg-secondary text-center rounded-lg p-16 w-fit flex flex-col space-y-2">
                <h4 className="text-7xl font-bold text-secondary-background">{price} Kč</h4>
               {interval === "month" ? <span className="text-xl text-white text-center">za měsíc</span> : null}
               {interval === "year" ? <span className="text-xl text-white text-center">za rok</span> : null}
               <span className="text-xl text-white text-center">k obnové dojde: {end_priod}</span> 
                       <SubInfoForm stripeId={user.stripe_id}/>
       
            </div>
              </div>
               }
         </section>
    </main>
    )
}