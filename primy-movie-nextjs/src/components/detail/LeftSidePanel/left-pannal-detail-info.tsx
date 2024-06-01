"use client";

import { useTheme } from "next-themes";

interface LeftPannalDetailInfoParams {
  title?: string;
  values?: string;
}

export default function LeftPannalDetailInfo({
  title = "title",
  values = "values",
}: LeftPannalDetailInfoParams) {
  const { theme } = useTheme();

  return (
    <div className="mb-[16px] pb-[20px] border-b border-solid border-gray-700 flex flex-col gap-[6px]">
      <h3 className="relative font-bold uppercase text-base text-[#6a7c8f] max-w-[120px] min-w-[120px] overflow-hidden text-ellipsis flex justify-between items-end ">
        {title}
      </h3>

      <div
        className={`inline-block ${
          theme == "light" ? "text-[#b9bdcc]" : "text-muted-foreground"
        }  `}
      >
        {values}
      </div>
    </div>
  );
}
