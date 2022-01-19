import {
	DuplicateKeyError,
	UnparsableLineError
} from '../../src';
import { RawKeyValues } from '../../src/types';
import { parseLines } from '../../src/parser/parse';

describe('parser/parse', () => {
	it('can parse lines', () => {
		const line = 'APP_TITLE=Hello';
		const lines: RawKeyValues = parseLines([ line ], {});

		expect(lines['APP_TITLE']).toBe('Hello');
	});

	it('ignores empty lines', () => {
		const line = '';
		const lines: RawKeyValues = parseLines([ line ], {});

		expect(Object.keys(lines).length).toBe(0);
	});

	it('ignores commented lines', () => {
		const line = '#APP_TITLE=Hello';
		const lines: RawKeyValues = parseLines([ line ], {});

		expect(Object.keys(lines).length).toBe(0);
	});

	it('skips unparsable lines when skipUnknownLines is true', () => {
		const line = 'zxcv';
		const lines: RawKeyValues = parseLines([ line ], {
			skipUnknownLines: true
		});

		expect(Object.keys(lines).length).toBe(0);
	});

	it('throws UnparsableLineException when skipUnknownLines is false', () => {
		const line = 'zxcv';
		const expectedErrorMessage = 'Could not parse env line "zxcv"';

		expect(() => parseLines([ line ], {
			skipUnknownLines: false
		})).toThrow(new UnparsableLineError(expectedErrorMessage));
	});

	it('prefers latter values if allowDuplicates is true', () => {
		const line1 = 'APP_TITLE=Hello';
		const line2 = 'APP_TITLE=World';

		const lines: RawKeyValues = parseLines([ line1, line2 ], {
			allowDuplicates: true
		});

		expect(lines['APP_TITLE']).toBe('World');
	});

	it('throws DuplicateLineException if allowDuplicates is false', () => {
		const line1 = 'APP_TITLE=Hello';
		const line2 = 'APP_TITLE=World';
		const expectedErrorMessage = 'Duplicate key "APP_TITLE"';

		expect(() => parseLines([ line1, line2 ], {
			allowDuplicates: false
		})).toThrow(new DuplicateKeyError(expectedErrorMessage));
	});
});
