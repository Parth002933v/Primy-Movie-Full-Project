'use server'
import { boolean, number, string, z } from "zod";
import { formSchema } from ".";
import { FetchResult, gql } from "@apollo/client";
import { globalFetcher2, globalMutater } from "@/utils/fetcher";


interface actualPostData {
    "name": string;
    "content": string;
    "posterImage": string;
    "bannerImage": string;
    "screenShorts": string[];
    "downloadLink": { "text": string, "link": string }[];
    "releaseYear": number,
    "genre": string[];
    "languages": string[];
    "isDualAudio": boolean;
    "videoQualitys": string[];
    "seasons": string[];
    "isSeries": boolean;
    "category": string;
    "ageRating": string;
    "movieProvider": string;
    "tags": string[]

}


interface movieRespose {
    addMovie: {

        message: string
        slugUrl: string
        movieName: string
    }
}


export async function serverSubmitForm(values: z.infer<typeof formSchema>): Promise<FetchResult<movieRespose>> {

    const POST_MOVIE = gql`
        mutation AddMovie($movie: MovieInput) {
            addMovie(movie: $movie) {
              message
              slugUrl
              movieName
            }
        }
    `

    const movie: actualPostData = {
        name: values.movieName, content: values.content, posterImage: values.posterImage,
        bannerImage: values.bannerImage,
        screenShorts: values.screenShorts.map((m) => m.link),
        downloadLink: values.downloadLink,
        releaseYear: values.releaseYear,
        genre: values.genere.map((m) => m.value),
        languages: values.language.map((m) => m.value),
        isDualAudio: values.isDualAudio,
        isSeries: values.isSeries,
        videoQualitys: values.videoQuality.map((m) => m.value),
        seasons: values.seasons.map((m) => m.id),
        ageRating: values.ageRating.value,
        category: values.category.value,
        movieProvider: values.movieProvider.value,
        tags: values.tag

    };


    const res = await globalMutater<movieRespose>({ mutationQuery: POST_MOVIE, variables: { movie: movie } })

    console.log(res);

    return res


}



export async function handleAuthenticationCheck() {

    const GET_ADMIN = gql`
    query GetAdmin {
    getAdmin
}
`

    const res = await globalFetcher2<{ getAdmin: string }>({ url: GET_ADMIN })

    return res

}