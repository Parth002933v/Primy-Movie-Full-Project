import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MovieCard from "../component/MovieCard";

import { useQuery } from "react-query";
import { fetchMovie, MovieResponse } from "../api/movieAxios";

import {  
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";

function SearchBar() {
  return (
    <form className=" flex-1    max-md:max-w-64 w-full ">
      <div className=" relative ">
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8   rounded-[6px] "
        />
        <Search className="absolute right-6 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
    </form>
  );
}

export default function Home() {
  let [searchParams, setSearchParams] = useSearchParams();

  const {
    data: moviesData,
    error,
    isLoading,
    isError,
  } = useQuery<MovieResponse, Error>({
    queryKey: ["movies", searchParams.get("page")],
    queryFn: () => fetchMovie({ page: `${searchParams.get("page")}` }),
    retry: false,
    keepPreviousData: true,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{(error as AxiosError).message} </div>;
  }

  if (moviesData && moviesData.data.length === 0) {
    return <div>No movies available</div>;
  }

  return (
    <div className="">
      <SearchBar />
      <div className="mt-6 gap-2 flex flex-wrap">
        {moviesData?.data.map((e) => (
          <MovieCard
            movieName={e.name}
            slugUrl={e.slugUrl}
            imageUrl={e.posterImage}
            key={e._id}
            className="border-2 border-muted-foreground max-md:h-64 max-md:w-36  h-72 w-44"
          />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => {
                if (Number(searchParams.get("page")) > 1) {
                  setSearchParams({
                    page: `${Number(searchParams.get("page")) - 1}`,
                  });
                }
              }}
            />
          </PaginationItem>

          {/* Display up to 3 pagination items */}
          {Array.from(
            { length: Math.min(moviesData?.TotalPages || 1, 3) },
            (_, index) => {
              const currentPage = Number(searchParams.get("page")) || 1;

              const page = currentPage - 1 + index;

              if (page < 1 || page > moviesData!.TotalPages) {
                return null;
              }

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={() => {
                      setSearchParams({
                        page: `${page}`,
                      });
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          )}

          {moviesData!.TotalPages > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => {
                setSearchParams({
                  page: `${moviesData!.TotalPages}`,
                });
              }}
              isActive={
                Number(searchParams.get("page")) === moviesData?.TotalPages
              }
            >
              {moviesData?.TotalPages}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (
                  (Number(searchParams.get("page")) || 1) ===
                  moviesData?.TotalPages
                ) {
                  return;
                }

                if (Number(searchParams.get("page")) == 0) {
                  return setSearchParams({
                    page: `${Number(searchParams.get("page")!) + 2}`,
                  });
                }

                return setSearchParams({
                  page: `${Number(searchParams.get("page")!) + 1}`,
                });
              }}
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
