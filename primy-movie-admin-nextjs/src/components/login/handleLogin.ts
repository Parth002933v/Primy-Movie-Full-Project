"use server"


import { z } from "zod";
import { adminFormSchema } from ".";
import { gql } from "@apollo/client";
import { globalFetcher2 } from "@/utils/fetcher";

export async function HandleLogin(values: z.infer<typeof adminFormSchema>) {



    const LOGIN_ADMIN = gql`
        mutation AdminSignIn($input: adminSignInInput!) {
        adminSignIn(input: $input)
        }
    `

    console.log(values);

    const res = await globalFetcher2({ url: LOGIN_ADMIN, variables: { "input": { "password": values.password } } });

    console.log(res.data);






}