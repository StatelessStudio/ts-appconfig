import path = require('path');
import { Configuration, configure, UndeclaredKeyError } from '../../src';

class Environment extends Configuration {
	readonly APP_TITLE='';
}

class ProcessEnvTestEnvironment extends Configuration {
	readonly PROC_ENV = 'test';

	readonly TEST_READ_PROCESS_ENV: string;
	readonly TEST_DISABLE_READ_PROCESS_ENV: string;
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

	it('can accept an absolute path without a filename', () => {
		const env: Environment = configure(Environment, {
			absolutePath: path.join(process.cwd(), 'test', 'envs'),
			overwriteProcessEnv: false,
			fromProcessEnv: false,
		});

		expect(env.APP_TITLE).toBe('Default filename');
	});

	it('can accept an absolute path with a filename', () => {
		const env: Environment = configure(Environment, {
			absolutePath: path.join(
				process.cwd(),
				'test/envs/absolute.env'
			),
			overwriteProcessEnv: false,
			fromProcessEnv: false,
		});

		expect(env.APP_TITLE).toBe('Absolute Path');
	});

	it('can accept a relative path without a filename', () => {
		const env: Environment = configure(Environment, {
			relativePath: 'test/envs/',
			overwriteProcessEnv: false,
			fromProcessEnv: false,
		});

		expect(env.APP_TITLE).toBe('Default filename');
	});

	it('can accept a relative path with a filename', () => {
		const env: Environment = configure(Environment, {
			relativePath: 'test/envs/relative.env',
			overwriteProcessEnv: false,
			fromProcessEnv: false,
		});

		expect(env.APP_TITLE).toBe('Relative Path');
	});

	it('reads from process.env', () => {
		process.env.TEST_READ_PROCESS_ENV = 'read';

		const env = configure(ProcessEnvTestEnvironment);
		expect(env.TEST_READ_PROCESS_ENV).toBe('read');
	});

	it('doesn\'t read from process.env when disabled', () => {
		process.env.TEST_DISABLE_READ_PROCESS_ENV = 'read';

		const env = configure(
			ProcessEnvTestEnvironment,
			{ fromProcessEnv: false }
		);
		expect(env.TEST_DISABLE_READ_PROCESS_ENV).not.toBe('read');
	});

	it('rehydrates process.env', () => {
		configure(ProcessEnvTestEnvironment);
		expect(process.env.PROC_ENV).toBe('test');
	});

	it('doesn\'t rehydrate process.env when disabled', () => {
		expect(process.env.PROC_ENV2).toBe(undefined);

		configure(ProcessEnvTest2Environment, { overwriteProcessEnv: false });
		expect(process.env.PROC_ENV2).toBe(undefined);
	});
});
