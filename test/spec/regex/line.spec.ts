import { lineRegex } from '../../../src/regex/line';

describe('regex/line', () => {
	it('tests positive on env line', () => {
		expect(lineRegex.test('APP_TITLE=Hello')).toBeTrue();
	});

	it('tests positive on quoted env line', () => {
		expect(lineRegex.test('APP_TITLE="Hello World"')).toBeTrue();
	});

	it('tests positive on commented', () => {
		const str = 'APP_TITLE="Hello World" # Comment!';
		expect(lineRegex.test(str)).toBeTrue();
	});

	it('can parse key/value', () => {
		const key = 'APP_TITLE';
		const val = 'Hello';
		const line = `${key}=${val}`;
		const result = 'APP_TITLE=Hello'.match(lineRegex);

		expect(result[0]).toEqual(line);
		expect(result[1]).toEqual(key);
		expect(result[2]).toEqual(val);
	});
});
