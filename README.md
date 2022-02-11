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
import { AppConfig, configure } from '../src';

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
