import { globalFetcher2 } from "@/utils/fetcher";
import { Button } from "../ui/button";
import LeftSidePanel from "./LeftSidePanel/left-sie-panel";
import MainContectWrapper from "./main-contect-wrapper";
import RightSidePanel from "./RightSidePanel";
import TopbackGoundImage from "./top-component";
import { IMovieDetail_gql } from "@/types/movie-types";
import Link from "next/link";
import Head from "next/head";
import { ApolloQueryResult, gql } from "@apollo/client";

// async function getMovieDetail(slug?: string): Promise<MovieDetailRespose> {
//   const path = `${process.env.BASE_URL}/movies/${slug}`;
//   const res = await MovieDetailFetcher(path);

//   return res;
// }



async function getMovieDetail({ detail }: { detail?: string }): Promise<ApolloQueryResult<IMovieDetail_gql>> {

  const GET_MovieDetail = gql`
    query movieBySlugUrl($slugUrl: ID!) {
      movieBySlugUrl(slugUrl: $slugUrl) {
        _id
        slugUrl
        name
        posterImage
        bannerImage
        screenShorts
        content
        downloadLink {
          link
          text
        }
        releaseYear
        genre {
          _id
          name
        }
        languages {
          languageName
          _id
        }
        isDualAudio
        videoQualitys {
          Nickname
          Quality
          _id
        }
        Seasons {
          _id
          slugUrl
          name
          posterImage
        }
        isSeries
        category {
          _id
          name
        }
        ageRating {
          defination
          rating
          _id
        }
        movieProvider {
          image
          providerName
          _id
        }
      }
    }
`

  const res = await globalFetcher2<IMovieDetail_gql>({ url: GET_MovieDetail, variables: { slugUrl: detail } });

  return res

}

export default async function MovieDetail({ detail }: { detail?: string }) {

  const movieDetail = await getMovieDetail({ detail: detail })

  return (
    <>

      <div
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
          <div className=" before:border before:border-gray-500 before:flex  h-fit text-center py-4 space-y-3 items-center">


            {movieDetail.data.movieBySlugUrl.downloadLink.map((m) => (
              <div key={m._id}>
                <p className="text-xl  font-sans font-semibold">{m.text}</p>
                <Link target="_blank" href={m.link}>
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



{/* <Head>
        <title>{res.data.name}</title>
        <meta property="og:title" content={res.data.name} />
        <meta property="og:description" content={res.data.content} />
        <meta property="og:image" content={res.data.posterImage} />
        {/* <meta property="og:url" content={res.data.ur} /> */}
// <meta property="og:type" content="website" />
// </Head> */}