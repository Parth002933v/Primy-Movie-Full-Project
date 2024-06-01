import React, { Suspense } from "react";
import Providers from "./providers";
import FilterMenu from "./FilterMenu";
import Footer from "./footer";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import HomeError from "@/app/(home)/error";
import Movies from "./movies";

import {
  AgeRatingRespose,
  categoryRespose,
  genereRespose,
  languageRespose,
  MovieProviderResponse,
  videoQualityRespose,
} from "@/types/other-types";
import { globalFetcher } from "@/utils/fetcher";
import Loading from "@/app/(home)/loading";

async function getProviders(): Promise<MovieProviderResponse> {
  const path = `${process.env.BASE_URL}/movie-provider  `;
  const res = await globalFetcher<MovieProviderResponse>(path);

  return res;
}

async function getGenere(): Promise<genereRespose> {
  const path = `${process.env.BASE_URL}/generes`;
  const res = await globalFetcher<genereRespose>(path);

  return res;
}

async function getAgeRatings(): Promise<AgeRatingRespose> {
  const path = `${process.env.BASE_URL}/age-rating`;
  const res = await globalFetcher<AgeRatingRespose>(path);

  return res;
}

async function getcategorys(): Promise<categoryRespose> {
  const path = `${process.env.BASE_URL}/category`;
  const res = await globalFetcher<categoryRespose>(path);

  return res;
}

async function getlanguages(): Promise<languageRespose> {
  const path = `${process.env.BASE_URL}/language`;
  const res = await globalFetcher<languageRespose>(path);

  return res;
}

async function getVideQuelity(): Promise<videoQualityRespose> {
  const path = `${process.env.BASE_URL}/video-quality`;
  const res = await globalFetcher<videoQualityRespose>(path);

  return res;
}

export default async function HomeComponent({ page }: { page?: string }) {
  try {
    const movieProvidePromise = getProviders();
    const generePromise = getGenere();
    const ageRatingPromise = getAgeRatings();
    const categorysPromise = getcategorys();
    const languagesPromise = getlanguages();
    const VideQuelityPromise = getVideQuelity();

    const [providers, genere, ageRating, categorys, languages, VideQuelity] =
      await Promise.all([
        movieProvidePromise,
        generePromise,
        ageRatingPromise,
        categorysPromise,
        languagesPromise,
        VideQuelityPromise,
      ]);

    return (
      <div>
        <div className="pt-6">
          <Providers providerData={providers} />
          <FilterMenu
            genere={genere}
            ageRating={ageRating}
            categorys={categorys}
            languages={languages}
            VideQuelity={VideQuelity}
          />
        </div>

        <div>
          <Suspense fallback={<Loading />}>
            <ErrorBoundary errorComponent={HomeError}>
              <Movies page={page} />
            </ErrorBoundary>
          </Suspense>
        </div>

        <div className="my-5">
          <Footer />
        </div>
      </div>
    );
  } catch (error: any) {
    const err = error.message;

    throw new Error(err);
  }
}
