import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
    className?: string;
    slugUrl: string;
    imageUrl: string;
    movieName: string;
}

const MovieCard: React.FC<ButtonProps> = ({
    className,
    slugUrl,
    imageUrl,
    movieName,
}) => {
    return (
        <div className={cn("group relative overflow-hidden rounded-lg bg-black", className)}>
            <Link href={`/edit/${slugUrl}`}>
                <img
                    alt=""
                    src={imageUrl}
                    className="absolute  inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50" />

                <div className="p-5 mb-2">
                    <div className="">
                        <div className=" translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                            <p className="text-sm font-medium text-white ">{movieName}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
