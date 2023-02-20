import { Movie } from "@/typings";
import Image from "next/image";
import { baseUrl } from "@/constants/movie";
import { useRecoilState } from "recoil";
import { movieState, modalState } from "@/atoms/modalAtom";

interface Props {
	movie: Movie;
}

function Thumbnail({ movie }: Props) {
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
	const [showModal, setShowModal] = useRecoilState(modalState);

	const thumbnailImage = `${baseUrl}/w500${
		movie.backdrop_path || movie.poster_path
	}`;
	return (
		<div
			className="ralative h-28 min-w-[180px] md:h-36 md:min-w-[260px] md:hover:scale-105 cursor-pointer"
			onClick={() => {
				setCurrentMovie(movie);
				setShowModal(true);
			}}
		>
			<Image
				src={thumbnailImage}
				alt="thumbnail image"
				className="object-cover rounded-sm md:rounded"
				width={300}
				height={300}
			/>
		</div>
	);
}

export default Thumbnail;
