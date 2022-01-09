import { AppConfig, configure } from '../src';

class Environment extends AppConfig {
}

const env: Environment = configure(Environment);

describe('AppConfig', () => {
	it('loads NODE_ENV', () => {
		expect(env.NODE_ENV).toBe('test');
	});
});
