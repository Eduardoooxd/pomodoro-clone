import { useCallback } from "react";
import { useBoolean } from "./useBoolean";
import { useCounter } from "./useCounter";
import { useInterval } from "./useInterval";

interface CountdownOption {
	countStart: number;
	intervalMs?: number;
	isIncrement?: boolean;
	countStop?: number;
	duringCountdown?: () => void;
	afterCountdown?: () => void;
}
interface CountdownControllers {
	startCountdown: () => void;
	stopCountdown: () => void;
	resetCountdown: () => void;
}

export function useCountdown({
	countStart,
	intervalMs,
	isIncrement,
	countStop,
	duringCountdown,
	afterCountdown,
}: CountdownOption): [number, boolean, CountdownControllers] {
	intervalMs = intervalMs ?? 1000;
	isIncrement = isIncrement ?? false;
	countStop = countStop ?? 0;

	const {
		count,
		increment,
		decrement,
		reset: resetCounter,
	} = useCounter(countStart);

	const {
		value: isCountdownRunning,
		setTrue: startCountdown,
		setFalse: stopCountdown,
	} = useBoolean(false);

	const resetCountdown = () => {
		stopCountdown();
		resetCounter();
	};

	const countdownCallback = useCallback(() => {
		if (count === countStop) {
			stopCountdown();
			afterCountdown && afterCountdown();
			return;
		}

		isIncrement ? increment() : decrement();
	}, [
		count,
		countStop,
		decrement,
		increment,
		isIncrement,
		stopCountdown,
		afterCountdown,
	]);

	useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

	return [
		count,
		isCountdownRunning,
		{
			startCountdown,
			stopCountdown,
			resetCountdown,
		},
	];
}
