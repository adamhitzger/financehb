"use client"

import { Input } from "./ui/input";
import { useTransition, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/users";
import { Loader2 } from "lucide-react";
export default function SignInForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const handleSignUp = (formData: FormData) => {
        startTransition(async () => {
            const { errorMessage } = await signUp(formData);

            if (errorMessage) {
                toast.error(errorMessage)
            } else {
                router.push('/')
                toast.success("Na Váš účet byl zaslán ověřovací odkaz")
            }
        })
    }
    return (
        <form className="w-full lg:w-1/2 flex flex-col space-y-7 bg-secondary p-10 rounded-2xl" action={handleSignUp}>
            <div> <h2 className="  font-bold tracking-wide text-4xl md:text-5xl text-primary my-5 text-underline">Zaregistrujte se</h2></div>
            <div className="flex flex-col w-full space-y-4">
                <Input name="name" type="text" placeholder="Zadejte jméno" value={form.name} onChange={handleChange} required disabled={isPending} />
                <Input name="surname" type="text" placeholder="Zadejte přijmení" value={form.surname} onChange={handleChange} required disabled={isPending} />
                <Input name="email" type="email" placeholder="Zadejte email" value={form.email} onChange={handleChange} required disabled={isPending} />
                <Input name="password" type="password" placeholder="Zadejte heslo" value={form.password} onChange={handleChange} required disabled={isPending} />
                <Button disabled={isPending} type="submit" size={'lg'} className='mx-auto bg-destructive text-xl text-primary font-light underline underline-offset-2 shadow-md  shadow-primary-foreground'>
                    {isPending ? <Loader2 className={"animate-spin"} /> : "Vytvořit účet"}
                </Button>
            </div>
        </form>
    )
}