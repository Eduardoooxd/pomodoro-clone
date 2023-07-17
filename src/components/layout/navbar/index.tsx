import LogoImage from "@/assets/icon.svg";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="flex w-full h-14">
			<div className="flex items-center justify-between flex-1 max-w-2xl px-3 mx-auto border-b border-b-gray-950">
				<Link href="/" className="flex gap-4 group">
					<Image
						src={LogoImage}
						alt="Generic Check Logo"
						width={25}
						height={25}
					/>
					<h1 className="text-3xl font-extrabold group-hover:opacity-70">
						Pomodoro
					</h1>
				</Link>
			</div>
		</nav>
	);
}
