import { ErrorResponse } from "@/types/error-type";
import { MovieDetailRespose, MovieResponse } from "@/types/movie-types";
import { MovieProvider, MovieProviderResponse } from "@/types/other-types";

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

// export async function MovieProviderFetcher(
//   url: string
// ): Promise<MovieProviderResponse> {
//   const res = await fetch(url);

//   if (!res.ok) {
//     const errorData: ErrorResponse = await res.json();
//     throw Error(errorData.message || " somthing went wrong");
//   }
//   return res.json();
// }

export async function globalFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    // console.log(errorData, "=============================================");

    throw Error(errorData.message || " somthing went wrong");
  }

  return res.json();
}
