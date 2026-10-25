import { readFileLines } from '../../../src/parser/read-file';

describe('parser/read-file', () => {
	it('can read a file', () => {
		const lines = readFileLines('.env');

		expect(Array.isArray(lines)).toBeTrue();
		expect(lines.length).toBeGreaterThan(0);
		expect(lines[0].includes('APP_TITLE')).toBeTrue();
	});

	it('returns an empty array if the file does not exist', () => {
		const lines = readFileLines('non-existing-file.env');

		expect(Array.isArray(lines)).toBeTrue();
		expect(lines.length).toBe(0);
	});

	it('preserves empty lines', () => {
		const lines = readFileLines('test/envs/multiline.env');

		expect(lines).toEqual([
			'APP_TITLE="Hello',
			'',
			'World"'
		]);
	});
});
