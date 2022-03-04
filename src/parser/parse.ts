import { DuplicateKeyError } from '../errors/duplicate-key';
import { UnparsableLineError } from '../errors/unparsable-line';
import { ParserOptions } from '../options/parser-options';
import { RawKeyValues } from '../types';
import { lineRegex } from '../regex/line';
import { stripComment } from './strip-comment';

/**
 * Parse lines into string/string key-values
 *
 * @param lines Array of env lines
 * @param options Parser options
 * @returns Returns raw key/value pairs
 */
export function parseLines(
	lines: string[],
	options: ParserOptions
): RawKeyValues {
	const vars: RawKeyValues = {};

	for (let line of lines) {
		// Trim the line
		line = line.trim();

		// Ignore empty lines and comments
		if (!line.length || line[0] === '#') {
			continue;
		}

		// Parse the line
		const parts = line.match(lineRegex);

		if (parts === null || !parts.length) {
			if (options.skipUnknownLines) {
				continue;
			}
			else {
				throw new UnparsableLineError(
					`Could not parse env line "${line}"`
				);
			}
		}

		// Read key
		const key = parts[1];

		if (!options.allowDuplicates && key in vars) {
			throw new DuplicateKeyError(`Duplicate key "${key}"`);
		}

		// Read val
		if (!(2 in parts) || !parts[2]) {
			// Value is undefined, ignore
			continue;
		}

		const val = stripComment(parts[2]);

		// Assign value
		vars[key] = val;
	}

	return vars;
}