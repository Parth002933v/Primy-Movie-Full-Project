
export interface MovieProviderResponse {
  statusCode: number;
  length: number;
  message: string;
  data: MovieProvider_gql[];
}

export interface AgeRatingRespose {
  statusCode: number;
  length: number;
  data: { _id: string; rating: string; defination: string }[];
}

export interface categoryRespose {
  statusCode: number;
  length: number;
  data: { _id: string; name: string }[];
}

export interface genereRespose {
  statusCode: number;
  length: number;
  data: { _id: string; name: string }[];
}

export interface languageRespose {
  statusCode: number;
  length: number;
  data: { _id: string; languageName: string }[];
}

export interface videoQualityRespose {
  statusCode: number;
  length: number;
  data: { _id: string; Quality: string; Nickname: string }[];
}

//==============================================ApolloGraphql=======================================

export interface MovieProvider_gql {
  _id: string;
  providerName: string;
  image: string;
}

export interface Language_gql {
  _id: string;
  name: string;
}

export interface Genere_gql {
  _id: string;
  name: string;
}

export interface categori_gql {
  _id: string;
  name: string
}


export interface ageRating_gql {
  _id: string;
  rating: string;
  defination: string
}



export interface videoQuality_gql {
  _id: string;
  Quality: string;
  Nickname: string
}




export interface filterData {
  "providers": MovieProvider_gql[]
  "languages": Language_gql[]
  "generes": Genere_gql[],
  "categoris": categori_gql[]
  "ageRatings": ageRating_gql[]
  "videoQualitys": videoQuality_gql[]
}