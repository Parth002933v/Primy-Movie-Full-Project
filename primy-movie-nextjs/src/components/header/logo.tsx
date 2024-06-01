"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

import LightLogo from "../../../public/logo/light_logo_compress.png";
import DarkLogo from "../../../public/logo/dark_logo_new.png";

export default function Logo() {
  const { theme } = useTheme();

  return (
    <Link key={"Light"} href="/" className=" gap-2 text-lg font-semibold ">
      <div className="h-fit w-32">
        <Image
          src={theme == "light" ? LightLogo : DarkLogo}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
    </Link>
  );
}
