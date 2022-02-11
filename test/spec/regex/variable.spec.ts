import { variableRegex } from '../../../src/regex/variable';

describe('regex/variable', () => {
	it('tests positive on variable', () => {
		expect(variableRegex.test('${APP_VAR}')).toBeTrue();
	});

	it('tests negative on a dollar-sign', () => {
		expect(variableRegex.test('$APP_VAR')).toBeFalse();
	});

	it('tests negative on curly braces', () => {
		expect(variableRegex.test('{APP_VAR}')).toBeFalse();
	});

	it('tests negative on string', () => {
		expect(variableRegex.test('APP_VAR')).toBeFalse();
	});
});
