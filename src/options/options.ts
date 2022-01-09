import { ParserOptions } from './parser-options';

export interface ConfigurationOptions extends ParserOptions {
	// Relative filename to load (relative to cwd)
	relativePath: string;

	// This check throws an exception if there is a key in the .env file
	// 	which is not in the config. This setting should be used with caution,
	// 	as a config key which is declared but not defined will throw this error
	// 	as well.
	//	e.g. `APP_TITLE: string;` opposed to `APP_TITLE: string = '';`
	allowUndeclared?: boolean;
}
