import { mergeTypeDefs } from "@graphql-tools/merge";
import ageRatingTypeDef from "./ageRating/typeDef";
import { adminTypeDef } from "./admin/typedef";
import categoryTypeDef from "./category/category.typedef";
import genereTypeDef from "./genere/genere.typedef";
import languageTypeDef from "./language/language.typedef";
import { providerTypedef } from "./provider/provider.typedef";
import { qualityTypedef } from "./quality/quality.typedef";
import { movieTypeDef } from "./movie/movie.typedef";

const mergeDTypeDefs = mergeTypeDefs([
  ageRatingTypeDef,
  adminTypeDef,
  categoryTypeDef,
  genereTypeDef,
  languageTypeDef,
  providerTypedef,
  qualityTypedef,
  movieTypeDef
]);

export default mergeDTypeDefs;
