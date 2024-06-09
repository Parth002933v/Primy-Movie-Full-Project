import React from "react";
import HomeComponent from "@/components/home";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import HomeError from "@/app/(home)/error";

export default function page({ params }: { params: { page: string } }) {
  console.log(params.page, "================");

  return (
    <ErrorBoundary errorComponent={HomeError}>
      <HomeComponent page = {params.page} />
    </ErrorBoundary>
  );
}
