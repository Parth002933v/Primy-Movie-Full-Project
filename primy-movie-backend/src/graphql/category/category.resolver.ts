import CategoryModel from "../../model/category_model";
import { asyncResolverHandler } from "../../utils/asyncHandler";
import CustomError, { errorCodeEnum } from "../../utils/ErrorObject";

export const categoryResolver = {
  Query: {
    categoris: asyncResolverHandler(async () => {
      const categorys = await CategoryModel.find();

      if (categorys.length == 0) {
        throw new CustomError({
          message: "category is emty",
          errorCode: errorCodeEnum.NOT_FOUND,
        });
      }

      return categorys;
    }),
  },
};
