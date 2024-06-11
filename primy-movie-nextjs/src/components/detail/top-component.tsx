"use client";

import { useTheme } from "next-themes";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function TopbackGoundImage({
  bannerImage,
}: {
  bannerImage: string;
}) {


  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<string | undefined>("")


  useEffect(() => {
    setTheme(globalTheme)
  }, [globalTheme])



  return (
    <div className="max-lg:h-[290px] h-[450px] w-[100%] relative z-0 ">
      <div className="relative overflow-hidden m-auto h-[100%] ">
        <div
          className={`h-[100%] max-h-[450px] overflow-hidden relative after:left-0 after:block after:absolute after:bottom-0 after:content-'' after:z-[1] after:pointer-events-none after:w-[100%] after:h-[40%] after:bg-gradient-to-t ${theme === "dark" ? "after:from-[#020817]" : ""
            } after:to-transparent`}
        >
          <div>
            <Image
              src={bannerImage}
              alt="Picture of the author"
              fill
              className="absolute object-cover inset-0 h-full w-fit ll opacity-75 transition-opacity group-hover:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
