import { existsSync, readFileSync } from 'fs';
import { join as joinPath } from 'path';

import { newLineRegex } from '../regex/new-line';

/**
 * Read a file into an array of non-empty lines. If no file is found, an empty
 * 	array is returned.
 *
 * @param filename Input filename
 * @returns Returns an array of strings, where each non-empty line is an
 * 	element
 */
export function readFileLines(filename: string): string[] {
	const file = joinPath(process.cwd(), filename);

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
