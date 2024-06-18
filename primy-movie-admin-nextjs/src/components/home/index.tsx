import { ApolloQueryResult, gql } from "@apollo/client";
import { IMoviesResponse_gql } from "@/types/movie-types";
import { globalFetcher } from "@/utils/fetcher";
import MovieCard from "./movie-card";
import { SearchBar } from "./search-bar";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";


async function getMovieData({ page, cookie }: { page?: string, cookie?: RequestCookie }): Promise<ApolloQueryResult<IMoviesResponse_gql>> {

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

    const res = await globalFetcher<IMoviesResponse_gql>({ url: GET_Movies, variables: { page: { pageNo: pageNoToInt } }, cookie: cookie });

    return res

}



export default async function HomePage({ page }: { page?: string }) {

    const cookie = cookies().get("_auth")
    const movies = await getMovieData({ page: page, cookie: cookie })

    return (
        <div>

            <SearchBar />
            <div className="mt-6 gap-2 flex flex-wrap">
                {movies.data.movies?.movies.map((e) => (
                    <MovieCard
                        movieName={e.name}
                        slugUrl={e.slugUrl}
                        imageUrl={e.posterImage}
                        key={e._id}
                        className="border-2 border-muted-foreground max-md:h-64 max-md:w-36  h-72 w-44"
                    />
                ))}
            </div>

        </div>
    )
}
function handle() {
    throw new Error("Function not implemented.");
}

