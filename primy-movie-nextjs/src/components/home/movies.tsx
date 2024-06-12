import React from "react";
import { IMoviesResponse_gql } from "@/types/movie-types";
import { globalFetcher2 } from "@/utils/fetcher";
import MovieCard from "../movie-card";
  import { ApolloQueryResult, gql } from "@apollo/client";
import Toast from "../ui/toast";



async function getMovieData({ page }: { page?: string }): Promise<ApolloQueryResult<IMoviesResponse_gql>> {

  const GET_Movies = gql`
   query Movies($page: PaginationInput) {
      movies(page: $page) {
        length
        TotalPages
        movies {
          slugUrl
          _id
          name
          posterImage
    }
  }
}`

  const pageNoToInt = Number(page)

  const res = await globalFetcher2<IMoviesResponse_gql>({ url: GET_Movies, variables: { page: { pageNo: pageNoToInt } } });

  return res

}

export default async function Movies({ page }: { page?: string }) {

  const movies = await getMovieData({ page: page })

  return (
    <div className=" flex flex-wrap flex-shrink lg:justify-center max-lg:justify-center   max-lg:px-2  gap-3  ">
      {
        movies.data.movies?.movies.map((m) =>
          <MovieCard
            movieLink={m.slugUrl}
            movieName={m.name}
            posterImage={m.posterImage}
            key={m._id}
            className="max-md:h-64 max-md:w-36  h-72 w-44"
          />
        )
      }

      {
        movies.errors ? <Toast error={movies.errors} /> : <></>
      }
    </div>
  );
}
