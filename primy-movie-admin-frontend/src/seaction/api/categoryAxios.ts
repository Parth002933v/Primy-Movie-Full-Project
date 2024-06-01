import axios from "axios";

export interface CategoryModel {
  _id: string;
  name: string;
}
export const fetchCategory = async (): Promise<CategoryModel[]> => {
  const response = await axios.get<{ data: CategoryModel[] }>(
    `${import.meta.env.VITE_API_URL}/category/`
  );

  return response.data.data;
};
