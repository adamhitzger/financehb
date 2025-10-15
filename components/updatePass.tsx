'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateForgotUser } from "@/actions/users";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import {motion} from "framer-motion"

export function UpdatePass() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const params = searchParams.get("code") as string
    console.log(params)
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        email: "",
        password: "",
        code: params
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const handleUpdate = (formData: FormData) => {
        startTransition(async () => {
            const {errorMessage} =await updateForgotUser(formData, params);
            console.log(errorMessage)
            toast.success("Probíhá změna údajů")
            router.push('/paywall')

        })
    }

    return (

        <motion.div
        initial={{opacity:0, y:-250}}
                animate={{opacity:1, y:0}}
                exit={{opacity:0, y:-250}}
                transition={{duration: 0.6}} className="p-8 border-2 w-96 shadow-lg rounded-md bg-white">
            <div className="text-center space-y-2">
                <h3 className="text-3xl font-bold text-gray-900 ">Uložit nové heslo</h3>
                <form 
                
                className="space-y-4" action={handleUpdate}>
                    <Input name="email" placeholder="Zadejte email" type="text" required disabled={isPending} onChange={handleChange} defaultValue={form.email} />
                    <Input name="password" type="password" placeholder="Zadejte nové heslo" required disabled={isPending} onChange={handleChange} defaultValue={form.password} />
                    <input type="hidden" name="code" value={form.code}/>
                    <Button
                        
                        disabled={isPending} type="submit"
                        size={"lg"}
                    >
                        {isPending ? <Loader2 className={"animate-spin"} /> : "Uložit"}
                    </Button>
                </form>

            </div>
        </motion.div>
    );
}