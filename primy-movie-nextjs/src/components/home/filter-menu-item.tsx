"use client";

import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Link from "next/link";

interface MenuType {
  title: string;
  menuItems: { id: string; path: string; itemName: string }[];
}
export default function FilterMenuItem({ menuItems, title }: MenuType) {
  const { theme } = useTheme();
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className=" font-normal max-md:text-xs gap-0 py-3 px-3">
              {title}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="">
              <div className=" min-w-72 grid grid-cols-2 text-nowrap max-md:min-w-48 left-72">
                {menuItems.map((m) => (
                  <div
                    key={m.id}
                    className={` ${
                      theme == "light" ? "hover:bg-gray-300" : "hover:bg-accent"
                    } py-3 px-6 rounded max-md:text-sm max-md:px-3`}
                  >
                    <Link href={m.path}>
                      <p className="text-wrap">{m.itemName}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
