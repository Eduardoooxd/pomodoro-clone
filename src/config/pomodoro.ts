import { PomodoroTime } from "@/types/pomodoTypes";

export const defaultPomodoroConfig = {
	workTime: 25 * 60,
	shortBreakTime: 5 * 60,
	longBreakTime: 15 * 60,
} satisfies PomodoroTime;
