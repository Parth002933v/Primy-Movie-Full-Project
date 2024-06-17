import { query } from "@/service/ApolloClient";
import { ApolloError, ApolloQueryResult, DocumentNode } from "@apollo/client";


export async function globalFetcher<T>({ url, variables }: { url: DocumentNode, variables?: {} }): Promise<ApolloQueryResult<T>> {
  try {

    const res = await query({ query: url, errorPolicy: "all", variables: variables })
    return res
  } catch (err: any) {

    if (err instanceof ApolloError) {

      throw new Error(err.message)
    }

    throw new Error("")

  }
}