import { query } from "@/service/ApolloClient";
import { ErrorResponse } from "@/types/error-type";
import { MovieDetailRespose, MovieResponse } from "@/types/movie-types";

import { ApolloError, ApolloQueryResult, DocumentNode } from "@apollo/client";

export async function MoveiFetcher(url: string): Promise<MovieResponse> {
  const res = await fetch(url, { cache: "no-cache" });

  if (res.status != 200) {
    const errorData: ErrorResponse = await res.json();
    throw Error(errorData.message || "somthing went wrong");
  }
  return res.json();
}

export async function MovieDetailFetcher(
  url: string
): Promise<MovieDetailRespose> {
  const res = await fetch(url, { cache: "no-cache" });

  if (res.status != 200) {
    const errorData: ErrorResponse = await res.json();
    throw Error(errorData.message || "somthing went wrong");
  }

  return res.json();
}

export async function globalFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();

    throw Error(errorData.message || " somthing went wrong");
  }

  return res.json();
}


export async function globalFetcher2<T>(url: DocumentNode): Promise<ApolloQueryResult<T>> {
  try {

    const res = await query({ query: url, errorPolicy: "all" })
    return res
  } catch (err: any) {

    if (err instanceof ApolloError) {


      if (err.networkError) {

        throw new Error(err.networkError?.message)
      }
    }

    throw new Error("")

  }
}