import { PathLike } from 'fs';
import * as path from 'path';
import { ConfigurationOptions } from './options';

/**
 * Resolve a single filepath from an absolute or relative path string
 *
 * @param filePath The path to resolve
 * @param isAbsolute Whether the path is absolute or relative to cwd
 * @returns Returns the resolved filepath
 */
function resolveSingleFilepath(
	filePath: string,
	isAbsolute: boolean
): PathLike {
	let file: PathLike = isAbsolute
		? filePath
		: path.join(process.cwd(), filePath);

	const filename = path.basename(file);

	if (!filename.includes('.')) {
		file = path.join(file, '.env');
	}
	else {
		file = path.join(file);
	}

	return file;
}

/**
 * Resolve the target filepath from options
 *
 * @param options Configuration options
 * @returns Returns the target filepath
 */
export function resolveOptionsFilepath(
	options: ConfigurationOptions
): PathLike {
	let file: PathLike;

	if (options.absolutePath) {
		file = options.absolutePath;
	}
	else if (options.relativePath) {
		file = path.join(process.cwd(), options.relativePath);
	}
	else {
		file = process.cwd();
	}

	const filename = path.basename(file);

	if (!filename.includes('.')) {
		file = path.join(file, '.env');
	}
	else {
		file = path.join(file);
	}

	return file;
}

/**
 * Resolve all target filepaths from options, supporting both single paths
 * 	and arrays of paths. Paths are returned in order: single path first,
 * 	then array paths.
 *
 * @param options Configuration options
 * @returns Returns an array of target filepaths
 */
export function resolveOptionsFilepaths(
	options: ConfigurationOptions
): PathLike[] {
	const files: PathLike[] = [];

	// Single absolute path
	if (options.absolutePath) {
		files.push(resolveSingleFilepath(options.absolutePath, true));
	}

	// Array of absolute paths
	if (options.absolutePaths && options.absolutePaths.length) {
		for (const p of options.absolutePaths) {
			files.push(resolveSingleFilepath(p, true));
		}
	}

	// Single relative path
	if (!options.absolutePath && !options.absolutePaths?.length) {
		if (options.relativePath) {
			files.push(resolveSingleFilepath(options.relativePath, false));
		}
		else if (!options.relativePaths?.length) {
			// Default: load .env from cwd
			files.push(resolveSingleFilepath(process.cwd(), true));
		}
	}

	// Array of relative paths
	if (options.relativePaths && options.relativePaths.length) {
		for (const p of options.relativePaths) {
			files.push(resolveSingleFilepath(p, false));
		}
	}

	return files;
}
