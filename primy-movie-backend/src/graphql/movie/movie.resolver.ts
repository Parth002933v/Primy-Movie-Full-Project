import { asyncResolverHandler } from "../../utils/asyncHandler";
import MovieModel from "../../model/movie_model";
import { ApiGraphqlFeatures } from "../../utils/ApiFeatures";
import CustomError, { errorCodeEnum } from "../../utils/ErrorObject";
import AgeRatingModel from "../../model/ageRating_model";
import CategoryModel from "../../model/category_model";
import GenreModel from "../../model/genre_model";
import LanguageModel from "../../model/languages_model";
import MovieProviderModel from "../../model/movieProvider";
import VideoQualityModel from "../../model/videoQuality_model";

export const movieResolver = {
  Query: {
    movies: asyncResolverHandler(async (_:any,{page}: {page:{ pageNo: number}}) => {

      
      const Movie = new ApiGraphqlFeatures({query:MovieModel.find()})      
      
      const filteredQuery = Movie.sort({}).paginate({pageNumber:page.pageNo}).limitFields({})

      const populatedMovie = filteredQuery

      const movies = (await populatedMovie.query) as typeof MovieModel;

      const totalMoviesCount = await MovieModel.countDocuments();

      const totalPages = Math.ceil(totalMoviesCount / 20);

      if (movies.length == 0) {
        throw new CustomError({
          message: "There is no movie awailable",
          errorCode: errorCodeEnum.NOT_FOUND,
        });
      }

      return {
        TotalPages: totalPages,
        length: movies.length,
        movies: movies,
      };
    }
  ),

    movieById: asyncResolverHandler(async (_:any, { slugUrl }:{ slugUrl : string }) => {

      const MovieObj = new ApiGraphqlFeatures({query:MovieModel.findOne({ slugUrl:slugUrl})})

      const movie = await MovieObj.query

      if (!movie || movie.length == 0) {
        throw new CustomError({
          message: `sorry we not able to file your movie`,
          errorCode: errorCodeEnum.NOT_FOUND,
        });
      }

      
  
      return  movie;

    }
  ),
  },
  Movie: {
    genre: async (parent : any) => {      
      return await GenreModel.find({ _id: { $in: parent.genre } });
    },
    languages: async (parent : any) => {
      return await LanguageModel.find({ _id: { $in: parent.languages } });
    },
    videoQualitys: async (parent : any) => {
      return await VideoQualityModel.find({ _id: { $in: parent.videoQualitys } });
    },
    category: async (parent : any) => {
      return await CategoryModel.findById(parent.category);
    },
    ageRating: async (parent : any) => {
      return await AgeRatingModel.findById(parent.ageRating);
    },
    movieProvider: async (parent : any) => {
      return await MovieProviderModel.findById(parent.movieProvider);
    },
    Seasons: async (parent : any) => {  
      return await MovieModel.find({ _id: { $in: parent.Seasons } });
    },
  },
};
