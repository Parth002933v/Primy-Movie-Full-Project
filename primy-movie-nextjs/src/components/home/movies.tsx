import React from "react";
import MovieCard from "../movie-card";
import Toast from "../ui/toast";
import { getMovieData } from "@/service/Api-calls";

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
