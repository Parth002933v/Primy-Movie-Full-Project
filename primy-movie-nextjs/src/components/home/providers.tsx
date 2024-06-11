import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { MovieProvider_gql, MovieProviderResponse } from "@/types/other-types";
import Image from "next/image";
import Link from "next/link";

export default function Providers({ providerData }: { providerData: MovieProvider_gql[] | undefined }) {
  return (
    <div>
      <ScrollArea
        className={`max-lg:mx-2 lg:mx-20   whitespace-nowrap  rounded-md`}
      >
        <div className=" flex w-max space-x-4">
          {providerData?.map((m) => {
            const imgUrl = `${process.env.BASE_URL2}${m.image}`;

            return (
              <Link
                href={`/provider/${m.providerName}`}
                key={m._id}
                className={`cursor-pointer h-12 w-12 relative dark:border-none border border-gray-300  rounded-lg`}
              >
                <Image
                  key={m._id}
                  className="object-contain absolute -z-10 rounded-md"
                  alt={m.providerName}
                  fill
                  src={imgUrl}
                />
              </Link>
            );
          })}
        </div>
        <ScrollBar className="opacity-0" orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
