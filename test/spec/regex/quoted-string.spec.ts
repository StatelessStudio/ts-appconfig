import { quotedStringRegex } from '../../../src/regex/quoted-string';

describe('regex/quoted-string', () => {
	it('tests positive on double-quoted string', () => {
		expect(quotedStringRegex.test('"Quoted"')).toBeTrue();
	});

	it('tests positive on single-quoted string', () => {
		expect(quotedStringRegex.test('\'Quoted\'')).toBeTrue();
	});

	it('tests negative on unquoted string', () => {
		expect(quotedStringRegex.test('Unquoted')).toBeFalse();
	});
});
