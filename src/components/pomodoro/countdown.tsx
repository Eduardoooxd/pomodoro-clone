"use client";

import { Button } from "@/components/ui/button";
import { useCountdown } from "@/hooks/useCountdown";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { getBannerMessage } from "@/lib/pomodoro";
import { cn, convertSecondsToMinutes } from "@/lib/utils";
import { PomodoroTypes } from "@/types/pomodoTypes";
import { TimerReset } from "lucide-react";

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
	const [
		count,
		isCountdownRunning,
		{ startCountdown, stopCountdown, resetCountdown },
	] = useCountdown({
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
		<div className={cn("flex items-center flex-col gap-y-4 ")}>
			<h4 className="text-8xl">{timeInMinutes}</h4>
			<div className="flex justify-center w-full gap-x-4">
				{!isCountdownRunning ? (
					<Button
						onClick={startCountdown}
						variant="secondary"
						className="text-2xl uppercase">
						Start
					</Button>
				) : (
					<Button
						onClick={stopCountdown}
						variant="secondary"
						className="text-2xl uppercase">
						Stop
					</Button>
				)}

				{isCountdownRunning ? (
					<Button onClick={resetCountdown} size="icon">
						<TimerReset className="w-4 h-4" />
					</Button>
				) : null}
			</div>
		</div>
	);
}
