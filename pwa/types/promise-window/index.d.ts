declare module 'promise-window' {
	interface WindowFeatures {
		left?: number;
		top?: number;
		height?: number;
		width?: number;
		screenX?: number;
		screenY?: number;
		outerHeight?: number;
		outerWidth?: number;
		innerHeight?: number;
		innerWidth?: number;
		menubar?: boolean;
		toolbar?: boolean;
		location?: boolean;
		personalbar?: boolean;
		status?: boolean;
		dependent?: boolean;
		minimizable?: boolean;
		fullscreen?: boolean;
		noopener?: boolean;
		noreferrer?: boolean;
		resizable?: boolean;
		scrollbars?: boolean;
		chrome?: boolean;
		dialog?: boolean;
		modal?: boolean;
		titlebar?: boolean;
		alwaysRaised?: boolean;
		alwaysLowered?: boolean;
		alwaysOnTop?: boolean;
		'z-lock'?: boolean;
		close?: boolean;
	}

	interface PromiseWindowConfig {
		width?: number;
		height?: number;
		promiseProvider?: () => any;
		onPostMessage?: (event: string) => void;
		watcherDelay?: number;
		windowName?: string;
		window?: WindowFeatures;
		onClose?: () => void;
		originRegexp?: RegExp;
	}

	type PromiseWindowResult = Promise<{ message: string }>;

	class PromiseWindow {
		public static open(uri: string, config?: PromiseWindowConfig): PromiseWindowResult;
		public constructor(uri: string, config?: PromiseWindowConfig);
		public setURI(uri: string): PromiseWindow;
		public isOpen(): boolean;
		public open(): PromiseWindowResult;
		public close(): void;
	}

	export = PromiseWindow;
}
