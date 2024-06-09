interface MovieData {
  _id: string;
  slugUrl: string;
  name: string;
  posterImage: string;
}

export interface MovieResponse {
  statusCode: number;
  length: number;
  TotalPages: number;
  message: string;
  data: MovieData[];
}



interface MovieDetailDownloadLinkData {
  _id: string;
  link: string;
  text: string;
}
interface MovieDetailgenereData {
  _id: string;
  name: string;
}

interface MovieDetailLanguageData {
  _id: string;
  languageName: string;
}

interface MovieDetailVideoQualityData {
  _id: string;
  Quality: string;
  Nickname: string;
}

interface MovieDetailCategoryData {
  _id: string;
  name: string;
}

interface MovieDetailAgeRatingData {
  _id: string;
  rating: string;
  defination: string;
}

export interface MoviedetailData {
  _id: string;
  name: string;
  content: string;
  posterImage: string;
  bannerImage: string;
  screenShorts: string[];
  downloadLink: MovieDetailDownloadLinkData[];
  releaseYear: number;
  genre: MovieDetailgenereData[];
  languages: MovieDetailLanguageData[];
  isDualAudio: boolean;
  videoQualitys: MovieDetailVideoQualityData[];
  Seasons: [];
  isSeries: boolean;
  category: MovieDetailCategoryData;
  ageRating: MovieDetailAgeRatingData;
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

// const data = {
//   statusCode: 200,
//   message: "Movie fetched Successful!",
//   data: {
//     _id: "664c865b1b16c9c7cb7a2dd8",
//     name: "Download The Fall Guy (2024) WEB-DL Dual Audio {ORG 5.1 Hindi + English} 480p [415MB] | 720p [1.2GB] | 1080p [2.7GB] | 2160p 4K SDR",
//     content:
//       'The Fall Guy is a movie that follows Colt Seavers, an out-of-work stuntman, who gets invited by his ex-girlfriend, making her big-budget Hollywood directing debut, to be the stuntman for a hot up-and-coming action star who\'s a total jerk1. The official plot synopsis states that Colt is "a battle-scarred stuntman who, having left the business a year earlier to focus on his physical and mental health, is drafted back into service when the star of a mega-budget studio movie — being directed by his ex, Jody Moreno — goes missing"2. Ryan Gosling stars as Colt Seavers in the movie3',
//     posterImage:
//       "https://m.media-amazon.com/images/M/MV5BMjA5ZjA3ZjMtMzg2ZC00ZDc4LTk3MTctYTE1ZTUzZDIzMjQyXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_FMjpg_UY2500_.jpg",
//     bannerImage:
//       "https://m.media-amazon.com/images/M/MV5BMzRiOTJkYmMtMjlhZC00YTM4LTkwYjAtZjMwZGFjMmM4MWQ3XkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_FMjpg_UX960_.jpg",
//     screenShorts: [
//       "https://imgbb.top/en/X1nm5BQ2VFycrmG",
//       "https://imgbb.top/en/oN7Utf9p4WDOBTt",
//       "https://imgbb.top/en/lWYet63JIWT1sKO",
//       "https://imgbb.top/en/wEex2N5MP95GFnQ",
//       "https://imgbb.top/en/bwb76yPz4DSGSb1",
//     ],
//     downloadLink: [
//       {
//         text: "1080p Full HD",
//         link: "https://teraboxlinks.com/C06pLck",
//         _id: "664c865b1b16c9c7cb7a2dd9",
//       },
//     ],
//     releaseYear: 2024,
//     genre: [
//       {
//         _id: "6647032e3976936b2c670a67",
//         name: "Action",
//       },
//       {
//         _id: "6647067027734b2871ddc4ae",
//         name: "Drama",
//       },
//       {
//         _id: "6647064427734b2871ddc4ac",
//         name: "Comedy",
//       },
//     ],
//     languages: [
//       {
//         _id: "6647059627734b2871ddc4a8",
//         languageName: "Hindi",
//       },
//       {
//         _id: "664705bb27734b2871ddc4a9",
//         languageName: "English",
//       },
//     ],
//     isDualAudio: false,
//     videoQualitys: [
//       {
//         _id: "66479b537b387fbbd520fc23",
//         Quality: "1080p",
//         Nickname: "Full HD",
//       },
//     ],
//     Seasons: [],
//     isSeries: false,
//     category: {
//       _id: "6647094727734b2871ddc4be",
//       name: "English",
//     },
//     ageRating: {
//       _id: "66479635d054635d6bd3efa3",
//       rating: "PG-13",
//       defination: "Parents Strongly Cautioned",
//     },
//     movieProvider: {
//       _id: "664773bb0a1d050b7223204e",
//       providerName: "netflix",
//       image: "/images/icons/1715958715344-netflix.webp",
//     },
//   },
// };
