"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn, getBackgroundColorClass } from "@/lib/utils";
import { PomodoroTypes } from "@/types/pomodoTypes";
import React, { createContext, useContext, useState } from "react";

interface PomodoroContextType {
	pomodoro: PomodoroTypes;
	numberBreaks: number;
	setPomodoro: (pomodoro: PomodoroTypes) => void;
	incrementBreaks: () => void;
	resetBreaks: () => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(
	undefined,
);

export const PomodoroProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [pomodoro, setPomodoro] = useState<PomodoroTypes>("work");
	const [numberBreaks, setNumberBreaks] = useState<number>(0);

	const incrementBreaks = () => {
		setNumberBreaks((prev) => prev + 1);
	};

	const resetBreaks = () => {
		setNumberBreaks(() => 0);
	};

	const contextValue: PomodoroContextType = {
		pomodoro,
		setPomodoro,
		numberBreaks,
		incrementBreaks,
		resetBreaks,
	};

	const backgroundColorClass = getBackgroundColorClass(pomodoro);

	useIsomorphicLayoutEffect(() => {
		//Forcing non null since Head element always exists.
		const headElement = document.querySelector("head");
		const existingFavicon = document.querySelector('link[rel="icon"]');

		// Create a new <link> element for the new favicon
		const newFavicon = document.createElement("link");
		newFavicon.rel = "icon";
		newFavicon.href = `assets/favicons/${pomodoro}Icon.ico`;

		// Replace the existing favicon with the new one
		if (existingFavicon && headElement) {
			headElement.removeChild(existingFavicon);
		}

		headElement?.appendChild(newFavicon);
	}, [pomodoro]);

	return (
		<PomodoroContext.Provider value={contextValue}>
			<div
				className={cn(
					"min-h-[100dvh] transition-colors duration-300",
					backgroundColorClass,
				)}>
				{children}
			</div>
		</PomodoroContext.Provider>
	);
};

export const usePomodoro = (): PomodoroContextType => {
	const context = useContext(PomodoroContext);

	if (!context) {
		throw new Error("usePomodoro must be used within a PomodoroProvider");
	}
	return context;
};
