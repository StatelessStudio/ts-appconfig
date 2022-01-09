import { readFileLines } from '../../src/parser/read-file';

describe('parser/read-file', () => {
	it('can read a file', () => {
		const lines = readFileLines('.env');

		expect(Array.isArray(lines)).toBeTrue();
		expect(lines.length).toBeGreaterThan(0);
		expect(lines[0].includes('APP_TITLE')).toBeTrue();
	});
});
