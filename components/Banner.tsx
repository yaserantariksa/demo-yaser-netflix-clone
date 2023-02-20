import { baseUrl } from "@/constants/movie";
import { Movie } from "@/typings";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PlayIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { modalState, movieState } from "@/atoms/modalAtom";
import { useRecoilState } from "recoil";

interface Props {
	netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
	const [showModal, setShowModal] = useRecoilState(modalState);

	useEffect(() => {
		setMovie(
			netflixOriginals[
				Math.floor(Math.random() * netflixOriginals.length)
			]
		);
	}, [netflixOriginals]);

	const imageBanner = `${baseUrl}/original${
		movie?.backdrop_path || movie?.poster_path
	}`;
	return (
		<div className="flex flex-col pt-16 space-y-2  md:pt-18 md:space-y-4 lg:pt-22">
			<div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
				<Image
					src={imageBanner}
					alt="image banner"
					fill
					className="object-cover"
				/>
			</div>
			<h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
				{movie?.title || movie?.name || movie?.original_title}
			</h1>
			<p className="max-w-xs text-xs drop-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
				{movie?.overview}
			</p>
			<div className="flex space-x-3">
				<button
					className="bannerButton bg-white text-black"
					onClick={() => {
						setCurrentMovie(movie);
						setShowModal(true);
					}}
				>
					<PlayIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
					Play
				</button>
				<button
					className="bannerButton bg-[gray]/70"
					onClick={() => {
						setCurrentMovie(movie);
						setShowModal(true);
					}}
				>
					<InformationCircleIcon className="h-5 w-5 md:h-5 md:w-5" />
					More Info
				</button>
			</div>
		</div>
	);
};

export default Banner;
