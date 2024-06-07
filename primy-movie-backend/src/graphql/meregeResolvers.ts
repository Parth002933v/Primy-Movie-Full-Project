import { mergeResolvers } from "@graphql-tools/merge";

import ageRatingResolver from "./ageRating/resolver";
import { adminResolver } from "./admin/resolver";
import { categoryResolver } from "./category/category.resolver";
import { genereResolver } from "./genere/genere.resolver";
import { languageResolver } from "./language/language.resolver";
import { providerTypedef } from "./provider/provider.typedef";
import { providerResolver } from "./provider/provider.resolver";
import { qualityResolver } from "./quality/quality.resolver";

const mergedResolvers = mergeResolvers([
  ageRatingResolver,
  adminResolver,
  categoryResolver,
  genereResolver,
  languageResolver,
  providerResolver,
  qualityResolver
]);

export default mergedResolvers;
