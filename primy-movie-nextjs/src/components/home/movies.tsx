import React from "react";
import { MovieResponse } from "@/types/movie-types";
import { MoveiFetcher } from "@/utils/fetcher";
import MovieCard from "../movie-card";

async function getMovies(page?: string): Promise<MovieResponse> {
  const path = `${process.env.BASE_URL}/movies/${
    page != null ? `page/${page}` : ""
  }`;
  const res = await MoveiFetcher(path);

  return res;
}

export default async function Movies({ page }: { page?: string }) {
  let res: MovieResponse | null = null;

  try {
    res = await getMovies(page);
  } catch (err: any) {
    throw Error(err.message);
  }

  return (
    <div className=" flex flex-wrap flex-shrink lg:justify-center max-lg:justify-center   max-lg:px-2  gap-3  ">
      {res != null ? (
        res.data.map((m) => (
          <MovieCard
            movieLink={m.slugUrl}
            movieName={m.name}
            posterImage={m.posterImage}
            key={m._id}
            className="max-md:h-64 max-md:w-36  h-72 w-44"
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
