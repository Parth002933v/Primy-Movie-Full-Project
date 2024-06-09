"use client";

import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";

interface NavLinkParams {
  path: string;
  className?: string;
  children: React.ReactNode;
}
export default function NavLink({ path, className, children }: NavLinkParams) {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`${
        pathname != path ? "text-muted-foreground" : "text-foreground"
      } transition-colors hover:text-foreground ${className} `}
    >
      {children}
    </Link>
  );
}
