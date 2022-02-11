import { ParserOptions } from './parser-options';

export interface ConfigurationOptions extends ParserOptions {
	/**
	 * Relative filename to load (relative to cwd)
	 */
	relativePath: string;

	/**
	 * This check throws an exception if there is a key in the .env file
	 *	which is not in the config. This setting should be used with caution,
	 *	as a config key which is declared but not defined will throw this error
	 *	as well.
	 *	e.g. `APP_TITLE: string;` opposed to `APP_TITLE: string = '';`
	 */
	allowUndeclared?: boolean;

	/**
	 * If true, overwriteProcessEnv will set/reset process.env variables
	 * 	after the default schema and .env file are loaded. This way, variables
	 * 	defined in your schema class or that are in the .env will also be
	 * 	available in process.env. This is useful for packages that read
	 * 	directly from process.env. Disable this option to read-only from
	 * 	process.env.
	 */
	overwriteProcessEnv?: boolean;
}
