"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function CancelledRoute() {
    return (
        <div className="w-full flex flex-1 justify-center min-h-screen items-center p-8">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <XIcon className="size-12 p-2 rounded-full bg-red-500/30 text-red-500" />
                    </div>

                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h2 className="text-xl font-semibold">Platba nebyla dokončena.</h2>
                        <p className="text-sm mt-2 text-muted-foreground tracking-tight">
                            Nemějte obavy, zkuste příště.
                        </p>

                        <Button asChild className="w-full mt-5">
                            <Link href="/">Zpět na hlavní stránku</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}