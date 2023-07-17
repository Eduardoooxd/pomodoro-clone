import Pomodoro from "@/components/pomodoro";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between w-full max-w-2xl min-h-screen mx-auto">
			<section className="w-full max-w-lg px-3 py-40 mx-auto ">
				<Pomodoro />
			</section>
		</main>
	);
}
