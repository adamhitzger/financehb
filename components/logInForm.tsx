"use client"

import { Input } from "./ui/input";
import { useTransition, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import { logIn } from "@/actions/users";
import { Loader2 } from "lucide-react";
import {motion} from "framer-motion"
export default function LogInForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const handleLogIn = (formData: FormData) => {
        startTransition(async () => {
            const { errorMessage } = await logIn(formData);

            if (errorMessage) {
                console.log(errorMessage)
                toast.error(errorMessage)
            } else {
                router.push('/paywall')
                toast.success("Byl jste přihlášen")
            }
        })
    }
    return (
        <motion.form 
        className="w-full lg:w-1/2 flex flex-col p-3 space-y-7 bg-secondary rounded-2xl" action={handleLogIn}
        initial={{opacity:0, y:-250}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:-250}}
        transition={{duration: 0.6}}
        >
            <div> <h2 className="  font-bold tracking-wide text-3xl font-ibarra lg:text-5xl text-primary my-2 text-underline">Přihlaste se</h2></div>
            <div className="flex flex-col w-full space-y-4">
                <Input name="email" type="email" placeholder="Zadejte email" value={form.email} onChange={handleChange} required disabled={isPending} />
                <Input name="password" type="password" placeholder="Zadejte heslo" value={form.password} onChange={handleChange} required disabled={isPending} />
                <Button disabled={isPending} type="submit" size={'lg'} className='mx-auto bg-destructive text-xl text-primary font-light underline underline-offset-2 shadow-md  shadow-primary-foreground'>
                    {isPending ? <Loader2 className={"animate-spin"} /> : "Přihlásit se"}
                </Button>
            </div>
        </motion.form>
    )
}

