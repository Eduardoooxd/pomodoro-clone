"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
	}, [incrementBreaks, setPomodoro, resetBreaks, numberBreaks]);

	const afterShortBreakCallback = useCallback(() => {
		setPomodoro("work");
	}, [setPomodoro]);

	const afterLongBreakCallback = useCallback(() => {
		setPomodoro("work");
	}, [setPomodoro]);

	return (
		<Tabs
			value={pomodoro}
			onValueChange={(newPomodoro) =>
				setPomodoro(newPomodoro as PomodoroTypes)
			}
			className="w-full">
			<TabsList>
				<TabsTrigger value="work">Work</TabsTrigger>
				<TabsTrigger value="shortBreak">Short Break</TabsTrigger>
				<TabsTrigger value="longBreak">Long Break</TabsTrigger>
			</TabsList>
			<TabsContent value="work">
				<CountdownTimer
					afterCountdown={afterWorkCallback}
					countStart={1 * 5}
					pomodoro="work"
				/>
			</TabsContent>
			<TabsContent value="shortBreak">
				<CountdownTimer
					afterCountdown={afterShortBreakCallback}
					countStart={1 * 2}
					pomodoro="shortBreak"
				/>
			</TabsContent>
			<TabsContent value="longBreak">
				<CountdownTimer
					afterCountdown={afterLongBreakCallback}
					countStart={1 * 3}
					pomodoro="longBreak"
				/>
			</TabsContent>
		</Tabs>
	);
}
