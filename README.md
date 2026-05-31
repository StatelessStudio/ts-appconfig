# ts-appconfig

ts-appconfig is a zero-dependency node module to get strongly-typed and IDE-friendly environment variables.

Environment variables are pulled from 3 places, in this order. This means that each step will be overwritten by the following step, if that step also contains the variable:

1. Defaults from environment schema (your extended AppConfig class)
2. .env file
3. process.env

## Install

`npm i ts-appconfig`

## Setup

Create a file where you will declare your environment variable schema:

`src/environment.ts`
```typescript
import { AppConfig, configure } from 'ts-appconfig';

export class Environment extends AppConfig {
	readonly APP_TITLE: string = '';
}

export const env: Environment = configure(Environment);
```

Create a `.env` file (and perhaps a `.env.example` file, too). Make sure you add `.env` to your `.gitignore` file, if it's not there already!

`.env`
```
APP_TITLE="Cool App"
```

Now import your `env` from the schema file you created and you're ready to use the environment variables!

`src/index.ts`
```typescript
import { env } from './environment.ts';

console.log(env.APP_TITLE);
```

Output:
```
Cool App
```

## Variable Expansion

ts-appconfig supports variable expansion using the `${VARIABLE_NAME}` syntax. You can reference other variables within your environment schema or `.env` file, and they will be resolved automatically.

**Basic expansion:**

`.env`
```
APP_HOST=localhost
APP_PORT=3000
APP_URL=http://${APP_HOST}:${APP_PORT}
```

`src/environment.ts`
```typescript
export class Environment extends AppConfig {
	readonly APP_HOST: string = '';
	readonly APP_PORT: string = '';
	readonly APP_URL: string = '';
}

export const env: Environment = configure(Environment);
```

`env.APP_URL` will resolve to `http://localhost:3000`.

**Nested expansion:**

Variables can reference other variables that are themselves references. ts-appconfig will resolve them in multiple passes until all variables are expanded.

`.env`
```
FIRST=Hello
SECOND=${FIRST} World
THIRD=${SECOND}!
```

`env.THIRD` will resolve to `Hello World!`.

**Referencing number variables:**

When a string variable references a number variable, the number is cast to a string during expansion.

```typescript
export class Environment extends AppConfig {
	readonly PORT: number = 3000;
	readonly URL: string = 'http://localhost:${PORT}';
}
```

`env.URL` will resolve to `'http://localhost:3000'`.

**Circular references:**

If two variables reference each other, a `CircularReferenceError` is thrown at configuration time.

```typescript
export class Environment extends AppConfig {
	readonly A: string = '${B}';
	readonly B: string = '${A}'; // CircularReferenceError!
}
```

**Undefined references:**

If a variable references a name that does not exist in the schema, an `UndefinedReferenceError` is thrown at configuration time.

```typescript
export class Environment extends AppConfig {
	readonly A: string = '${DOES_NOT_EXIST}'; // UndefinedReferenceError!
}
```

## Options

Pass `ConfigurationOptions` as a second argument to `configure` to customize how variables are loaded and parsed. All options are optional, you only have to specify the options you would like to change.

```typescript
...
export const env: Environment = configure(Environment, {
	// Give the .env file your own name or file path
	//	Default: .env
	relativePath: 'my-own-filename.env',

	// Allow variables that are not in schema but are defined in .env
	//	Default: false
	allowUndeclared: false,

	// If true, fromProcessEnv will load .env variables from process.env
	//  Default: true
	fromProcessEnv: true,

	// Set process.env variables from the .env file
	//	Default: true
	overwriteProcessEnv: true,

	// Allow duplicate entries in the .env file for the same variable
	//	Default: false
	allowDuplicates: false,

	// Skip unknown/unparsable lines in the .env file, or throw an exception
	//	Default: false (throws exception)
	skipUnknownLines: false,
});
```
