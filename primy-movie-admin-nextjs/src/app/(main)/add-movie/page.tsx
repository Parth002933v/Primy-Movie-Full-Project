import AddMoviePage from '@/components/add-update-movie'

import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

import AppMovieError from "./error"

import { GetFilters } from '@/utils/api-calls'
import { cookies } from 'next/headers'




export default async function page() {

    const cookie = cookies().get("_auth")
    const filterData = await GetFilters(cookie)

    return (
        <ErrorBoundary errorComponent={AppMovieError}>
            <AddMoviePage filterData={filterData} />
        </ErrorBoundary>
    )
}
