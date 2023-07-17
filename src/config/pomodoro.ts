import { PomodoroTime } from "@/types/pomodoTypes";

export const defaultPomodoroConfig = {
	workTime: 25 * 1,
	shortBreakTime: 5 * 1,
	longBreakTime: 15 * 1,
} satisfies PomodoroTime;
