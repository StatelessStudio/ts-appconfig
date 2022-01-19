# ts-appconfig

## Install

`npm i ts-appconfig`

## Setup

`.env`
```
APP_TITLE="Cool App"
```

`src/index.ts`
```typescript
import { env } from './environment.ts';

console.log(env.APP_TITLE);
```

`src/environment.ts`
```typescript
import { AppConfig, configure } from '../src';

export class Environment extends AppConfig {
	readonly APP_TITLE: string = '';
}

export const env: Environment = configure(Environment);
```

Output:
```
Cool App
```
