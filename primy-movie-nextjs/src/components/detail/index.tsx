import { Button } from "../ui/button";
import LeftSidePanel from "./LeftSidePanel/left-sie-panel";
import MainContectWrapper from "./main-contect-wrapper";
import RightSidePanel from "./RightSidePanel";
import TopbackGoundImage from "./top-component";
import Link from "next/link";
import { getMovieDetail } from "@/service/Api-calls";
import NoPage from "@/app/not-found";





export default async function MovieDetail({ detail }: { detail?: string }) {

  const movieDetail = await getMovieDetail({ detail: detail })


  if (movieDetail.errors) {
    return <NoPage />
  }

  return (
    <>



      <div
        key={"top"}
        className={` min-h-screen  flex flex-col  overflow-hidden after:border `}
      >
        {/* // first or top background image  */}
        <TopbackGoundImage bannerImage={movieDetail.data.movieBySlugUrl.bannerImage} />

        {/* // second card. movie detail are shown here */}
        <MainContectWrapper>
          <div className="flex  sm:-ml-[15px] sm:-mr-[15px] ">
            {/* left side of full screen */}
            <LeftSidePanel movieData={movieDetail.data} />

            {/* // right side  */}
            <RightSidePanel movieData={movieDetail.data} />
          </div>

          {/* download links */}
          <div key={"links"} className=" before:border before:border-gray-500 before:flex  h-fit text-center py-4 space-y-3 items-center">

            {movieDetail.data.movieBySlugUrl.downloadLink.map((m, i) => (
              <div key={i}>
                <p className="text-xl  font-sans font-semibold">{m.text}</p>
                <Link href={m.link}>
                  <Button className="my-2 w-60 h-10">Download Now</Button>
                </Link>
              </div>
            ))}

          </div>
        </MainContectWrapper>
      </div>
    </>
  );
}
