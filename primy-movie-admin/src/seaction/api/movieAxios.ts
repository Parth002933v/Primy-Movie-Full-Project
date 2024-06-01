import axios, { AxiosResponse } from "axios";

interface MovieModel {
  _id: string;
  name: string;
  slugUrl: string;

  posterImage: string;
}

export interface MovieResponse {
  statusCode: number;
  length: number;
  TotalPages: number;
  message: string;
  data: MovieModel[];
}

export interface ErrorResponse {
  statusCode: number;
  messgae: string;
}

export interface MoviedetailData {
  _id: string;
  name: string;
  content: string;
  slugUrl: string;
  posterImage: string;
  bannerImage: string;
  screenShorts: string[];
  downloadLink: { _id: string; link: string; text: string }[];
  releaseYear: number;
  genre: { _id: string; name: string }[];
  languages: { _id: string; languageName: string }[];
  isDualAudio: boolean;
  videoQualitys: { _id: string; Quality: string; Nickname: string }[];
  Seasons: [];
  isSeries: boolean;
  category: { _id: string; name: string };
  ageRating: { _id: string; rating: string; defination: string };
  movieProvider: {
    _id: string;
    providerName: string;
    image: string;
  };
}
export interface MovieDetailRespose {
  statusCode: number;
  message: string;
  data: MoviedetailData;
}

interface FetchMovieParams {
  page?: string;
}
export const fetchMovie = async (
  params: FetchMovieParams = {}
): Promise<MovieResponse> => {
  const response: AxiosResponse<MovieResponse | ErrorResponse> =
    await axios.get(`${import.meta.env.VITE_API_URL}/movies/`, {
      params: params,
    });

  if (response.data.statusCode === 200) {
    return response.data as MovieResponse;
  } else {
    throw new Error((response.data as ErrorResponse).messgae);
  }
};

export const postMovie = async (newMovie: any) => {
  console.log(localStorage.getItem("token"));

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/movies`,

    newMovie,
    {
      params: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return response.data;
};

export const getMovieBySlugUrl = async (slugUrl: string) => {
  const res: AxiosResponse<MovieDetailRespose | ErrorResponse> =
    await axios.get(`${import.meta.env.VITE_API_URL}/movies/${slugUrl}`);

  if (res.data.statusCode == 200) {
    return res.data as MovieDetailRespose;
  } else {
    throw new Error((res.data as ErrorResponse).messgae);
  }
};

export const editMovie = async ({
  id,
  newMovie,
}: {
  newMovie: any;
  id: string;
}) => {
  console.log(localStorage.getItem("token"));

  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/movies/edit/${id}`,

    newMovie,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return response.data;
};
