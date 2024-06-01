import axios from "axios";

export interface AgeRatingModel {
  _id: string;
  rating: string;
  defination: string;
}
export const fetchAgeRating = async (): Promise<AgeRatingModel[]> => {
  const response = await axios.get<{ data: AgeRatingModel[] }>(
    `${import.meta.env.VITE_API_URL}/age-rating/`
  );

  return response.data.data;
};
