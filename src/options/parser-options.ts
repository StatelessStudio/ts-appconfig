export interface ParserOptions {
	// Allow duplicate keys in a file?
	allowDuplicates?: boolean;

	// Skip unparsable lines (true), or throw an error (false)?
	skipUnknownLines?: boolean;
}
