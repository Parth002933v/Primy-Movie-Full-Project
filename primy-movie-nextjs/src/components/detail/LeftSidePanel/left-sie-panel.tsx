import React from "react";
import LeftPannalDetailInfo from "./left-pannal-detail-info";
import { MoviedetailData, MovieDetailRespose } from "@/types/movie-types";

export default function LeftSidePanel({
  movieData,
}: {
  movieData: MoviedetailData;
}) {
  return (
    <div className="max-sm:hidden px-[15px]  sm:w-[30%]  ">
      <div className=" ">
        <span className=" relative flex overflow-x-hidden overflow-y-hidden pt-[142.1686747%] bg-[#0a151f] rounded-md ">
          <img
            className="w-[100%]  max-h-none  h-[100%] absolute top-0"
            src={movieData.posterImage}
            alt="caption ametica"
          />
        </span>

        <div className="mt-[20px] pt-[20px] border-t border-solid border-gray-700 block">
          <LeftPannalDetailInfo
            key={"1"}
            title="genres"
            values={movieData.genre.map((item) => item.name).join(", ")}
          />
          <LeftPannalDetailInfo
            key={"2"}
            title="Language"
            values={movieData.languages.map((m) => m.languageName).join(", ")}
          />
          <LeftPannalDetailInfo
            key={"3"}
            title="Quality"
            values={movieData.videoQualitys.map((m) => m.Quality).join(", ")}
          />
          <LeftPannalDetailInfo
            key={"4"}
            title="Age rating"
            values={movieData.ageRating.rating}
          />
        </div>
      </div>
    </div>
  );
}
