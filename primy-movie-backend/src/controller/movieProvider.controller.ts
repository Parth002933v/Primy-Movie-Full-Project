import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { SendResponse } from "../utils/ApiResponse";
import MovieProviderModel from "../model/movieProvider";
import CustomError from "../utils/ErrorObject";
import MovieModel from "../model/movie_model";

export const handleGetMovieProvider = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const movieProviders = await MovieProviderModel.find();

    if (movieProviders.length == 0) {
      throw new CustomError({
        message: "There Is No Movie Provider awailable",
        errorCode: 404,
      });
    }

    return SendResponse({
      res: res,
      length: movieProviders.length,
      message: "Data fetched successfully!",
      statusCode: 200,
      data: movieProviders,
    });
  }
);

interface handleCreateMovieProviderParams {
  providerName: string;
}
export const handleCreateMovieProvider = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { providerName }: handleCreateMovieProviderParams = req.body;

    if (!providerName) {
      throw new CustomError({
        message: "providerName is not provided",
        errorCode: 400,
      });
    }

    if (!req.file) {
      throw new CustomError({
        message: "no image uploaded",
        errorCode: 400,
      });
    }

    const imageURL = `${req.file.destination.replace("./public", "")}${
      req.file.filename
    }`;

    const newMovieProvider = await MovieProviderModel.create({
      providerName: providerName,
      image: imageURL,
    });

    if (!newMovieProvider) {
      throw new CustomError({
        message: "Inernal Server Error",
        errorCode: 500,
      });
    }

    return SendResponse({
      res: res,
      message: " data uploaded successfully!",
      statusCode: 200,
      data: newMovieProvider,
    });
  }
);
