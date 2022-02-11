import 'jasmine';

import { Configuration, configure, defaultConfigurationOptions } from '../../src';

describe('ts-appconfig', () => {
	it('exports a configuration class', () => {
		expect(Configuration).toBeDefined();
	});

	it('exports a configure function', () => {
		expect(configure).toBeDefined();
	});

	it('exports default configuration items', () => {
		expect(defaultConfigurationOptions).toBeDefined();
		expect(defaultConfigurationOptions.allowDuplicates).toBeDefined();
		expect(defaultConfigurationOptions.allowUndeclared).toBeDefined();
		expect(defaultConfigurationOptions.relativePath).toBeDefined();
		expect(defaultConfigurationOptions.skipUnknownLines).toBeDefined();
	});
});
