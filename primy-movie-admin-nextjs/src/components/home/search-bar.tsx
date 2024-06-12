import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function SearchBar() {
    return (
        <form className=" flex-1    max-md:max-w-64 w-full ">
            <div className=" relative ">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8   rounded-[6px] "
                />
                <Search className="absolute right-6 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
        </form>
    );
}