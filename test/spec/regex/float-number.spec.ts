import { floatNumberRegex } from '../../../src/regex/float-number';

describe('regex/float-number', () => {
	it('tests positive on float numbers', () => {
		expect(floatNumberRegex.test('123.45')).toBeTrue();
	});

	it('tests negative on integer numbers', () => {
		expect(floatNumberRegex.test('123')).toBeFalse();
	});

	it('tests positive on signed float numbers', () => {
		expect(floatNumberRegex.test('-123.45')).toBeTrue();
	});

	it('tests negative on signed integer numbers', () => {
		expect(floatNumberRegex.test('-123')).toBeFalse();
	});

	it('tests negative on strings', () => {
		expect(floatNumberRegex.test('hello')).toBeFalse();
	});
});
