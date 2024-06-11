import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ButtonProps {
  movieLink: string;
  className?: string;
  posterImage: string;
  movieName: string;
}
const MovieCard: React.FC<ButtonProps> = ({
  movieLink: movieID,
  className,
  posterImage,
  movieName,
}) => {
  return (
    <div
      className={cn(
        " group  relative overflow-hidden border border-white rounded-lg bg-black",
        className
      )}
    >
      <Link href={`/${movieID}`}>
        <Image
          src={posterImage}
          width={500}
          height={500}
          className="absolute  inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          alt="Picture of the author"
        />

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
