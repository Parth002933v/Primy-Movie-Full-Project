import MovieDetail from "@/components/detail";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";

import error from "@/app/global-error";
import { getMovieDetail, getMovieMetadata } from "@/service/Api-calls";
import { Metadata } from "next";





export async function generateMetadata({ params }: { params: { detail: string } }): Promise<Metadata | null> {
  const movieMetadata = await getMovieMetadata({ detail: params.detail })


  if (movieMetadata.errors) return null
  console.log(movieMetadata);

  return {
    title: movieMetadata.data!.name,
    description: movieMetadata.data!.content,
    openGraph: {
      title: movieMetadata.data!.name,
      images: [
        {
          url: movieMetadata.data!.posterImage
        }
      ]
    }
  }


}


export default function MovieDetailPage({ params }: { params: { detail: string } }) {
  return (<ErrorBoundary errorComponent={error}>
    <MovieDetail detail={params.detail} />;
  </ErrorBoundary>)
}
