"use client"

import Image from "next/image";
import logo from "../../../public/logo/light_logo.png"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormMessage } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { HandleLogin } from "./handleLogin";

export const adminFormSchema = z.object({
    password: z.string()
})

export default function LoginConponent() {

    const form = useForm<z.infer<typeof adminFormSchema>>({
        resolver: zodResolver(adminFormSchema),
        defaultValues: { password: "" },
    })


    async function onSubmit(values: z.infer<typeof adminFormSchema>) {

        const res = await HandleLogin(values)

        if (res) {

            form.setError("password", { message: res })
        }
    }


    return (
        <div className="w-screen bg-muted font-[sans-serif]  text-[#333] min-h-screen flex flex-col items-center  justify-center py-6 px-4">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">

                        <Image src={logo} alt="logo" className="w-40 mb-10" />
                        <h2 className="text-center text-xl font-extrabold">
                            If you are admin then you know the password
                        </h2>

                        <div className="mt-10 space-y-4">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    required
                                                    className="w-full text-sm px-4 py-3 text-black rounded outline-none border-2 focus:border-blue-500"
                                                    placeholder="Password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </>
                                    )}

                                />
                            </div>
                            <div className="!mt-10">
                                <Button
                                    type="submit"
                                    className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                    children="Log in"
                                />

                            </div>
                        </div>


                    </div>
                </form>
            </Form >
        </div>

    );
};
