import { Calendar, Share2 } from "lucide-react";
import React from "react";
import AlertDialog from "./alert-dialog";
import ReletedSession from "./releted-session";
import Image from "next/image";
import { MoviedetailData } from "@/types/movie-types";

export default function RightSidePanel({
  movieData,
}: {
  movieData: MoviedetailData;
}) {
  return (
    <div className="w-[70%]  max-sm:w-full sm:px-[15px] px-3   ">
      {/* // movie title  and share*/}

      <div className="min-h-[40px] flex flex-row justify-between  items-center  ">
        {/* // movie title */}
        <div>
          <h1 className="font-semibold text-lg ">{movieData.name}</h1>
          <span
            className={`flex text-muted-foreground gap-1 mt-2  text-sm items-center`}
          >
            <Calendar size={15} className="" />({movieData.releaseYear})
          </span>
        </div>

        {/* // share button */}
        <div className=" self-start text-[#4c5a67] relative w-[5%] ">
          <div className="absolute  flex flex-col cursor-pointer">
            <Share2 />
          </div>
        </div>
      </div>

      {/* // SUMMARY */}
      <div className="my-3">
        <div className="text-[#6a7c8f] font-semibold  text-xl ">
          SUMMARY OF THE PLOT -
        </div>
        <div className="text-muted-foreground">{movieData.content}</div>
      </div>

      {/* // alert for movie link broken */}
      <div>
        <AlertDialog />
      </div>

      {movieData.Seasons.length > 0 ? <ReletedSession /> : <></>}

      <div className="flex  gap-3 w-fit overflow-auto no-scrollbar   justify-around relative  h-fit">
        {movieData.screenShorts.map((m) => {
          return (
            <Image
              key={m}
              className=" object-fill "
              src={m}
              width={500}
              height={281.25}
              alt="caption ametica"
            />
          );
        })}
      </div>
    </div>
  );
}
