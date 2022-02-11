import { stripComment } from '../../src/parser/strip-comment';

describe('parser/strip-comment', () => {
	it('does nothing on uncommented lines', () => {
		expect(stripComment('test')).toBe('test');
		expect(stripComment('"test"')).toBe('"test"');
		expect(stripComment('\'test\'')).toBe('\'test\'');
	});

	it('parses comments from end of lines', () => {
		expect(stripComment('test#comment')).toBe('test');
		expect(stripComment('test# comment')).toBe('test');
		expect(stripComment('test #comment')).toBe('test');
		expect(stripComment('test # comment')).toBe('test');
		expect(stripComment('"test"#comment')).toBe('"test"');
		expect(stripComment('"test" #comment')).toBe('"test"');
		expect(stripComment('"test" # comment')).toBe('"test"');
	});

	it('ignores quoted number sign', () => {
		expect(stripComment('"test#test"')).toBe('"test#test"');
		expect(stripComment('\'test#test\'')).toBe('\'test#test\'');
	});

	it('allows escaped single-quotes', () => {
		expect(stripComment('"test\\\'#test"')).toBe('"test\\\'#test"');
	});

	it('allows escaped double-quotes', () => {
		expect(stripComment('"test\\"#test"')).toBe('"test\\"#test"');
	});

	it('allows mismatched quotes', () => {
		expect(stripComment('"test\'#test"')).toBe('"test\'#test"');
		expect(stripComment('\'test"#test\'')).toBe('\'test"#test\'');
	});

	it('allows unquoted and escaped number sign', () => {
		expect(stripComment('test\\#test')).toBe('test\\#test');
	});
});