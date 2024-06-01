"use client";

import { useTheme } from "next-themes";
import React from "react";
import SeasonCard from "./season-card";

export default function ReletedSession() {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme == "dark" ? "text-[#b9bdcc]" : "text-muted-foreground"
      }  h-fit `}
    >
      {/*  total sesion */}
      <h2 className="mt-8 mb-3 text-xs font-semibold  uppercase">3 Seasons</h2>

      {/* // List of available session */}
      <div className="w-full flex  no-scrollbar overflow-auto gap-3 ">
        <SeasonCard />
        <SeasonCard />
        <SeasonCard />
   
      </div>
    </div>
  );
}
