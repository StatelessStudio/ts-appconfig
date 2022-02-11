import { newLineRegex } from '../../../src/regex/new-line';

describe('regex/new-line', () => {
	it('tests positive on \n', () => {
		expect(newLineRegex.test('\n')).toBeTrue();
	});

	it('tests positive on \r', () => {
		expect(newLineRegex.test('\r')).toBeTrue();
	});

	it('tests positive on \r\n', () => {
		expect(newLineRegex.test('\r\n')).toBeTrue();
	});

	it('tests negative with no line-ending', () => {
		expect(newLineRegex.test('n')).toBeFalse();
		expect(newLineRegex.test('r')).toBeFalse();
	});
});
