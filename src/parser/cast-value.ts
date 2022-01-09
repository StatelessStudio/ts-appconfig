import { floatNumberRegex } from '../regex/float-number';
import { intNumberRegex } from '../regex/int-number';
import { quotedStringRegex } from '../regex/quoted-string';

import { RawValue, Value } from '../types';

/**
 * Cast an environment variable to a best-guess type
 *
 * @param val Raw value
 * @returns Transformed value
 */
export function castValue(val?: RawValue): Value {
	if (typeof val !== 'string') {
		return val;
	}

	val = val.trim();

	if (quotedStringRegex.test(val)) {
		return val.substring(1, val.length - 1);
	}
	else if (val === 'null') {
		return null;
	}
	else if (val === 'false') {
		return false;
	}
	else if (val === 'true') {
		return true;
	}
	else if (intNumberRegex.test(val)) {
		return parseInt(val, 10);
	}
	else if (floatNumberRegex.test(val)) {
		return parseFloat(val);
	}
	else if (val === 'Infinity') {
		return Infinity;
	}

	return val;
}
