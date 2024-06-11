"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

import LightLogo from "../../../public/logo/light_logo_compress.png";
import DarkLogo from "../../../public/logo/dark_logo_new.png";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [logoTheme, setLogoTheme] = useState<string | undefined>("")

  const t = theme
  useEffect(() => {
    setLogoTheme(theme)
  }, [theme])

  return (
    <Link key={"Light"} href="/" className=" gap-2 text-lg font-semibold ">
      <div className=" h-fit w-32">
        <Image
          src={logoTheme == "light" ? LightLogo : DarkLogo}
          alt="Picture of the author"
        />
      </div>
    </Link>
  );
}
