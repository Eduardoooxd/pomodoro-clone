import { defaultPomodoroConfig } from "@/config/pomodoro";
import { PomodoroTypes } from "@/types/pomodoTypes";

export function getBannerMessage(type: PomodoroTypes): string {
	switch (type) {
		case "work":
			return "Time to work!";
		case "shortBreak":
			return "Time for a break!";
		case "longBreak":
			return "Time for a break!";
	}
}

export function getPomodoroTime(type: PomodoroTypes): number {
	const { workTime, shortBreakTime, longBreakTime } = defaultPomodoroConfig;

	switch (type) {
		case "work":
			return workTime;
		case "shortBreak":
			return shortBreakTime;
		case "longBreak":
			return longBreakTime;
	}
}
