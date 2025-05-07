'use client'

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { logIn, updateUser } from "@/actions/users";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export function ChangeDetails({ id, name, surname, email }: { id?: number, name: string | undefined, surname: string | undefined, email: string | undefined, }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        name: name,
        surname: surname,
        email: email,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const handleUpdate = (formData: FormData) => {
        startTransition(async () => {
            const { errorMessage } = await updateUser(formData);

            if (errorMessage) {
                toast.error(errorMessage)
            } else {
                router.push('/user')
                toast.success("Probíhá změna údajů")
            }
        })
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">Změnit údaje</h3>
                    <form className="space-y-4" action={handleUpdate}>
                        <Input name="name" type="text" disabled={isPending} onChange={handleChange} defaultValue={form.name} />
                        <Input name="surname" type="text" disabled={isPending} onChange={handleChange} defaultValue={form.surname} />
                        <Input name="email" type="text" disabled={isPending} onChange={handleChange} defaultValue={form.email} />
                        <input type="hidden" name="id" value={id} />
                        <div className="flex justify-center space-x-2  w-full">
                            <Button
                                variant={"secondary"}
                                disabled={isPending} type="submit"
                                size={"lg"}
                            >
                                {isPending ? <Loader2 className={"animate-spin"} /> : "Uložit"}
                            </Button>
                            <Button
                                variant={"destructive"}
                                onClick={router.back}
                                size={"lg"}
                            >
                                Zpět
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}