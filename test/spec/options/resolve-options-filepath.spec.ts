import {
	resolveOptionsFilepath
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
