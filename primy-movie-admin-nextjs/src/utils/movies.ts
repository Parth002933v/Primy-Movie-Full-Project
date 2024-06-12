// import axios, { AxiosResponse } from "axios";

// interface MovieModel {
//   _id: string;
//   name: string;
//   posterImage: string;
// }

// export interface MovieResponse {
//   statusCode: number;
//   length: number;
//   TotalPages: number;
//   message: string;
//   data: MovieModel[];
// }

// export interface ErrorResponse {
//   statusCode: number;
//   messgae: string;
// }

// interface FetchMovieParams {
//   page?: string;
// }
// export const fetchMovie = async (
//   params: FetchMovieParams
// ): Promise<MovieResponse> => {
//   const response: AxiosResponse<MovieResponse | ErrorResponse> = await fetch(
//     `${process.env.BASE_URL}/movies/${params.page ?? `page${params.page}`}`
//   );

//   console.log(response.data);

//   if (response.data.statusCode === 200) {
//     return response.data as MovieResponse;
//   } else {
//     throw new Error((response.data as ErrorResponse).messgae);
//   }
// };
