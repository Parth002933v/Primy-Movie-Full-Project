import React, { Suspense } from "react";
import Providers from "./providers";
import FilterMenu from "./FilterMenu";
import Footer from "./footer";
import Toast from "../ui/toast";
import Loading from "@/app/(home)/loading";
import Movies from "./movies";


import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import HomeError from "@/app/(home)/error";
import { getFileringData } from "@/service/Api-calls";



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
