import { Query } from "mongoose";
import { asyncResolverHandler } from "../../utils/asyncHandler";
import MovieModel from "../../model/movie_model";

export const movieResolver = {
  Query: {
    movies: asyncResolverHandler(async () => {
      const Movies = await MovieModel.find();
      
    }),
  },
};
