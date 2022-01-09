import { env } from './env';

// Log the APP_TITLE from .env
console.log(env.APP_TITLE);

// Should log a greeting?
if (env.SHOULD_LOG_GREETING) {
	// Log the greeting X times, where X = NUMBER_OF_TIMES
	for (let i = 0; i < env.NUMBER_OF_TIMES; i++) {
		// Log the greeting
		console.log(env.GREETING);
	}
}
