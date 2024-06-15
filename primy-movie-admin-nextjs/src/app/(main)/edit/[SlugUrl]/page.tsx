import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

import AddMoviePage from '@/components/add-movie'

import ErrorPage from "./error"

import GetMoviedetail, { GetFilters } from '@/utils/api-calls'
import NoPage from '@/app/not-found'
import { cookies } from 'next/headers'


export default async function page({ params }: { params: { SlugUrl: string } }) {

    const filterData = await GetFilters()
    const movieData = await GetMoviedetail({ slugUrl: params.SlugUrl, cookie: cookies().get("_auth") })

    if (movieData.errors) {
        return <NoPage />

    }


    return (
        <div>

            <ErrorBoundary errorComponent={ErrorPage}>
                <AddMoviePage filterData={filterData} movieData={movieData.data.movieBySlugUrl} />
            </ErrorBoundary>


        </div>
    )
}
