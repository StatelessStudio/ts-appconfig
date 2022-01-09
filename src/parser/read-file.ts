import { readFileSync } from 'fs';
import { join as joinPath } from 'path';

import { newLineRegex } from '../regex/new-line';

/**
 * Read a file into an array of non-empty lines
 *
 * @param filename Input filename
 * @returns Returns an array of strings, where each non-empty line is an
 * 	element
 */
export function readFileLines(filename: string): string[] {
	const file = joinPath(process.cwd(), filename);

	return readFileSync(file)
		.toString()
		.split(new RegExp(newLineRegex, 'g'))
		.filter(line => line && line.length);
}
