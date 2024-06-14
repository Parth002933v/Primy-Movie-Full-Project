import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { editMovie, getMovieBySlugUrl } from "../api/movieAxios";
import axios, { AxiosError } from "axios";
import react from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MoveiFormValuesType } from "./AddMovie";
import { fetchAgeRating } from "../api/ageRatingAxios";
import { fetchMovieProvider } from "../api/movieProviderAxios";
import { fetchCategory } from "../api/categoryAxios";
import { MultiSelect, SelectOption } from "../component/TempSelect";
import { fetchVideoQuality } from "../api/videoQuality";
import { fetchLanguages } from "../api/langiageAxios";
import { fetchGeneres } from "../api/generesAxios";
import { Button } from "@/components/ui/button";
import MyCard from "../component/MyCard";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { useQuery as gqlQuery, gql } from "@apollo/client";
import { IMovieDetail_gql } from "@/utils/movie-types";
import { filterData } from "@/utils/other-types";




export default function EditPage() {
  const { slugUrl } = useParams();
  // const [apiError, setApiError] = react.useState<string | null>(null);
  // const [isOpen, setOpen] = react.useState(false);
  const [showLoader, setLoader] = react.useState(false);

  const form = useForm<MoveiFormValuesType>({
    defaultValues: {
      name: "",
      content: "",
      slugUrl: "",
      posterImage: "",
      bannerImage: "",
      screenShorts: [{ link: "" }],
      downloadLink: [{ link: "", text: "" }],
      isDualAudio: false,
      Seasons: [],
      isSeries: false,
      tags: [],
    },
  });
  const { register, control, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const { mutateAsync: updateMovieMutation } = useMutation({
    mutationFn: editMovie,

    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        // setApiError(
        //   error.response?.data?.message ||
        //     error.message ||
        //     "An unknown error occurred"
        // );
      } else {
        // setApiError("An unknown error occurred");
      }

      // setApiError(error.response?.data?.message || "An error occurred");
      // setOpen(true);
      setLoader(false);
    },

    onSuccess: () => {
      setLoader(false);
      // setOpen(false);
    },
  });

  const onSubmit = async (data: MoveiFormValuesType) => {
    const result = JSON.stringify({
      ...data,
      genre: genere.map((m) => m.__id),
      languages: language.map((m) => m.__id),
      category: category?.__id,
      ageRating: ageRating?.__id,
      movieProvider: movieProvider?.__id,
      videoQualitys: videoQuality.map((m) => m.__id),
      screenShorts: data.screenShorts.map((m) => m.link),
      Seasons: data.Seasons.map((m) => m._id),
      tags: data.tags?.map((m) => m._id),
    });

    console.log(result);

    setLoader(true);

    // await updateMovieMutation({ newMovie: result, id: movieData!.data._id });

    console.log(result);
  };

  ////////useFieldArray////////
  const {
    fields: screenShortsFields,
    append: screenShortsAppend,
    remove: screenShortsRemove,
  } = useFieldArray({
    name: "screenShorts",
    control: control,
  });

  const {
    fields: downloadLinkFields,
    append: downloadLinkAppend,
    remove: downloadLinkRemove,
  } = useFieldArray({
    name: "downloadLink",
    control: control,
  });

  const {
    fields: movieSeasonfields,
    append: movieSeasonAppend,
    remove: movieSeasonRemove,
  } = useFieldArray({
    name: "Seasons",
    control: control,
  });

  const {
    fields: tagsFields,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({
    name: "tags",
    control: control,
  });

  ///////////////// useQuerys/////////////////

  const GET_FILTERS = gql`
  query filteringData {
  providers {
    image
    providerName
    _id
  }
  languages {
    _id
    languageName
  }
  generes {
    name
    _id
  }
  categoris {
    name
    _id
  }
  ageRatings {
    _id
    rating
    defination
  }
  videoQualitys {
    Nickname
    Quality
    _id
  }
}`

  const { data: filData } = gqlQuery<filterData>(GET_FILTERS);





  const [genere, setGenere] = react.useState<SelectOption[]>([]);
  const [language, setlanguages] = react.useState<SelectOption[]>([]);
  const [videoQuality, setvideoQuality] = react.useState<SelectOption[]>([]);
  const [category, setcategory] = react.useState<SelectOption | undefined>(
    undefined
  );
  const [ageRating, setageRating] = react.useState<SelectOption | undefined>(
    undefined
  );
  const [movieProvider, setMovieProvider] = react.useState<
    SelectOption | undefined
  >(undefined);

  // const {
  //   data: movieData,
  // } = useQuery({
  //   queryKey: ["movieDetail"],
  //   queryFn: () => getMovieBySlugUrl(slugUrl!),
  //   staleTime: Infinity,
  //   cacheTime: 0,
  //   retry: false,
  // });



  const GET_MovieDetail = gql`
  query movieBySlugUrl($slugUrl: ID!) {
    movieBySlugUrl(slugUrl: $slugUrl) {
      _id
      slugUrl
      name
      posterImage
      bannerImage
      screenShorts
      content
      downloadLink {
        link
        text
      }
      releaseYear
      genre {
        _id
        name
      }
      languages {
        languageName
        _id
      }
      isDualAudio
      videoQualitys {
        Nickname
        Quality
        _id
      }
      Seasons {
        _id
        slugUrl
        name
        posterImage
      }
      isSeries
      category {
        _id
        name
      }
      ageRating {
        defination
        rating
        _id
      }
      movieProvider {
        image
        providerName
        _id
      }
    }
  }
`


  const { loading, error, data: moviesDetailData } = gqlQuery<IMovieDetail_gql>(GET_MovieDetail, { variables: { slugUrl: slugUrl } });



  react.useEffect(() => {
    if (moviesDetailData?.movieBySlugUrl) {
      reset({
        name: moviesDetailData!.movieBySlugUrl.name,
        content: moviesDetailData!.movieBySlugUrl.content,
        slugUrl: moviesDetailData!.movieBySlugUrl.slugUrl,
        posterImage: moviesDetailData!.movieBySlugUrl.posterImage,
        bannerImage: moviesDetailData!.movieBySlugUrl.bannerImage,
        screenShorts: moviesDetailData!.movieBySlugUrl.screenShorts.map((m) => {
          return { link: m };
        }),
        releaseYear: moviesDetailData!.movieBySlugUrl.releaseYear,

        downloadLink: moviesDetailData!.movieBySlugUrl.downloadLink,
        Seasons: moviesDetailData!.movieBySlugUrl.Seasons,
        isDualAudio: moviesDetailData?.movieBySlugUrl.isDualAudio,
        isSeries: moviesDetailData?.movieBySlugUrl.isSeries,
      });

      setGenere(
        moviesDetailData!.movieBySlugUrl.genre.map((m) => {
          return { __id: m._id, name: m.name };
        })
      );

      setlanguages(
        moviesDetailData!.movieBySlugUrl.languages.map((m) => {
          return { __id: m._id, name: m.languageName };
        })
      );

      setcategory({
        __id: moviesDetailData!.movieBySlugUrl.category._id,
        name: moviesDetailData!.movieBySlugUrl.category.name,
      });

      setvideoQuality(
        moviesDetailData!.movieBySlugUrl.videoQualitys.map((m) => {
          return { __id: m._id, name: m.Quality };
        })
      );

      setageRating({
        __id: moviesDetailData!.movieBySlugUrl.ageRating._id,
        name: moviesDetailData!.movieBySlugUrl.ageRating.rating,
      });

      setMovieProvider({
        __id: moviesDetailData!.movieBySlugUrl.movieProvider._id,
        name: moviesDetailData!.movieBySlugUrl.movieProvider.providerName,
      });
    }
  }, [moviesDetailData, reset]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);

    return <div>{error.message} </div>;
  }




  ///===================================================================================================================


  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" w-full  grid grid-cols-2 gap-2">
          {/* // name */}
          <div>
            <Label htmlFor="movieName">Movie Name</Label>
            <Textarea
              className="rounded-[5px]"
              id="movieName"
              placeholder="Movie Name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Movie Name is required",
                },
              })}
            />
            <div className="text-red-700 text-sm">{errors.name?.message}</div>
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              className="rounded-[5px]"
              id="content"
              placeholder="About the movie"
              {...register("content", {
                required: {
                  value: true,
                  message: "content is required",
                },
              })}
            />
            <div className="text-red-700 text-sm">
              {" "}
              {errors.content?.message}
            </div>
          </div>

          {/* slug url */}
          <div>
            <Label htmlFor="slug_url">Slug url</Label>
            <Input
              className="rounded-[5px]"
              id="content"
              placeholder="/download-Sample-Movie"
              {...register("slugUrl", {
                required: {
                  value: true,
                  message: "slugUrl is required",
                },
              })}
            />
            <div className="text-red-700 text-sm">
              {errors.slugUrl?.message}
            </div>
          </div>

          {/* posterImage */}
          <div>
            <Label htmlFor="posterImage">posterImage</Label>
            <Input
              type="url"
              id="posterImage"
              placeholder="https://example.com/poster.jpg"
              {...register("posterImage", {
                required: {
                  value: true,
                  message: "posterImage is required",
                },
              })}
            />
            <div className="text-red-700 text-sm">
              {" "}
              {errors.posterImage?.message}
            </div>
          </div>

          {/* bannerImage */}
          <div>
            <Label htmlFor="bannerImage">bannerImage</Label>
            <Input
              type="url"
              id="bannerImage"
              placeholder="https://example.com/banner.jpg"
              {...register("bannerImage", {
                required: {
                  value: true,
                  message: "bannerImage is required",
                },
              })}
            />
            <div className="text-red-700 text-sm">
              {errors.bannerImage?.message}
            </div>
          </div>

          {/* screenShorts */}
          <MyCard
            key={"screenShorts"}
            className="max-h-60 overflow-auto no-scrollbar  border-muted"
          >
            <div className="flex w-full">
              <div key={"screenShortsInner"} className="flex-auto ">
                <Label htmlFor="screenShorts">Screenshot</Label>

                {screenShortsFields.map((f, i) => {
                  return (
                    <div key={i} className="flex gap-2 mb-1 ">
                      <Input
                        key={f.id}
                        type="url"
                        placeholder={`https://example.com/screenshot ${i + 1
                          }.jpg`}
                        {...register(`screenShorts.${i}.link` as const, {
                          required: {
                            value: true,
                            message: "screenShorts link is required",
                          },
                        })}
                      />
                      {i > 0 && (
                        <Button
                          type="button"
                          key={f.link}
                          variant={"destructive"}
                          onClick={() => screenShortsRemove(i)}
                          className="h-8 w-8 items-center rounded-[4px] "
                        >
                          -
                        </Button>
                      )}
                    </div>
                  );
                })}
                <div className="text-red-700 text-sm">
                  {errors.screenShorts?.message}
                </div>
              </div>

              <Button
                type="button"
                onClick={() => screenShortsAppend({ link: "" })}
                className="mt-6 h-8 w-8 rounded-[4px] "
              >
                +
              </Button>
            </div>
          </MyCard>

          {/* downloadLinks */}
          <MyCard className="max-h-60 overflow-auto no-scrollbar border-muted">
            <div className="flex w-full">
              <div className="flex-auto ">
                <Label htmlFor="screenShorts">downloadLinks</Label>

                {downloadLinkFields.map((f, i) => {
                  return (
                    <div key={f.id} className=" gap-2 mb-2  ">
                      <div key={f.id} className="flex">
                        <Input
                          placeholder={"1080p Full HD Bluray"}
                          {...register(`downloadLink.${i}.text` as const, {
                            required: {
                              value: true,
                              message: "link text is required",
                            },
                          })}
                        />
                        <Input
                          type="url"
                          placeholder={`https://example.com/download1080p`}
                          {...register(`downloadLink.${i}.link` as const, {
                            required: {
                              value: true,
                              message: "url is required",
                            },
                          })}
                        />
                        {i > 0 && (
                          <Button
                            type="button"
                            variant={"destructive"}
                            onClick={() => downloadLinkRemove(i)}
                            className="h-8 w-8 items-center rounded-[4px] "
                          >
                            -
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="text-red-700 text-sm">
                  {errors.downloadLink?.message}
                </div>
              </div>

              <Button
                type="button"
                onClick={() => downloadLinkAppend({ link: "", text: "" })}
                className="mt-6 h-8 w-8 rounded-[4px] "
              >
                +
              </Button>
            </div>
          </MyCard>

          {/* Release year */}
          <div>
            <Label htmlFor="release_year">Release year</Label>
            <Input
              type="number"
              className="rounded-[5px]"
              id="Release year"
              placeholder={`${new Date().getFullYear()}`}
              {...register("releaseYear", {
                required: {
                  value: true,
                  message: "releaseYear is required",
                },
                min: {
                  value: 1800,
                  message: "Release year must be at least 1800",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: "Release year cannot exceed the current year",
                },
              })}
            />
            <div className="text-red-700 text-sm">
              {errors.releaseYear?.message}
            </div>
          </div>

          {/* generes */}
          <div>
            <label htmlFor="genres">Genres</label>
            {filData!.generes != null ? (
              <MultiSelect
                multiple
                options={filData!.generes.map((e) => {
                  return { __id: e._id, name: e.name };
                })}
                value={genere}
                onChange={(newGenere) => {
                  // Update state with the new value
                  setGenere(newGenere);
                }}
              />
            ) : (
              <></>
            )}
          </div>

          {/* isSeries */}
          <MyCard className=" border-muted  m-0 p-0  ">
            <Checkbox
              className="rounded-[3px] mx-4 mt-[5%] "
              id="isSeries"
              {...register("isSeries")}
            />
            isSeries
            <Checkbox
              className="rounded-[3px] ml-9 mr-4 mt-[5%] "
              id="isDualAudio"
              {...register("isDualAudio")}
            />
            isDualAudio
          </MyCard>

          {/* languages */}
          <div>
            <label htmlFor="languages">Languages</label>
            {filData!.languages != null ? (
              <MultiSelect
                multiple
                options={filData!.languages.map((e) => {
                  return { __id: e._id, name: e.languageName };
                })}
                value={language}
                onChange={(newLanguage) => {
                  // Update state with the new value
                  setlanguages(newLanguage);
                }}
              />
            ) : (
              <></>
            )}
          </div>

          {/* Movie season */}
          <MyCard
            key={"Movieseason"}
            className="max-h-60 overflow-auto no-scrollbar  border-muted"
          >
            <div className="flex w-full">
              <div key={"movieSeasonInner"} className="flex-auto ">
                <Label htmlFor="screenShorts">movie Seasons</Label>

                {movieSeasonfields.map((f, i) => {
                  return (
                    <div key={i} className="flex gap-2 mb-1 ">
                      <Input
                        key={f.id}
                        placeholder="664705f527734b2871ddc4aa"
                        {...register(`Seasons.${i}._id` as const)}
                      />
                      {i > 0 && (
                        <Button
                          type="button"
                          key={f._id}
                          variant={"destructive"}
                          onClick={() => movieSeasonRemove(i)}
                          className="h-8 w-8 items-center rounded-[4px] "
                        >
                          -
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>

              <Button
                type="button"
                onClick={() => movieSeasonAppend({ _id: "" })}
                className="mt-6 h-8 w-8 rounded-[4px] "
              >
                +
              </Button>
            </div>
          </MyCard>

          {/* category */}
          <div>
            <label htmlFor="category">category</label>
            {filData!.categoris != null ? (
              <MultiSelect
                options={filData!.categoris.map((e) => {
                  return { __id: e._id, name: e.name };
                })}
                value={category}
                onChange={(newCategory) => {
                  setcategory(newCategory);
                }}
              />
            ) : (
              <></>
            )}
          </div>

          {/* videoQualitys */}
          <div>
            <label htmlFor="videoquality">Video Quality</label>
            {filData!.videoQualitys != null ? (
              <MultiSelect
                multiple
                options={filData!.videoQualitys.map((e) => {
                  return { __id: e._id, name: `${e.Quality} [${e.Nickname}]` };
                })}
                value={videoQuality}
                onChange={(newVideoQuality) => {
                  // Update state with the new value
                  setvideoQuality(newVideoQuality);
                }}
              />
            ) : (
              <></>
            )}
          </div>
          {/* Age Rating */}
          <div>
            <label htmlFor="ageRating">Age Rating</label>
            {filData!.ageRatings != null ? (
              <MultiSelect
                options={filData!.ageRatings.map((e) => {
                  return { __id: e._id, name: `${e.rating} [${e.defination}]` };
                })}
                value={ageRating}
                onChange={(newAgeRating) => {
                  setageRating(newAgeRating);
                }}
              />
            ) : (
              <></>
            )}
          </div>

          {/* movieProvider */}
          <div>
            <label htmlFor="ageRating">Movie Provider</label>
            {filData!.providers != null ? (
              <MultiSelect
                options={filData!.providers.map((e) => {
                  return { __id: e._id, name: e.providerName };
                })}
                value={movieProvider}
                onChange={(newMovieProvider) => {
                  setMovieProvider(newMovieProvider);
                }}
              />
            ) : (
              <></>
            )}
          </div>

          {/* tags */}
          <MyCard
            key={"tags"}
            className="max-h-60 overflow-auto no-scrollbar  border-muted"
          >
            <div className="flex w-full">
              <div key={"tagsInner"} className="flex-auto ">
                <Label htmlFor="tags">Tags</Label>

                {tagsFields.map((f, i) => {
                  return (
                    <div key={i} className="flex gap-2 mb-1 ">
                      <Input
                        key={f.id}
                        placeholder="Avengers,Action,IronMan,SpiderMan..."
                        {...register(`tags.${i}._id` as const, {
                          required: {
                            value: true,
                            message: "tag is required",
                          },
                        })}
                      />
                      {i > 0 && (
                        <Button
                          type="button"
                          key={f._id}
                          variant={"destructive"}
                          onClick={() => tagsRemove(i)}
                          className="h-8 w-8 items-center rounded-[4px] "
                        >
                          -
                        </Button>
                      )}
                    </div>
                  );
                })}
                <div className="text-red-700 text-sm">
                  {errors.screenShorts?.message}
                </div>
              </div>

              <Button
                type="button"
                onClick={() => tagsAppend({ _id: "" })}
                className="mt-6 h-8 w-8 rounded-[4px] "
              >
                +
              </Button>
            </div>
          </MyCard>
        </div>

        <div className="flex my-5">
          {showLoader == true ? (
            <div
              className="inline-block  h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
              role="status"
            >
              <span className="!absolute  !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : (
            <Button type="submit" className="rounded">
              Submit Movie{" "}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
