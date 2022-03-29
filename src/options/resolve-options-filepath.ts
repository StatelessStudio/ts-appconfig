import { PathLike } from 'fs';
import * as path from 'path';
import { ConfigurationOptions } from './options';

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
