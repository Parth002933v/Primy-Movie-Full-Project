import axios from "axios";

export interface GenereModel {
  _id: string;
  name: string;
}
export const fetchGeneres = async (): Promise<GenereModel[]> => {
  const response = await axios.get<{ data: GenereModel[] }>(
    `${import.meta.env.VITE_API_URL}/generes/`
  );

  return response.data.data;
};

export const postGenere = async (newGenere: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/generes/`,
      {
        genere: newGenere,
      }
    );

    if (response.status == 409) {
      throw new Error("There Data is alredy Available");
    }

    return response;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};
