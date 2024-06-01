export interface MovieProvider {
  _id: string;
  providerName: string;
  image: string;
}

export interface MovieProviderResponse {
  statusCode: number;
  length: number;
  message: string;
  data: MovieProvider[];
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
