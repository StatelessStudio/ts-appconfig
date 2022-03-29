import { existsSync, PathLike, readFileSync } from 'fs';

import { newLineRegex } from '../regex/new-line';

/**
 * Read a file into an array of non-empty lines. If no file is found, an empty
 * 	array is returned.
 *
 * @param file Input filename
 * @returns Returns an array of strings, where each non-empty line is an
 * 	element
 */
export function readFileLines(file: PathLike): string[] {
	if (existsSync(file)) {
		return readFileSync(file)
			.toString()
			.split(new RegExp(newLineRegex, 'g'))
			.filter(line => line && line.length);
	}
	else {
		return [];
	}
}
