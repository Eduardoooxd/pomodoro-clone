import Navbar from "@/components/layout/navbar";
import { PomodoroProvider } from "@/components/pomodoro/context";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Pomodoro Timer Online",
	description: "Manage your time with the Pomodoro Technique",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={cn("w-full text-white")}>
				<PomodoroProvider>
					<Navbar />
					{children}
				</PomodoroProvider>
			</body>
		</html>
	);
}
