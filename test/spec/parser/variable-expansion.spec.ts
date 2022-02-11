import {
	CircularReferenceError,
	UndefinedReferenceError
} from '../../../src/errors';

import { AppConfig, configure } from '../../../src';

export class Environment extends AppConfig {
	NESTED = '${C}';
	A = 'Hello';
	B = 'World';
	C = '${A} ${B}';
	NUMBER = 2;
	NUMBER_REF = '${NUMBER}';
}

export const env: Environment = configure(Environment);

export class CircularRefEnvironment extends AppConfig {
	CIRCLE_A = '${CIRCLE_B}';
	CIRCLE_B = '${CIRCLE_A}';
}

export class UndefinedReferenceEnvironment extends AppConfig {
	TEST = '${NOTHING}';
}

describe('parser/variable-expansion', () => {
	it('can expand variables', () => {
		expect(env.C).toBe('Hello World');
	});

	it('can resolve nested variables', () => {
		expect(env.NESTED).toBe('Hello World');
	});

	it('can detect circular references', () => {
		const expectedErrorMessage =
			'Circular env reference: "CIRCLE_A" and "CIRCLE_B"';

		expect(() => configure(CircularRefEnvironment)).toThrow(
			new CircularReferenceError(expectedErrorMessage)
		);
	});

	it('can reference a number variable', () => {
		expect(env.NUMBER_REF).toBe('2');
	});

	it('can detect undefined references', () => {
		const expectedErrorMessage =
			'Undefined env reference to "NOTHING" from "TEST"';

		expect(() => configure(UndefinedReferenceEnvironment)).toThrow(
			new UndefinedReferenceError(expectedErrorMessage)
		);
	});
});
