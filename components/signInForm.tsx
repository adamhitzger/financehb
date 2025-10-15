"use client"

import { Input } from "./ui/input";
import { useTransition, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import {  verifySignUp } from "@/actions/users";
import { Loader2 } from "lucide-react";
import {motion} from "framer-motion"
import Link from "next/link";
export default function SignInForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        email: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const handleSignUp = (formData: FormData) => {
        startTransition(async () => {
            const { errorMessage } = await verifySignUp(formData);

            if (errorMessage) {
                console.log(errorMessage)
                toast.error(errorMessage)
            } else {
                router.push('/')
                toast.success("Na Váš účet byl zaslán ověřovací odkaz")
            }
        })
    }
    return (
        <motion.form
        initial={{opacity:0, y:-250}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:-250}}
        transition={{duration: 0.6}}
        className="w-full lg:w-1/2 flex p-4 flex-col space-y-7 border-2 rounded-2xl" action={handleSignUp}>
             <div className="flex flex-col items-center gap-8"> <h2 className="  font-bold tracking-wide text-3xl font-ibarra text-center ">Zaregistrujte se</h2>
            <Link href={"/log-in"} className="font-medium tracking-wide text-xl font-ibarra text-center underline decoration-secondary-background underline-offset-4">nebo se přihlaste</Link>
    
            </div>
            <div className="flex flex-col w-full space-y-4">
                <Input name="email" type="email" placeholder="Zadejte email" value={form.email} onChange={handleChange} required disabled={isPending} />
                <Button disabled={isPending} type="submit" size={'lg'} className='mx-auto '>
                    {isPending ? <Loader2 className={"animate-spin"} /> : "Vytvořit účet"}
                </Button>
            </div>
        </motion.form>
    )
}