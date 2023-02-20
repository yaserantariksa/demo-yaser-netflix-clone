import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import loginNetflixImage from "../public/images/login-netflix-image.jpg";
import netflixLogo from "../public/images/netflix_logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "@/hooks/useAuth";

interface Inputs {
	email: string;
	password: string;
}

export default function Login() {
	const [login, setLogin] = useState(false);
	const { signIn, signUp } = useAuth();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log(data);
		if (login) {
			await signIn(data.email, data.password);
		} else {
			await signUp(data.email, data.password);
		}
	};
	return (
		<div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
			<Head>
				<title>Login-Netflix Clone</title>
				<meta
					name="description"
					content="Netflix clone generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Image
				src={loginNetflixImage}
				alt="netflix logo image"
				fill
				className="object-cover -z-10 !hidden opacity-60 sm:!inline"
			/>
			<Image
				src={netflixLogo}
				alt="netflix logo"
				width={150}
				height={150}
				className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-10"
			/>
			<form
				className="relative mt-24 space-y-8 bg-black/75 rounded py-10 px-6 md:max-w-lg md:mt-0 md:px-14"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-4xl font-semibold">Sign In</h1>
				<div className="space-y-4">
					<label htmlFor="email" className=" inline-block w-full">
						<input
							type="email"
							placeholder="Email"
							id="email"
							className={`input ${
								errors.email && "border-2 border-orange-500"
							}`}
							{...register("email", { required: true })}
						/>
						{errors.email && (
							<p className="p-1 text-md font-light text-orange-500">
								Please enter a valid email
							</p>
						)}
					</label>
					<label htmlFor="password" className="inline-block w-full">
						<input
							type="password"
							placeholder="Password"
							id="password"
							className={`input ${
								errors.password && "border-2 border-orange-500"
							}`}
							{...register("password", {
								required: true,
								minLength: 4,
								maxLength: 60,
							})}
						/>
						{errors.password && (
							<p className="p-1 text-md font-light text-orange-500">
								Your password must contain between 4 and 8
								characters.
							</p>
						)}
					</label>
				</div>
				<button
					className="bg-[#E50914] w-full py-3 font-semibold"
					onClick={() => setLogin(true)}
					type="submit"
				>
					Sign In
				</button>
				<div className="text-[gray]">
					New to Netflix?{" "}
					<button
						className="cursor-pointer text-white hover:underline"
						onClick={() => setLogin(false)}
						type="submit"
					>
						Sign up Now
					</button>
				</div>
			</form>
		</div>
	);
}
