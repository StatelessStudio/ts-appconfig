import {
	resolveOptionsFilepath,
	resolveOptionsFilepaths
} from '../../../src/options/resolve-options-filepath';
import * as path from 'path';

describe('options/resolve-options-filepath', () => {
	it('can use a default file', () => {
		const file = resolveOptionsFilepath({ });

		expect(file).toEqual(path.join(process.cwd(), '.env'));
	});

	it('can accept a relative file', () => {
		const file = resolveOptionsFilepath(
			{ relativePath: 'test/relative.env' }
		);

		expect(file).toEqual(path.join(
			process.cwd(),
			'test/relative.env'
		));
	});

	it('can accept a relative directory', () => {
		const file = resolveOptionsFilepath({ relativePath: 'test/' });

		expect(file).toEqual(path.join(process.cwd(), 'test', '.env'));
	});

	it('can accept an absolute file', () => {
		const file = resolveOptionsFilepath(
			{ absolutePath: 'C:/test/absolute.env' }
		);

		expect(file).toEqual(path.join('C:/test/absolute.env'));
	});

	it('can accept an absolute directory', () => {
		const file = resolveOptionsFilepath({ absolutePath: 'C:/test/' });

		expect(file).toEqual(path.join('C:/test/.env'));
	});
});

describe('options/resolve-options-filepaths', () => {
	it('returns the default file when no options are given', () => {
		const files = resolveOptionsFilepaths({ });

		expect(files).toEqual([path.join(process.cwd(), '.env')]);
	});

	it('returns a single relative file', () => {
		const files = resolveOptionsFilepaths(
			{ relativePath: 'test/relative.env' }
		);

		expect(files).toEqual([
			path.join(process.cwd(), 'test/relative.env')
		]);
	});

	it('returns multiple relative files in order', () => {
		const files = resolveOptionsFilepaths({
			relativePaths: [
				'test/envs/multi-first.env',
				'test/envs/multi-second.env',
			]
		});

		expect(files).toEqual([
			path.join(process.cwd(), 'test/envs/multi-first.env'),
			path.join(process.cwd(), 'test/envs/multi-second.env'),
		]);
	});

	it('returns a single absolute file', () => {
		const files = resolveOptionsFilepaths(
			{ absolutePath: 'C:/test/absolute.env' }
		);

		expect(files).toEqual([path.join('C:/test/absolute.env')]);
	});

	it('returns multiple absolute files in order', () => {
		const files = resolveOptionsFilepaths({
			absolutePaths: [
				'C:/test/first.env',
				'C:/test/second.env',
			]
		});

		expect(files).toEqual([
			path.join('C:/test/first.env'),
			path.join('C:/test/second.env'),
		]);
	});
});
