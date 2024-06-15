import { createApolloClient } from "@/service/ApolloClient";
import { ApolloError, ApolloQueryResult, DocumentNode, FetchResult } from "@apollo/client";
import { cookies } from "next/headers";


export async function globalFetcher2<T>({ url, variables }: { url: DocumentNode, variables?: {} }): Promise<ApolloQueryResult<T>> {
  try {

    // console.log(cookies().get("_auth"), "cookie in global fetcher");


    const res = await createApolloClient.query({ query: url, errorPolicy: "all", variables: variables })
    return res
  } catch (err: any) {

    if (err instanceof ApolloError) {

      throw new Error(err.message)
    }
    throw new Error(err)

  }
}



export async function globalMutater<T>({ mutationQuery, variables }: { mutationQuery: DocumentNode, variables?: {} }): Promise<FetchResult<T>> {
  try {
    // console.log(cookies().get("_auth"), "cookie in global mutater");


    const res = await createApolloClient.mutate({ mutation: mutationQuery, variables: variables, errorPolicy: "all" })
    return res
  } catch (err: any) {

    if (err instanceof ApolloError) {

      throw new Error(err.message)
    }

    throw new Error(err)

  }
}