import MovieProviderModel from "../../model/movieProvider";
import { asyncResolverHandler } from "../../utils/asyncHandler";
import CustomError, { errorCodeEnum } from "../../utils/ErrorObject";

export const providerResolver = {
  Query: {
    providers: asyncResolverHandler(async () => {
     
      const movieProviders = await MovieProviderModel.find();

      if (movieProviders.length == 0) {
        throw new CustomError({
          message: "There Is No Movie Provider awailable",
          errorCode: errorCodeEnum.NOT_FOUND,
        });
      }

      return movieProviders;
    }),
  },
};
