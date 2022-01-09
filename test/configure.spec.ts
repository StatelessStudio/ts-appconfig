import { Configuration, configure, UndeclaredKeyError } from '../src';

class Environment extends Configuration {
	readonly APP_TITLE='';
}

describe('configure', () => {
	it('loads env variables', () => {
		const env: Environment = configure(Environment);
		expect(env.APP_TITLE).toBe('Typescript App Config');
	});

	it('can check for undeclared variables', () => {
		const expectedErrorMessage =
			'Key "NODE_ENV" not specified in config class';

		expect(() => configure(Environment, {
			allowUndeclared: false
		})).toThrow(new UndeclaredKeyError(expectedErrorMessage));
	});
});
