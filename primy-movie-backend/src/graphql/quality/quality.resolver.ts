import VideoQualityModel from "../../model/videoQuality_model";
import { asyncResolverHandler } from "../../utils/asyncHandler";
import CustomError, { errorCodeEnum } from "../../utils/ErrorObject";

export const qualityResolver = {
  Query: {
    videoQualitys: asyncResolverHandler(async () => {
      const videoQualitys = await VideoQualityModel.find();

      if (videoQualitys.length == 0) {
        throw new CustomError({
          message: "There is No data Found",
          errorCode: errorCodeEnum.NOT_FOUND,
        });
      }

      return videoQualitys;
    }),
  },
};
