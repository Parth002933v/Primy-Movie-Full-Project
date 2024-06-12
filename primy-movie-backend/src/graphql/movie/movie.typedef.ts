
export const movieTypeDef = `#graphql
    
  type DownloadLink {
    text: String!
    link: String!
  }

  type Movie {
    _id: ID!
    slugUrl: String!
    name: String!
    content: String!
    posterImage: String!
    bannerImage: String!
    screenShorts: [String!]
    downloadLink: [DownloadLink!]
    releaseYear: Int!
    genre: [Genre!]
    languages: [Language!]
    isDualAudio: Boolean!
    videoQualitys: [VideoQuality!]
    Seasons: [Movie!]
    isSeries: Boolean!
    category: Category!
    ageRating: AgeRating!
    movieProvider: MovieProvider!
    totalDownloads: Int!
    tags: [String!]
  }

  type Genre {
    _id: ID!
    name: String!
  }

  type Language {
    _id: ID!
    languageName: String!
  }

  type VideoQuality {
    _id: ID!
    Quality: String!
    Nickname: String!
  }

  type Category {
    _id: ID!
    name: String!
  }

  type AgeRating {
    _id: ID!
    rating: String!
    defination: String!
  }

  type MovieProvider {
    _id: ID!
    providerName: String!
    image: String!
  }


  input PaginationInput{
    pageNo: Int
  }


  type PaginatedMovies {
    movies: [Movie!]
    TotalPages: Int!
    length: Int!,
  }

  type Query {
    movies(page: PaginationInput): PaginatedMovies
    movieBySlugUrl(slugUrl: ID!): Movie
  }

  input MovieInput {
    name: String!
    content: String!
    posterImage: String!
    bannerImage: String!
    screenShorts: [String!]
    downloadLink: [DownloadLinkInput!]!
    releaseYear: Int!
    genre: [ID!]
    languages: [ID!]
    isDualAudio: Boolean!
    videoQualitys: [ID!]
    seasons: [ID]!
    isSeries: Boolean!
    category: ID!
    ageRating: ID!
    movieProvider: ID!
    tags: [String!]
  }

  input DownloadLinkInput {
    text: String!
    link: String!
  }


  type ceatedMovieOutput{
    movieName: String!
    slugUrl: String! 
    message: String!
  }


  type Mutation{
    addMovie(movie: MovieInput) : ceatedMovieOutput
    updateMovie(updateMovieParams: MovieInput, id: ID!): String
  }
`;