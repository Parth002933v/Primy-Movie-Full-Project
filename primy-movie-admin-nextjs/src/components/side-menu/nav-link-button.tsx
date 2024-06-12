"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ButtonParams {
    path?: string;
    title?: string;
}

export function NavLinkButton({ path = "/", title = "Home" }: ButtonParams) {
    const pathname = usePathname()
    return (
        <Link href={path}>
            <div
                className={`${pathname == path ? "bg-accent" : "bg-transparent"} cursor-pointer 
                hover:bg-accent  
                w-full text-sm font-semibold duration-150 text-start place-content-center my-1 px-3 h-9 rounded-[6px]`}>
                {title}
            </div>
        </Link>
    );
}