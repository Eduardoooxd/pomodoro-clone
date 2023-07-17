"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { getBannerMessage } from "@/lib/pomodoro";
import { convertSecondsToMinutes } from "@/lib/utils";
import { PomodoroTypes } from "@/types/pomodoTypes";

interface CountdownTimerProps {
	countStart: number;
	afterCountdown: () => void;
	pomodoro: PomodoroTypes;
}

export default function CountdownTimer({
	countStart,
	afterCountdown,
	pomodoro,
}: CountdownTimerProps) {
	const [count, isCountdownRunning, { startCountdown, stopCountdown }] =
		useCountdown({
			countStart,
			afterCountdown,
		});

	const timeInMinutes = convertSecondsToMinutes(count);

	useIsomorphicLayoutEffect(() => {
		window.document.title = `${timeInMinutes} - ${getBannerMessage(
			pomodoro,
		)}`;
	}, [pomodoro, timeInMinutes]);

	return (
		<div>
			<h4>{timeInMinutes}</h4>
			<button onClick={startCountdown}>Start</button>
			{isCountdownRunning ? (
				<button onClick={stopCountdown}>Stop</button>
			) : null}
		</div>
	);
}
