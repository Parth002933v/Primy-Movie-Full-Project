import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

export default function SearchBar() {
  return (
    <form className=" flex-1   lg:ml-10 max-md:max-w-64 w-full ">
      <div className=" relative ">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8 bg-gray-50 text-black "
        />
      </div>
    </form>
  );
}
