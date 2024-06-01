import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavLink from "./nav-link";
import { MenuIcon } from "lucide-react";

export default function NavLinkDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md border w-[35px]  h-[35px]  ">
        <MenuIcon className="mx-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-2">
        <DropdownMenuItem>
          <NavLink path="/">Home</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink path="/category/web-series">Web Series</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink path="/category/movies">Movies</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink path="/category/latest">New & Popular</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink path="/category/language">Browse by Language</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink path="/About-us">About us</NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
