import { ConfigurationOptions } from './options';

export const defaultConfigurationOptions: ConfigurationOptions = {
	relativePath: '.env',
	allowDuplicates: false,
	allowUndeclared: true,
	skipUnknownLines: false,
	overwriteProcessEnv: true,
};
