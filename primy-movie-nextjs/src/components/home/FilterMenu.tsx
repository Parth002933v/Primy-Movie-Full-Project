import { Filter } from "lucide-react";
import FilterMenuItem from "./filter-menu-item";
import {
  ageRating_gql,
  AgeRatingRespose,
  categori_gql,
  categoryRespose,
  Genere_gql,
  genereRespose,
  Language_gql,
  languageRespose,
  videoQuality_gql,
  videoQualityRespose,
} from "@/types/other-types";

export default function FilterMenu({ genere, ageRating, categorys, languages, VideQuelity }: {
  genere: Genere_gql[];
  ageRating: ageRating_gql[];
  categorys: categori_gql[];
  languages: Language_gql[];
  VideQuelity: videoQuality_gql[];
}) {
  return (
    <div className="flex flex-wrap max-md:mr-5 max-lg:mx-2 lg:mx-20 my-6 max-md:my-3  items-center justify-start">
      <div className="flex items-center justify-center font-bold text-lg text-gray-600 max-md:text-sm ">
        <Filter size={17} />
        Filters
      </div>
      <FilterMenuItem
        key={1}
        title="Genres"
        menuItems={genere?.map((m) => {
          return { id: m._id, path: `/genere/${m.name}`, itemName: m.name };
        })}
      />
      <FilterMenuItem
        key={2}
        title="AgeRating"
        menuItems={ageRating?.map((m) => {
          return {
            id: m._id,
            itemName: m.rating,
            path: `/age-rating/${m.rating}`,
          };
        })}
      />

      <FilterMenuItem
        key={3}
        title="Categorys"
        menuItems={categorys?.map((m) => {
          return {
            id: m._id,
            itemName: m.name,
            path: `/category/${m.name}`,
          };
        })}
      />

      <FilterMenuItem
        key={4}
        title="Languages"
        menuItems={languages?.map((m) => {
          return {
            id: m._id,
            itemName: m.languageName,
            path: `/language/${m.languageName}`,
          };
        })}
      />

      <FilterMenuItem
        key={5}
        title="Quality"
        menuItems={VideQuelity?.map((m) => {
          return {
            id: m._id,
            itemName: m.Quality,
            path: `/quality/${m.Quality}`,
          };
        })}
      />
    </div>
  );
}
