import { join } from "path";

export const Extensions = [
	'.js', '.ts', '.tsx'
];

function BaseDir(...paths: string[]): string {
	return join(__dirname, '..', ...paths);
}

export function ApiDir(...paths: string[]): string {
	return BaseDir('api', ...paths);
}

export function ApiSrcDir(...paths: string[]): string {
	return ApiDir('src', ...paths);
}

export function DistDir(...paths: string[]): string {
	return BaseDir('dist', ...paths);
}

export function PwaDir(...paths: string[]): string {
	return BaseDir('pwa', ...paths);
}

export function PwaSrcDir(...paths: string[]): string {
	return PwaDir('src', ...paths);
}
