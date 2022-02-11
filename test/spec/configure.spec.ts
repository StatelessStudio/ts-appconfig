import { Configuration, configure, UndeclaredKeyError } from '../../src';

class Environment extends Configuration {
	readonly APP_TITLE='';
}

class ProcessEnvTestEnvironment extends Configuration {
	readonly PROC_ENV = 'test';
}

class ProcessEnvTest2Environment extends Configuration {
	readonly PROC_ENV2 = 'test';
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

	it('rehydrates process.env', () => {
		expect(process.env.PROC_ENV).toBe(undefined);

		configure(ProcessEnvTestEnvironment);
		expect(process.env.PROC_ENV).toBe('test');
	});

	it('doesn\'t rehydrate process.env when disabled', () => {
		expect(process.env.PROC_ENV2).toBe(undefined);

		configure(ProcessEnvTest2Environment, { overwriteProcessEnv: false });
		expect(process.env.PROC_ENV2).toBe(undefined);
	});
});
