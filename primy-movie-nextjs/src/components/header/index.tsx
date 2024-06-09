// custom components
import { ModeToggle } from "../theme-toggle";
import Logo from "./logo";
import NavLink from "./nav-link";
import NavLinkDropdown from "./nav-link-dropdown";
import SearchBar from "./search-bar";

export default function Hearder() {
  return (
    <div
      className={`max-lg:px-2  lg:px-20  sticky z-50  bg-background backdrop-blur-md  max-lg:flex-col max-lg:h-28 lg:gap-4    flex lg:items-center  lg:justify-start top-0  h-16   shadow-md`}
    >
      <div className="lg:hidden mx-auto   mt-5 mb-2">
        <Logo key={"top_log"} />
      </div>

      <nav className="flex items-center w-full truncate  justify-around max-lg:space-x-3 lg:space-x-6">
        <div className="max-lg:hidden  ">
          <Logo key={"side_logo"} />
        </div>

        {/*nav links / nav bar links  */}
        <div className=" max-lg:space-x-3 max-sm:hidden space-x-6 my-auto font-medium max-sm:text-xs text-sm ">
          <NavLink path="/">Home</NavLink>

          <NavLink path="/category/web-series">Web Series</NavLink>

          <NavLink path="/category/movies">Movies</NavLink>

          <NavLink path="/category/latest" className="max-lg:hidden">
            New & Popular
          </NavLink>

          <NavLink path="/category/language" className="max-lg:hidden">
            Browse by Language
          </NavLink>

          <NavLink path="/About-us"> About us</NavLink>
        </div>

        {/* nav link with drawer */}
        <div className="sm:hidden  items-center">
          <NavLinkDropdown />
        </div>

        <SearchBar />

        <div>
          <ModeToggle key={"Toggle"} />
        </div>
      </nav>
    </div>
  );
}
