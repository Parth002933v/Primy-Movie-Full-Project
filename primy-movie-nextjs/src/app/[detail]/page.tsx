import MovieDetail from "@/components/detail";
import React from "react";

export default function MovieDetailPage({
  params,
}: {
  params: { detail: string };
}) {
  return <MovieDetail detail={params.detail} />;
}
