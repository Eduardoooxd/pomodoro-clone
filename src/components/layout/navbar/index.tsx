import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="w-full">
			<div className="max-w-2xl mx-auto flex justify-between items-center border-b border-b-gray-950">
				<Link href="/">
					<h1>Pomodoro</h1>
				</Link>
			</div>
		</nav>
	);
}
