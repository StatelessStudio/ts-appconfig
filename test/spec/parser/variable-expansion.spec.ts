import {
	CircularReferenceError
} from '../../../src/errors/circular-reference';

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
	A = '${B}';
	B = '${A}';
}

describe('parser/variable-expansion', () => {
	it('can expand variables', () => {
		expect(env.C).toBe('Hello World');
	});

	it('can resolve nested variables', () => {
		expect(env.NESTED).toBe('Hello World');
	});

	it('can detect circular references', () => {
		const expectedErrorMessage = 'Circular env reference: "A" and "B"';

		expect(() => configure(CircularRefEnvironment)).toThrow(
			new CircularReferenceError(expectedErrorMessage)
		);
	});

	it('can reference a number variable', () => {
		expect(env.NUMBER_REF).toBe('2');
	});
});
