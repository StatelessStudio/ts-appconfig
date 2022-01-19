import { intNumberRegex } from '../../src/regex/int-number';

describe('regex/int-number', () => {
	it('tests positive on integer numbers', () => {
		expect(intNumberRegex.test('123')).toBeTrue();
	});

	it('tests positive on negative integer numbers', () => {
		expect(intNumberRegex.test('-123')).toBeTrue();
	});

	it('tests negative on float numbers', () => {
		expect(intNumberRegex.test('123.45')).toBeFalse();
	});

	it('tests negative on strings', () => {
		expect(intNumberRegex.test('hello')).toBeFalse();
	});
});
