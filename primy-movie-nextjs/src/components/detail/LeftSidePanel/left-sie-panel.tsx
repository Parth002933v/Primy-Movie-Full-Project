import React from "react";
import LeftPannalDetailInfo from "./left-pannal-detail-info";
import { IMovieDetail_gql} from "@/types/movie-types";
import Image from "next/image";

export default function LeftSidePanel({
  movieData,
}: {
  movieData: IMovieDetail_gql;
}) {
  return (
    <div className="max-sm:hidden px-[15px]  sm:w-[30%]  ">
      <div className=" ">
        <span className=" relative flex overflow-x-hidden overflow-y-hidden pt-[142.1686747%] bg-[#0a151f] rounded-md ">
          <Image
            alt="poster image"
            fill
            src={movieData.movieBySlugUrl.posterImage}
          />
        </span>

        <div className="mt-[20px] pt-[20px] border-t border-solid border-gray-700 block">
          <LeftPannalDetailInfo
            key={"1"}
            title="genres"
            values={movieData.movieBySlugUrl.genre.map((item) => item.name).join(", ")}
          />
          <LeftPannalDetailInfo
            key={"2"}
            title="Language"
            values={movieData.movieBySlugUrl.languages.map((m) => m.languageName).join(", ")}
          />
          <LeftPannalDetailInfo
            key={"3"}
            title="Quality"
            values={movieData.movieBySlugUrl.videoQualitys.map((m) => m.Quality).join(", ")}
          />
          <LeftPannalDetailInfo
            key={"4"}
            title="Age rating"
            values={movieData.movieBySlugUrl.ageRating.rating}
          />
        </div>
      </div>
    </div>
  );
}
