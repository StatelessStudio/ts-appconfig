import { castValue } from '../../../src/parser/cast-value';

describe('parser/cast-value', () => {
	it('can accept undefined value', () => {
		expect(castValue(undefined)).toBe(undefined);
	});

	it('can accept null value', () => {
		expect(castValue(null)).toBeNull();
	});

	it('can return null', () => {
		expect(castValue('null')).toBeNull();
	});

	it('can return null (string)', () => {
		expect(castValue('"null"')).toBe('null');
	});

	it('can return false', () => {
		expect(castValue('false')).toBeFalse();
	});

	it('can return false (string)', () => {
		expect(castValue('"false"')).toBe('false');
	});

	it('can return true', () => {
		expect(castValue('true')).toBeTrue();
	});

	it('can return true (string)', () => {
		expect(castValue('"true"')).toBe('true');
	});

	it('can return number', () => {
		const val = castValue('0');

		expect(val).toBe(0);
		expect(typeof val).toBe('number');
	});

	it('can return number (string)', () => {
		const val = castValue('"0"');

		expect(val).toBe('0');
		expect(typeof val).toBe('string');
	});

	it('can return float', () => {
		const val = castValue('123.45');

		expect(val).toBe(123.45);
		expect(typeof val).toBe('number');
	});

	it('can return float (string)', () => {
		const val = castValue('"123.45"');

		expect(val).toBe('123.45');
		expect(typeof val).toBe('string');
	});

	it('can return Infinity', () => {
		const val = castValue('Infinity');

		expect(val).toBe(Infinity);
		expect(typeof val).toBe('number');
	});

	it('can return Infinity (string)', () => {
		const val = castValue('"Infinity"');

		expect(val).toBe('Infinity');
		expect(typeof val).toBe('string');
	});
});
