// NODE_ENV
export type AppEnvironment =
	'development' |
	'production' |
	'test' |
	'unit' |
	string;

// KeyValue storage
export type Key = string;

export type RawValue = undefined|null|string;
export type RawKeyValues = Record<Key, RawValue>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Value = any;
