import axios from "axios";

export interface VideoQualityModel {
  _id: string;
  Quality: string;
  Nickname: string;
}
export const fetchVideoQuality = async (): Promise<VideoQualityModel[]> => {
  const response = await axios.get<{ data: VideoQualityModel[] }>(
    `${import.meta.env.VITE_API_URL}/video-quality/`
  );

  return response.data.data;
};
