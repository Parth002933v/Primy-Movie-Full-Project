import AddMoviePage from '@/components/add-update-movie'

import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

import AppMovieError from "./error"

import { GetFilters } from '@/utils/api-calls'




export default async function page() {


    const filterData = await GetFilters()

    return (
        <ErrorBoundary errorComponent={AppMovieError}>
            <AddMoviePage filterData={filterData} />
        </ErrorBoundary>
    )
}
