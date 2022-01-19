import { AppConfig, configure } from '../src';

export class Environment extends AppConfig {
	readonly APP_TITLE: string = '';
	readonly GREETING: string = '';
	readonly SHOULD_LOG_GREETING = false;
	readonly NUMBER_OF_TIMES = 1;
}

export const env: Environment = configure(Environment);
