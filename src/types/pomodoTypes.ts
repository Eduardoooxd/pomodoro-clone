export interface PomodoroTime {
	workTime: number;
	shortBreakTime: number;
	longBreakTime: number;
}

export type PomodoroTypes = "work" | "shortBreak" | "longBreak";

export type PomodoroBackgroundType = `bg-${PomodoroTypes}`;
