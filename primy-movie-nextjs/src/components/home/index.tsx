import React, { Suspense } from "react";
import Providers from "./providers";
import FilterMenu from "./FilterMenu";
import Footer from "./footer";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import HomeError from "@/app/(home)/error";
import Movies from "./movies";



import toast, { Toaster } from 'react-hot-toast';



import {
  AgeRatingRespose,
  categoryRespose,
  filterData,
  genereRespose,
  languageRespose,
  MovieProviderResponse,
  videoQualityRespose,
} from "@/types/other-types";
import { globalFetcher, globalFetcher2 } from "@/utils/fetcher";
import Loading from "@/app/(home)/loading";


import { useQuery, gql, ApolloQueryResult } from '@apollo/client';
import Toast from "../ui/toast";

// async function getProviders() {


//   const GET_PROVIDERS = gql`
//     query Providers {
//       providers {
//       image
//       providerName
//       _id
//     }
//   }
// `
//   const res = await globalFetcher2(GET_PROVIDERS);

//   // return res;
// }

// async function getGenere(): Promise<genereRespose> {
//   const path = `${process.env.BASE_URL}/generes`;
//   const res = await globalFetcher<genereRespose>(path);

//   return res;
// }

// async function getAgeRatings(): Promise<AgeRatingRespose> {
//   const path = `${process.env.BASE_URL}/age-rating`;
//   const res = await globalFetcher<AgeRatingRespose>(path);

//   return res;
// }

// async function getcategorys(): Promise<categoryRespose> {
//   const path = `${process.env.BASE_URL}/category`;
//   const res = await globalFetcher<categoryRespose>(path);

//   return res;
// }

// async function getlanguages(): Promise<languageRespose> {
//   const path = `${process.env.BASE_URL}/language`;
//   const res = await globalFetcher<languageRespose>(path);

//   return res;
// }

// async function getVideQuelity(): Promise<videoQualityRespose> {
//   const path = `${process.env.BASE_URL}/video-quality`;
//   const res = await globalFetcher<videoQualityRespose>(path);

//   return res;
// }



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
      name
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



  const res = await globalFetcher2<filterData>(GET_PROVIDERS);


  // if (res.data) {
  return res

  // }

  // return null
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

      {/* <div>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary errorComponent={HomeError}>
            <Movies page={page} />
          </ErrorBoundary>
        </Suspense>
      </div> */}


      {
        filterData.errors ? <Toast error={filterData.errors} /> : <></>
      }

      <div className="my-5">
        <Footer />
      </div>
    </div>
  );
}
