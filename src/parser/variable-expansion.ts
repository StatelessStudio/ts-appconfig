import {
	CircularReferenceError,
	UndefinedReferenceError
} from '../errors';
import { Configuration } from '../configuration';
import { variableRegex } from '../regex/variable';

/**
 * Traverse env vars, expanding variables where found. This will run through
 * 	in passes until all variables have been replaced
 *
 * @param config Configuration instance
 * @returns Returns the configuration instance with variables replaced
 */
export function variableExpansion<T extends Configuration>(config: T): T {
	let nSkipped = 0;

	do {
		nSkipped = 0;

		for (const key of Object.keys(config)) {
			const val = config[key];

			if (typeof val !== 'string') {
				continue;
			}

			const parts = val.match(variableRegex);

			if (parts) {
				const reference: string = parts[1];

				if (!(reference in config)) {
					throw new UndefinedReferenceError(
						'Undefined env reference to ' +
						`"${reference}" from "${key}"`
					);
				}

				const refval: string = config[reference];
				const refvalIsString = (typeof refval === 'string');

				if (refvalIsString && refval.includes('${' + key + '}')) {
					throw new CircularReferenceError(
						`Circular env reference: "${key}" and "${reference}"`
					);
				}

				if (refvalIsString && variableRegex.test(refval)) {
					// The key that is referenced is yet to be resolved
					nSkipped++;

					continue;
				}
				else {
					// The reference can be resolved
					const newval = val.replace('${' + reference + '}', refval);

					// Check for more refs
					if (variableRegex.test(newval)) {
						nSkipped++;
					}

					config[key] = newval;
				}
			}
		}
	} while (nSkipped > 0);

	return config;
}
