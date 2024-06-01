import axios from "axios";

export interface LanguageModel {
  _id: string;
  languageName: string;
}
export const fetchLanguages = async (): Promise<LanguageModel[]> => {
  const response = await axios.get<{ data: LanguageModel[] }>(
    `${import.meta.env.VITE_API_URL}/language/`
  );


  return response.data.data;
};
