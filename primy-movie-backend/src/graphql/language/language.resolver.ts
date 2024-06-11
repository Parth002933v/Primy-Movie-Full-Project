import GenreModel from "../../model/genre_model";
import LanguageModel from "../../model/languages_model";
import { asyncResolverHandler } from "../../utils/asyncHandler";

import CustomError, { errorCodeEnum } from "../../utils/ErrorObject";

export const languageResolver = {
  Query: {
    languages: asyncResolverHandler(async () => {


      const allLanguages = await LanguageModel.find();
      
      if (allLanguages.length == 0)
        throw new CustomError({
          message: "there no language found in database",
          errorCode: errorCodeEnum.NOT_FOUND,
        });

      return allLanguages;
    }),
  },
};
