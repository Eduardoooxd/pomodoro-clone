import { PomodoroBackgroundType, PomodoroTypes } from "@/types/pomodoTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getBackgroundColorClass = (
	pomodoroType: PomodoroTypes,
): PomodoroBackgroundType => {
	return `bg-${pomodoroType}`;
};

export const convertSecondsToMinutes = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const paddedMinutes = String(minutes).padStart(2, "0");
	const remainingSeconds = seconds % 60;
	const paddedSeconds = String(remainingSeconds).padStart(2, "0");
	return `${paddedMinutes}:${paddedSeconds}`;
};
