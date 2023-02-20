import { modalState, movieState } from "@/atoms/modalAtom";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { XMarkIcon } from "@heroicons/react/24/outline";
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
	const [muted, setMuted] = useState(true);
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
						playing
						style={{ position: "absolute", top: "0" }}
					/>
				</div>
			</>
		</MuiModal>
	);
}

export default Modal;
