import Pomodoro from "@/components/pomodoro";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between w-full max-w-2xl min-h-screen px-3 py-10 mx-auto">
			<Pomodoro />
		</main>
	);
}
