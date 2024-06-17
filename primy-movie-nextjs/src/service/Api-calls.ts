"use server"

import { IMovieDetail_gql, IMoviesResponse_gql } from "@/types/movie-types";
import { filterData } from "@/types/other-types";
import { globalFetcher } from "@/utils/fetcher";

import { ApolloQueryResult, gql } from "@apollo/client";



//* ================================== filtering data ====================================
export async function getFileringData(): Promise<ApolloQueryResult<filterData>> {
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

    const res = await globalFetcher<filterData>({ url: GET_FILTERS });

    return res

}


//*===================================== paginated movie =========================================
export async function getMovieData({ page }: { page?: string }): Promise<ApolloQueryResult<IMoviesResponse_gql>> {

    const GET_Movies = gql`
     query Movies($page: PaginationInput) {
        movies(page: $page) {
          length
          TotalPages
          movies {
            slugUrl
            _id
            name
            posterImage
      }
    }
  }`

    const pageNoToInt = Number(page)

    const res = await globalFetcher<IMoviesResponse_gql>({ url: GET_Movies, variables: { page: { pageNo: pageNoToInt } } });

    return res

}


//*==================================== movie detail ============================================
export async function getMovieDetail({ detail }: { detail?: string }): Promise<ApolloQueryResult<IMovieDetail_gql>> {

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
        }
      }
  `

    const res = await globalFetcher<IMovieDetail_gql>({ url: GET_MovieDetail, variables: { slugUrl: detail } });

    return res

}
