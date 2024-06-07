import AgeRatingModel from "../../model/ageRating_model";
import { asyncResolverHandler } from "../../utils/asyncHandler";

const ageRatingResolver = {
  Query: {
    ageRatings: asyncResolverHandler(async () => {
      const ageRatings = await AgeRatingModel.find();
      return ageRatings;
    }),
  },
};

export default ageRatingResolver;
