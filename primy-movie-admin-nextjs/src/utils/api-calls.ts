"use server"
import { globalFetcher, globalMutater } from "./fetcher";
import { FetchResult, ApolloQueryResult, gql } from "@apollo/client";

import { filterDataTypes } from "@/types/other-types";
import { IMovieDetail_gql } from "@/types/movie-types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { z } from "zod";
import { formSchema } from "@/components/add-update-movie/form-schema";

export async function GetFilters() {
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
  const res = await globalFetcher<filterDataTypes>({ url: GET_FILTERS });

  return res
}

//*=========================== GetMoviedetail ===============================================================//
export default async function GetMoviedetail({ slugUrl, cookie }: { slugUrl: string, cookie?: RequestCookie }): Promise<ApolloQueryResult<IMovieDetail_gql>> {

  const GET_MovieDetail = gql`
    query movieBySlugUrl($slugUrl: ID!) {
      movieBySlugUrl(slugUrl: $slugUrl) {
        _id
        slugUrl
        name
        posterImage
        bannerImage
        screenShorts
        content
        downloadLink {
          link
          text
        }
        releaseYear
        genre {
          _id
          name
        }
        languages {
          languageName
          _id
        }
        isDualAudio
        videoQualitys {
          Nickname
          Quality
          _id
        }
        Seasons {
          _id
          slugUrl
          name
          posterImage
        }
        isSeries
        category {
          _id
          name
        }
        ageRating {
          defination
          rating
          _id
        }
        movieProvider {
          image
          providerName
          _id
        }
        tags
      }
    }
`

  const res = await globalFetcher<IMovieDetail_gql>({ url: GET_MovieDetail, variables: { slugUrl: slugUrl }, cookie: cookie });
  return res
}

//*============================== form submittion ======================================================================//

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


interface addMovieRespose {
  addMovie: {
    message: string
    slugUrl: string
    movieName: string
  }
}


export async function serverSubmitForm(values: z.infer<typeof formSchema>): Promise<FetchResult<addMovieRespose>> {

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


  const res = await globalMutater<addMovieRespose>({ mutationQuery: POST_MOVIE, variables: { movie: movie } })

  return res


}


//*================================================== updateMovie ======================================================

interface UpdateMovieRespose {
  updateMovie: {
    message: string
    slugUrl: string
    movieName: string
  }
}
export async function updateMovie({ values, id }: { values: z.infer<typeof formSchema>, id: string }): Promise<FetchResult<UpdateMovieRespose>> {

  const UPDATE_MOVIE = gql`
    mutation Mutation($updateMovieId: ID!, $updateMovieParams: MovieInput) {
      updateMovie(id: $updateMovieId, updateMovieParams: $updateMovieParams) {
        movieName
        message
        slugUrl
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


  return await globalMutater<UpdateMovieRespose>({ mutationQuery: UPDATE_MOVIE, variables: { updateMovieId: id, updateMovieParams: movie } })
}

//*================================================= DeleteMovie =========================================================

export async function deleteMovie({ id }: { id: string }): Promise<FetchResult<string>> {

  const DELETE_MOVIE = gql`
    mutation DeleteMovie($deleteMovieId: ID) {
      deleteMovie(id: $deleteMovieId)
    }
  `
  return await globalMutater<string>({ mutationQuery: DELETE_MOVIE, variables: { deleteMovieId: id } })
}

//*========================================= handleAuthenticationCheck ====================================================
export async function handleAuthenticationCheck() {

  const GET_ADMIN = gql`
  query GetAdmin {
  getAdmin
}
`

  const res = await globalFetcher<{ getAdmin: string }>({ url: GET_ADMIN })

  return res

}