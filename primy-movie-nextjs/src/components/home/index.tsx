import React, { Suspense } from "react";
import Providers from "./providers";
import FilterMenu from "./FilterMenu";
import Footer from "./footer";
import {
  filterData,
} from "@/types/other-types";
import { globalFetcher2 } from "@/utils/fetcher";
import { gql, ApolloQueryResult } from '@apollo/client';
import Toast from "../ui/toast";
import Loading from "@/app/(home)/loading";
import Movies from "./movies";


import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import HomeError from "@/app/(home)/error";

async function getFileringData(): Promise<ApolloQueryResult<filterData>> {
  const GET_PROVIDERS = gql`
    query filteringData {
    providers {
      image
      providerName
      _id
    }
    languages {
      _id
      languageName
    }
    generes {
      name
      _id
    }
    categoris {
      name
      _id
    }
    ageRatings {
      _id
      rating
      defination
    }
    videoQualitys {
      Nickname
      Quality
      _id
    }
  }`

  const res = await globalFetcher2<filterData>({ url: GET_PROVIDERS });

  return res

}

export default async function HomeComponent({ page }: { page?: string }) {
  const filterData = await getFileringData();

  return (
    //s
    <div>
      <div className="pt-6">
        <Providers providerData={filterData?.data.providers} />
        <FilterMenu
          genere={filterData?.data.generes}
          ageRating={filterData?.data.ageRatings}
          categorys={filterData?.data.categoris}
          languages={filterData?.data.languages}
          VideQuelity={filterData?.data.videoQualitys}
        />
      </div>

      <div>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary errorComponent={HomeError}>
            <Movies page={page} />
          </ErrorBoundary>
        </Suspense>
      </div>


      {
        filterData.errors ? <Toast error={filterData.errors} /> : <></>
      }

      <div className="my-5">
        <Footer />
      </div>
    </div>
  );
}
