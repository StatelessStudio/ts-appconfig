import { Configuration } from '../src';

class Environment extends Configuration {
}

describe('Configuration', () => {
	it('is exported', () => {
		expect(Environment).toBeDefined();
	});
});
