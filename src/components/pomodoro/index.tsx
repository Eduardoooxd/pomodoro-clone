"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPomodoroTime } from "@/lib/pomodoro";
import { showNotification } from "@/lib/utils";
import type { PomodoroTypes } from "@/types/pomodoTypes";
import { useCallback } from "react";
import { usePomodoro } from "./context";
import CountdownTimer from "./countdown";

export default function Pomodoro() {
	const {
		pomodoro,
		setPomodoro,
		numberBreaks,
		incrementBreaks,
		resetBreaks,
	} = usePomodoro();

	const afterWorkCallback = useCallback(() => {
		incrementBreaks();
		if (numberBreaks === 4) {
			setPomodoro("longBreak");
			resetBreaks();
		} else {
			setPomodoro("shortBreak");
		}

		showNotification("Pomodoro finished", {
			body: "Time to take a break",
		});
	}, [incrementBreaks, setPomodoro, resetBreaks, numberBreaks]);

	const afterShortBreakCallback = useCallback(() => {
		setPomodoro("work");
		showNotification("Short Break finished", {
			body: "Time to work !",
		});
	}, [setPomodoro]);

	const afterLongBreakCallback = useCallback(() => {
		setPomodoro("work");
		showNotification("Long Break finished", {
			body: "Time to work !",
		});
	}, [setPomodoro]);

	return (
		<section className="flex w-full max-w-lg py-5 mx-auto rounded-md bg-almostTransparent">
			<Tabs
				value={pomodoro}
				onValueChange={(newPomodoro) =>
					setPomodoro(newPomodoro as PomodoroTypes)
				}
				className="flex flex-col justify-center flex-1 w-full bg-transparent">
				<TabsList className="flex bg-transparent justify-evenly">
					<TabsTrigger value="work">Work</TabsTrigger>
					<TabsTrigger value="shortBreak">Short Break</TabsTrigger>
					<TabsTrigger value="longBreak">Long Break</TabsTrigger>
				</TabsList>
				<TabsContent value="work">
					<CountdownTimer
						afterCountdown={afterWorkCallback}
						countStart={getPomodoroTime("work")}
						pomodoro="work"
					/>
				</TabsContent>
				<TabsContent value="shortBreak">
					<CountdownTimer
						afterCountdown={afterShortBreakCallback}
						countStart={getPomodoroTime("shortBreak")}
						pomodoro="shortBreak"
					/>
				</TabsContent>
				<TabsContent value="longBreak">
					<CountdownTimer
						afterCountdown={afterLongBreakCallback}
						countStart={getPomodoroTime("longBreak")}
						pomodoro="longBreak"
					/>
				</TabsContent>
			</Tabs>
		</section>
	);
}
