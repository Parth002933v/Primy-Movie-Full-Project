"use server"


import { z } from "zod";
import { adminFormSchema } from ".";
import { gql } from "@apollo/client";
import { globalFetcher, globalMutater } from "@/utils/fetcher";
import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";

import { redirect, RedirectType, permanentRedirect } from "next/navigation"
export async function HandleLogin(values: z.infer<typeof adminFormSchema>) {



    const LOGIN_ADMIN = gql`
        mutation AdminSignIn($input: adminSignInInput!) {
        adminSignIn(input: $input)
        }
    `

    console.log(values, "paasowrd");

    interface loginResponce {
        adminSignIn: string
    }
    const res = await globalMutater<loginResponce>({ mutationQuery: LOGIN_ADMIN, variables: { "input": { "password": values.password } } });

    console.log(res);


    if (res.errors) {
        return res.errors[0].message
    }
    if (res.data) {
        const r = cookies().set({
            name: "_auth",
            value: res.data.adminSignIn,
            httpOnly: true,
            secure: true
        })

        permanentRedirect('/', RedirectType.replace)

    }






}