import { Movie } from "@/typings";
import Image from "next/image";
import { baseUrl } from "@/constants/movie";

interface Props {
    movie: Movie;
}

function Thumbnail({ movie }: Props) {
    const thumbnailImage = `${baseUrl}/w500${
        movie.backdrop_path || movie.poster_path
    }`;
    return (
        <div className="ralative h-28 min-w-[180px] md:h-36 md:min-w-[260px] md:hover:scale-105 cursor-pointer">
            <Image
                src={thumbnailImage}
                alt="thumbnail image"
                className="object-cover rounded-sm"
                width={300}
                height={300}
            />
        </div>
    );
}

export default Thumbnail;
