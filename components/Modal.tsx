import { modalState, movieState } from "@/atoms/modalAtom";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import {
	XMarkIcon,
	PlayIcon,
	PlusIcon,
	HandThumbUpIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
	PauseIcon,
} from "@heroicons/react/24/outline";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { Movie, Element, Genre } from "@/typings";
import useAuth from "@/hooks/useAuth";
import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	onSnapshot,
	setDoc,
} from "firebase/firestore";

function Modal() {
	const [movie, setMovie] = useRecoilState(movieState);
	const [trailer, setTrailer] = useState("");
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [muted, setMuted] = useState(false);
	const [playing, setPlaying] = useState(true);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [addedToList, setAddedToList] = useState(false);
	const { user } = useAuth();
	const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

	useEffect(() => {
		if (!movie) return;
		async function fetchMovie() {
			const data = await fetch(
				`https://api.themoviedb.org/3/${
					movie?.media_type === "tv" ? "tv" : "movie"
				}/${movie?.id}?api_key=${
					process.env.NEXT_PUBLIC_API_KEY
				}&language=en-US&append_to_response=videos`
			).then((response) => response.json());
			console.log(data);
			if (data?.videos) {
				const index = data.videos.results.findIndex(
					(element: Element) => element.type === "Trailer"
				);
				setTrailer(data.videos?.results[index]?.key);
			}
			if (data?.genres) {
				setGenres(data.genres);
			}
		}

		fetchMovie();
	}, [movie]);

	const handleClose = () => {
		setShowModal(false);
		setMovie(null);
	};
	return (
		<MuiModal
			open={showModal}
			onClose={handleClose}
			className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide rounded-md"
		>
			<>
				<button
					onClick={handleClose}
					className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#182020]"
				>
					<XMarkIcon className="h-6 w-6" />
				</button>
				<div className="relative pt-[56.25%]">
					<ReactPlayer
						url={`https://youtube.com/watch?v=${trailer}`}
						width="100%"
						height="100%"
						playing={playing}
						muted={muted}
						style={{ position: "absolute", top: "0" }}
					/>
					<div className="absolute bottom-10 flex w-full items-center justify-between px-10">
						<div className="flex space-x-2">
							<button onClick={() => setPlaying(!playing)}>
								{playing ? (
									<div className="flex items-center gap-x-2 rounded-full bg-white px-2 py-2 text-xl font-bold text-black transition opacity-80 hover:bg-[#e6e6e6]">
										<PauseIcon className="h-7 w-7 text-black" />
									</div>
								) : (
									<div className="flex items-center gap-x-2 rounded-full bg-white px-2 py-2 text-xl font-bold text-black transition opacity-80 hover:bg-[#e6e6e6]">
										<PlayIcon className="h-7 w-7 text-black" />
									</div>
								)}
							</button>
							<button className="modalButton">
								<PlusIcon className="h-7 w-7" />
							</button>
							<button className="modalButton">
								<HandThumbUpIcon className="h-7 w-7" />
							</button>
						</div>
						<button onClick={() => setMuted(!muted)}>
							{muted ? (
								<SpeakerXMarkIcon className="h-6 w-6" />
							) : (
								<SpeakerWaveIcon className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>
				<div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
					<div className="space-y-6 text-lg">
						<div className="flex items-center  space-x-4 text-sm">
							<p className="font-semibold text-green-400">
								{movie!.vote_average * 10}% Match
							</p>
							<p className="font-light">
								{movie?.release_date || movie?.first_air_date}
							</p>
							<div className="flex h-5 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
								HD
							</div>
						</div>
						<div className="flex flex-col gap-x-10  gap-y-4 font-light text-justify md:flex-row">
							<p className="md:w-5/6">{movie?.overview}</p>
							<div className="flex flex-col space-y-3 text-sm">
								<div>
									<span className="text-[gray]">
										Genres:{" "}
									</span>
									{genres
										.map((genre) => genre.name)
										.join(", ")}
								</div>
								<div>
									<span className="text-[gray]">
										Original language:{" "}
									</span>
									{movie?.original_language}
								</div>
								<div>
									<span className="text-[gray]">
										Total votes:{" "}
									</span>
									{movie?.vote_count}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</MuiModal>
	);
}

export default Modal;
