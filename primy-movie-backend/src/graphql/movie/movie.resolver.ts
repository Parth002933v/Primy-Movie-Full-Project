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
import { PassportContext } from "graphql-passport";
import { convertToSlugUrl } from "../../utils/utils";

export const movieResolver = {
  Query: {
    movies: asyncResolverHandler(async (_: any, { page }: { page: { pageNo: number } }, context: PassportContext<any, any>) => {

      const Movie = new ApiGraphqlFeatures({ query: MovieModel.find() })

      const filteredQuery = Movie.sort({}).paginate({ pageNumber: page.pageNo }).limitFields({})

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

    movieBySlugUrl: asyncResolverHandler(async (_: any, { slugUrl }: { slugUrl: string }) => {

      const MovieObj = new ApiGraphqlFeatures({ query: MovieModel.findOne({ slugUrl: slugUrl }) })

      const movie = await MovieObj.query

      if (!movie || movie.length == 0) {
        throw new CustomError({
          message: `sorry we not able to file your movie`,
          errorCode: errorCodeEnum.NOT_FOUND,
        });
      }



      return movie;

    }
    ),
  },
  Movie: {
    genre: async (parent: any) => {
      return await GenreModel.find({ _id: { $in: parent.genre } });
    },
    languages: async (parent: any) => {
      return await LanguageModel.find({ _id: { $in: parent.languages } });
    },
    videoQualitys: async (parent: any) => {
      return await VideoQualityModel.find({ _id: { $in: parent.videoQualitys } });
    },
    category: async (parent: any) => {
      return await CategoryModel.findById(parent.category);
    },
    ageRating: async (parent: any) => {
      return await AgeRatingModel.findById(parent.ageRating);
    },
    movieProvider: async (parent: any) => {
      return await MovieProviderModel.findById(parent.movieProvider);
    },
    Seasons: async (parent: any) => {
      return await MovieModel.find({ _id: { $in: parent.Seasons } });
    },
  },




  Mutation: {
    addMovie: asyncResolverHandler(async (_: any, { movie }: { movie: movieInterface }, content: PassportContext<any, any>) => {


      // if (content.isUnauthenticated()) {

      //   throw new CustomError({ errorCode: errorCodeEnum.UNAUTHENTICATED, message: "You're not authorised to perform this operation" })
      // }

      // Validate that referenced documents exist
      const [
        categoryExists,
        ageRatingExists,
        movieProviderExists,
        genresExist,
        languagesExist,
        videoQualitysExist,
        seasonsExist
      ] = await Promise.all([
        CategoryModel.exists({ _id: movie.category }),
        AgeRatingModel.exists({ _id: movie.ageRating }),
        MovieProviderModel.exists({ _id: movie.movieProvider }),
        GenreModel.find({ _id: { $in: movie.genre } }).select("_id"),
        LanguageModel.find({ _id: { $in: movie.languages } }).select("_id"),
        VideoQualityModel.find({ _id: { $in: movie.videoQualitys } }).select("_id"),
        MovieModel.find({ _id: { $in: movie.seasons } }).select("_id"),
      ]);

      console.log(seasonsExist, "seasonsExist");


      if (!categoryExists) {
        throw new CustomError({
          message: "Invalid category ID",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (!ageRatingExists) {
        throw new CustomError({
          message: "Invalid age rating ID",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (!movieProviderExists) {
        throw new CustomError({
          message: "Invalid movie provider ID",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (genresExist.length !== movie.genre.length) {
        throw new CustomError({
          message: "Invalid genre ID(s)",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (languagesExist.length !== movie.languages.length) {
        throw new CustomError({
          message: "Invalid language ID(s)",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (videoQualitysExist.length !== movie.videoQualitys.length) {
        throw new CustomError({
          message: "Invalid video quality ID(s)",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (seasonsExist.length !== movie.seasons.length) {
        console.log(seasonsExist.length !== movie.seasons.length);

        throw new CustomError({
          message: "Invalid season ID(s)",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }

      const slugUrlValue = convertToSlugUrl({ str: movie.name })


      const newMovie = await MovieModel.create({ ...movie, slugUrl: slugUrlValue });

      if (!newMovie) {
        throw new CustomError({
          message: "somthing went wrong",
          errorCode: errorCodeEnum.BAD_REQUEST,
        });
      }
      return {
        movieName: newMovie.name,
        slugUrl: newMovie.slugUrl,
        message: "Movie Added Successfully!"
      }
    }),

    updateMovie: asyncResolverHandler(async (_: any, { updateMovieParams, id }: { updateMovieParams: movieInterface, id: string }, content: PassportContext<any, any>) => {

      if (content.isUnauthenticated()) {

        throw new CustomError({ errorCode: errorCodeEnum.UNAUTHENTICATED, message: "You're not authorised to perform this operation" })
      }

      // Validate that referenced documents exist
      const [
        categoryExists,
        ageRatingExists,
        movieProviderExists,
        genresExist,
        languagesExist,
        videoQualitysExist,
      ] = await Promise.all([
        CategoryModel.exists({ _id: updateMovieParams.category }),
        AgeRatingModel.exists({ _id: updateMovieParams.ageRating }),
        MovieProviderModel.exists({ _id: updateMovieParams.movieProvider }),
        GenreModel.find({ _id: { $in: updateMovieParams.genre } }).select("_id"),
        LanguageModel.find({ _id: { $in: updateMovieParams.languages } }).select("_id"),
        VideoQualityModel.find({ _id: { $in: updateMovieParams.videoQualitys } }).select("_id"),
      ]);


      if (!categoryExists) {
        throw new CustomError({
          message: "Invalid category ID",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (!ageRatingExists) {
        throw new CustomError({
          message: "Invalid age rating ID",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (!movieProviderExists) {
        throw new CustomError({
          message: "Invalid movie provider ID",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (genresExist.length !== updateMovieParams.genre.length) {
        throw new CustomError({
          message: "Invalid genre ID(s)",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (languagesExist.length !== updateMovieParams.languages.length) {
        throw new CustomError({
          message: "Invalid language ID(s)",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }
      if (videoQualitysExist.length !== updateMovieParams.videoQualitys.length) {
        throw new CustomError({
          message: "Invalid video quality ID(s)",
          errorCode: errorCodeEnum.BAD_USER_INPUT,
        });
      }


      const updatedMovie = await MovieModel.findByIdAndUpdate(id, { updateMovieParams })


      if (!updatedMovie) {
        throw new CustomError({
          message: "somthing went wrong",
          errorCode: errorCodeEnum.BAD_REQUEST,
        });
      }


      return "Movie Updated Successfully!"

    })





  }
};




interface movieInterface {
  name: string,
  content: string,
  posterImage: string,
  bannerImage: string,
  screenShorts: string[],
  downloadLink: [
    {
      text: string,
      link: string
    }
  ],
  releaseYear: number,
  genre: string[],
  languages: string[],
  isDualAudio: boolean,
  videoQualitys: string[],
  seasons: string[]
  isSeries: boolean,
  category: string,
  ageRating: string,
  movieProvider: string,
  tags: string[]
}

