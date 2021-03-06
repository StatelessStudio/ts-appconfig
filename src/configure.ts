import { Configuration } from './configuration';

import { UndeclaredKeyError } from './errors/undeclared-key';

import { ConfigurationOptions } from './options/options';
import { defaultConfigurationOptions } from './options/defaults';

import { RawKeyValues } from './types';

import { parseLines } from './parser/parse';
import { readFileLines } from './parser/read-file';
import { castValue } from './parser/cast-value';
import { variableExpansion } from './parser/variable-expansion';
import { resolveOptionsFilepath } from './options/resolve-options-filepath';

/**
 * Create and hydrate a Configuration instance
 *
 * @param configClass
 * @param options
 * @returns Returns the configuration instance
 */
export function configure<T extends Configuration>(
	configClass: { new (): T },
	options: Partial<ConfigurationOptions> = null
): T {
	// Apply options
	if (options) {
		options = Object.assign({}, defaultConfigurationOptions, options);
	}
	else {
		options = Object.assign({}, defaultConfigurationOptions);
	}

	// Read vars
	const file = resolveOptionsFilepath(options);
	const lines: string[] = readFileLines(file);
	const envFileVars: RawKeyValues = parseLines(lines, options);

	// Create instance
	const configInstance: T = new configClass();

	// Check for undeclared variables
	if (options.allowUndeclared === false) {
		for (const key of Object.keys(envFileVars)) {
			if (!(key in configInstance)) {
				throw new UndeclaredKeyError(
					`Key "${key}" not specified in config class`
				);
			}
		}
	}

	// Hydrate from .env
	for (const key in envFileVars) {
		configInstance[key] = castValue(envFileVars[key]);
	}

	// Hydrate from process.env
	if (options.fromProcessEnv) {
		for (const key in process.env) {
			configInstance[key] = castValue(process.env[key]);
		}
	}

	// Variable expansion
	const expanded: T = variableExpansion(configInstance);

	// Hydrate back to process.env
	if (options.overwriteProcessEnv) {
		for (const key in expanded) {
			process.env[key] = `${expanded[key]}`;
		}
	}

	// Return
	return expanded;
}
