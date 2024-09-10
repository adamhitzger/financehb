'use client'

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateForgotUser } from "@/actions/users";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export function UpdatePass() {
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

    const handleUpdate = (formData: FormData) => {
        startTransition(async () => {
            await updateForgotUser(formData);

            toast.success("Probíhá změna údajů")
            router.push('/paywall')

        })
    }

    return (

        <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
            <div className="text-center space-y-2">
                <h3 className="text-3xl font-bold text-gray-900 ">Uložit nové heslo</h3>
                <form className="space-y-4" action={handleUpdate}>
                    <Input name="email" placeholder="Zadejte email" type="text" required disabled={isPending} onChange={handleChange} defaultValue={form.email} />
                    <Input name="password" type="password" placeholder="Zadejte heslo" required disabled={isPending} onChange={handleChange} defaultValue={form.password} />
                    <Button
                        variant={"secondary"}
                        disabled={isPending} type="submit"
                        size={"lg"}
                    >
                        {isPending ? <Loader2 className={"animate-spin"} /> : "Uložit"}
                    </Button>
                </form>

            </div>
        </div>
    );
}