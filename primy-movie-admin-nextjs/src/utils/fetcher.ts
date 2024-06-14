import { query, createApolloClient } from "@/service/ApolloClient";
import { ApolloError, ApolloQueryResult, DocumentNode, FetchResult } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";


export async function globalFetcher2<T>({ url, variables }: { url: DocumentNode, variables?: {} }): Promise<ApolloQueryResult<T>> {
  try {
    loadDevMessages();
    loadErrorMessages();

    const res = await query({  query: url, errorPolicy: "all", variables: variables })
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

    // const res = await query({ query: mutationQuery, errorPolicy: "all", variables: variables })

    const res = await createApolloClient.mutate({ mutation: mutationQuery, variables: variables, errorPolicy: "all" })
    return res
  } catch (err: any) {

    if (err instanceof ApolloError) {

      throw new Error(err.message)
    }

    throw new Error(err)

  }
}