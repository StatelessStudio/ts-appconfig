import { Configuration } from './configuration';
import { AppEnvironment } from './types';

/**
 * Base AppConfig class
 */
export abstract class AppConfig extends Configuration {
	NODE_ENV: AppEnvironment = 'production';
}
