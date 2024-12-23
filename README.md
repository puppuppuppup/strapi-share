## Содержание
- [Содержание](#содержание)
- [О проекте](#о-проекте)
- [Перенос типов из Strapi](#перенос-типов-из-strapi)
- [Использование типов](#использование-типов)
- [Интеграция с нашими продуктами](#интеграция-с-нашими-продуктами)
  - [`@md_team/api-factory`](#puppupapi-factory)

## О проекте
В проекте представлено решение, помогающее получить доступ к типам `Strapi` извне.

> Проект построен на базе `Strapi 5`.

## Перенос типов из Strapi

1. Создать в корне проекта файл `copyTypes.ts` / `copyTypes.js`
```ts
// copyTypes.ts

import { copyStrapiTypes } from '@md_team/strapi-share';

copyStrapiTypes({
    // путь до папки проекта Strapi
    strapiPath: 'path/to/strapi',
    // путь, куда будут помещены сгенерированные типы
    destPath: './src/types/strapi',
});
```

```js
// copyTypes.js

const copyStrapiTypes = require('@md_team/strapi-share').copyStrapiTypes;

copyStrapiTypes({
    // путь до папки проекта Strapi
    strapiPath: 'path/to/strapi',
    // путь, куда будут помещены сгенерированные типы
    destPath: './src/types/strapi',
});
```

2. Добавить скрипт в `package.json`

```json
// package.json

{
    "scripts": {
        "types": "node copyTypes.js",
        // или
        "types": "npx ts-node copyTypes.ts"
    }
}
```
3. Запустить скрипт в терминале
```sh
npm run types
```

## Использование типов
Для правильного подтягивания типов необходимо установить пакет `@strapi/strapi`
```ts
import { APIResponse, APIResponseCollection, GetStrapiType } from '@md_team/strapi-share';
import { UID } from '@strapi/strapi'

// Использование типа, описывающего UID моделей
type StrapiModelUID = UID.ContentType | UID.Component;
const userSchemaUID: StrapiModelUID = 'plugin::users-permissions.user';

// Получение типа модели по его UID
type User = GetStrapiType<'plugin::users-permissions.user'>;

// Получение типа ответа Strapi на запрос по UID модели (одиночный)
type UserApi = APIResponse<'plugin::users-permissions.user'>;

// Получение типа ответа Strapi на запрос по UID модели (коллекция)
type UsersApi = APIResponseCollection<'plugin::users-permissions.user'>;
```

## Интеграция с нашими продуктами
### [`@md_team/api-factory`](https://github.com/makediff-dev/api-factory)
`ApiStrapiTypes` создает типы, которые можно использовать для типизации `ApiFactory` на базе стандартных ответов `Strapi`
```ts
import { Api, ApiFactory, ... } from '@md_team/api-factory';
import { ApiStrapiTypes } from '@pupppup/strapi-share';

...

// Использование утилиты для создания кастомных типов под Strapi
type ApiTypes = ApiStrapiTypes<'plugin::users-permissions.user'>;

// ApiFactory
const { apis } = new ApiFactory({
    httpConfig: HTTP_CONFIG,
    apisConfig: {
        usersApi: {
            instanceClass: Api<ApiTypes>,
            endpoint: 'users',
        },
    },
});

```
