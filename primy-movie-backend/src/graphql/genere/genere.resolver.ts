import GenreModel from "../../model/genre_model";
import { asyncResolverHandler } from "../../utils/asyncHandler";

import CustomError, { errorCodeEnum } from "../../utils/ErrorObject";

export const genereResolver = {
  Query: {
    generes: asyncResolverHandler(async () => {
      const allGenere = await GenreModel.find();

      if (allGenere.length == 0)
        throw new CustomError({
          message: "there no genere found in database",
          errorCode: errorCodeEnum.NOT_FOUND,
        });

      return allGenere;
    }),
  },
};
