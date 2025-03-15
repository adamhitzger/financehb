"use client"

import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, MoveUpRight } from "lucide-react"
import { useTransition } from "react"
import toast from "react-hot-toast"
import { signOutFromMailsUnregistered } from "@/actions/users"
export default function SignOutmail(){
    const searchParams = useSearchParams()
    const mail = searchParams.get("mail")
    const [isPending, startTransition] = useTransition();
    
    const signOutMail= (formData: FormData) => {
        startTransition(async () => {
            const signOut = await signOutFromMailsUnregistered(formData)
            if(signOut.success) toast.success(signOut.message)
            else toast.error(signOut.message)
        })
    }
    return(
        <main className="min-h-screen flex p-8">
        <form 
        action={signOutMail}
        className="m-auto w-96 grid grid-cols-1 gap-4  text-black " >
            <h1 className="text-xl font-bold">Odhlašte se z odběru novinek</h1>
           <Input name="email" type="email" disabled={isPending} placeholder="Zadejte email" defaultValue={mail as string} required />
            <Button type="submit" size={'lg'} variant={"default"} className='mx-auto font-light  shadow-lg  shadow-primary-foreground'>
                {isPending ? <Loader2 className='animate-spin' /> : <>Odhlásit se < MoveUpRight /></>}
            </Button>
        </form>
        </main>
    )
}