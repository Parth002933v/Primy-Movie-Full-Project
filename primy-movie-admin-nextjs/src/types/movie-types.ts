import { ageRating_gql, categori_gql, Genere_gql, Language_gql, MovieProvider_gql, videoQuality_gql } from "./other-types";
///==============================================ApolloGraphql=======================================



interface IMovie_gql {
  slugUrl: string,
  _id: string,
  name: string,
  posterImage: string
}

export interface IMoviesResponse_gql {
  movies: {
    length: number,
    TotalPages: number,
    movies: IMovie_gql[],
  }
}


export interface IMovieDetail_gql {
  movieBySlugUrl: {
    _id: string,
    name: string,
    content: string,
    posterImage: string,
    bannerImage: string,
    screenShorts: string[],
    downloadLink: [
      {
        _id: string,
        text: string,
        link: string
      }
    ],
    Seasons: IMovie_gql[],
    releaseYear: number,
    genre: Genere_gql[],
    languages: Language_gql[],
    isDualAudio: boolean,
    videoQualitys: videoQuality_gql[],
    isSeries: boolean,
    category: categori_gql,
    ageRating: ageRating_gql,
    movieProvider: MovieProvider_gql,
    tags: string[]
  }

}





