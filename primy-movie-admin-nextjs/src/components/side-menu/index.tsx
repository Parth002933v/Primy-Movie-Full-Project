import MyCard from "../custom-card";
import logo from "../../../public/logo/dark_logo_new.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADD_BATCH_LINK_PATH, ADD_MOVIE_PATH, GENERE_PATH } from "@/constant/routeContant";
import {  NavLinkButton } from "./nav-link-button";

export default function SideMenu() {
    return (
        <div className="w-[20%]  h-full ">
            <MyCard className="w-full  h-full rounded-tl-sm rounded-bl-sm ">
                <Image src={logo} alt="logo" className="px-3 py-1 w-full object-cover mb-5"></Image>
                <NavLinkButton key={"1"} path="/" />
                <NavLinkButton key={"2"} path={ADD_MOVIE_PATH} title="Add Movie" />
                <NavLinkButton key={"3"} path={GENERE_PATH} title="Genres" />
                <NavLinkButton key={"4"} path={ADD_BATCH_LINK_PATH} title="Add Batch Links" />
            </MyCard>
        </div>
    );
}

