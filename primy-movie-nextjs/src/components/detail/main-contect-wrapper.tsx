"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface MainContectWrapperProps {
  children: React.ReactNode;
}
export default function MainContectWrapper({
  children,
}: MainContectWrapperProps) {
  const { theme: globalTheme } = useTheme();

  const [theme, setTheme] = useState<string | undefined>("")

  useEffect(() => {

    setTheme(globalTheme)

  }, [globalTheme])

  return (
    theme == "light" ? (
      <div className="rounded-tl-xl rounded-tr-xl sm:px-[25px] sm:pt-[25px] pt-[15px] bg-white shadow-lg shadow-slate-400 w-[100%]  relative z-0 min-h-[800px] -mt-[75px] mr-auto ml-auto mb-0 max-w-[1170px]">
        {children}
      </div>
    ) : (
      <div className="rounded-tl-xl rounded-tr-xl sm:px-[25px] sm:pt-[25px] pt-[15px] bg-[#060d17] w-[100%]  relative z-0 min-h-[800px] -mt-[75px] mr-auto ml-auto mb-0 max-w-[1170px]">
        {children}
      </div>
    )
    /* </div> */
  );
}
