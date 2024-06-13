import AddMoviePage from '@/components/add-movie'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import React from 'react'

import AppMovieError from "./error"
import { globalFetcher2 } from '@/utils/fetcher'
import { gql } from '@apollo/client'
import { filterData } from '@/types/other-types'



async function GetFilters() {
    const GET_FILTERS = gql`
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
    const res = await globalFetcher2<filterData>({ url: GET_FILTERS });

    return res
}

export default async function page() {


    const filterData = await GetFilters()

    return (
        <ErrorBoundary errorComponent={AppMovieError}>
            <AddMoviePage filterData={filterData} />
        </ErrorBoundary>
    )
}
