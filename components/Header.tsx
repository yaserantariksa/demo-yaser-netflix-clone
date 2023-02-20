import Image from "next/image";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { logout } = useAuth();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<header className={`${isScrolled && "bg-[#141414]"}`}>
			<div className="flex items-center space-x-2 md:space-x-10">
				<Image
					src="/images/netflix_logo.svg"
					alt="logo"
					width={100}
					height={100}
					className="cursor-pointer object-contain"
				/>
				<ul className="hidden space-x-4 drop-shadow-md md:flex">
					<li className="headerLink">Home</li>
					<li className="headerLink">TV Show</li>
					<li className="headerLink">Movies</li>
					<li className="headerLink">New & Popular</li>
					<li className="headerLink">My List</li>
				</ul>
			</div>
			<div className="flex items-center space-x-4 text-sm font-light">
				<MagnifyingGlassIcon className="hidden h-6 w-6 cursor-pointer sm:inline drop-shadow-md" />
				<p className="hidden cursor-pointer  drop-shadow-md lg:inline">
					Kids
				</p>
				<BellIcon className="h-6 w-6 cursor-pointer  drop-shadow-md" />
				<Link href="/account">
					<Image
						src="/images/netflix_default_avatar.png"
						alt="logo"
						width={20}
						height={20}
						className="cursor-pointer rounded"
						onClick={logout}
					/>
				</Link>
			</div>
		</header>
	);
};

export default Header;
