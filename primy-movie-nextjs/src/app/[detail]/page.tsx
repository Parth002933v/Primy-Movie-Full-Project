import MovieDetail from "@/components/detail";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";

import error from "@/app/global-error";


export default function MovieDetailPage({
  params,
}: {
  params: { detail: string };
}) {
  return (<ErrorBoundary errorComponent={error}>
    <MovieDetail detail={params.detail} />;
  </ErrorBoundary>)
}
