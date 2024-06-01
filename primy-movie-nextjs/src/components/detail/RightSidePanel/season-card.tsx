import MovieCard from "@/components/movie-card";
import React from "react";

export default function SeasonCard() {
  return (
    <div className="relative w-full h-full ml-0   my-0 ">
      <MovieCard
        className="max-sm:w-[140px] w-[190px] h-72 max-sm:h-56 "
        posterImage={""}
        movieName={""}
        movieLink={""}
      />
      {/* // session number */}
      <div className="m-[5px] overflow-hidden max-w-[155px] whitespace-nowrap  overflow-ellipsis">
        Season 3
      </div>
    </div>
  );
}
