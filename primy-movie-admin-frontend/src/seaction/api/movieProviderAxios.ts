import axios from "axios";

export interface MovieProviderModel {
  _id: string;
  providerName: string;
}
export const fetchMovieProvider = async (): Promise<MovieProviderModel[]> => {
  const response = await axios.get<{ data: MovieProviderModel[] }>(
    `${import.meta.env.VITE_API_URL}/movie-provider/`
  );

  return response.data.data;
};
