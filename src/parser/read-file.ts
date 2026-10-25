import { existsSync, PathLike, readFileSync } from 'fs';

import { newLineRegex } from '../regex/new-line';

/**
 * Read a file into an array of lines. If no file is found, an empty
 * 	array is returned.
 *
 * @param file Input filename
 * @returns Returns an array of strings, where each line is an
 * 	element
 */
export function readFileLines(file: PathLike): string[] {
	if (existsSync(file)) {
		const lines = readFileSync(file)
			.toString()
			.split(new RegExp(newLineRegex, 'g'));

		if (lines[lines.length - 1] === '') {
			lines.pop();
		}

		return lines;
	}
	else {
		return [];
	}
}
