## Содержание
- [Содержание](#содержание)
- [О проекте](#о-проекте)
- [Перенос типов из Strapi](#перенос-типов-из-strapi)
- [Использование типов](#использование-типов)
- [Интеграция с нашими продуктами](#интеграция-с-нашими-продуктами)
  - [`@puppup/api-factory`](#puppupapi-factory)

## О проекте
В проекте представлено решение, помогающее получить доступ к типам `Strapi` извне.

> Проект построен на базе `Strapi 5`.

## Перенос типов из Strapi

1. Создать в корне проекта файл `copyTypes.ts`

```ts
// copyTypes.ts

import { copyStrapiTypes } from '@puppup/strapi-share';

copyStrapiTypes({
    // путь до папки проекта Strapi
    strapiPath: 'path/to/strapi',
    // путь, куда будут помещены сгенерированные типы
    destPath: './types/strapi',
});
```

2. Добавить скрипт в `package.json`

```json
// package.json

{
    ...
    "scripts": {
        "types": "npx ts-node ./copyTypes.ts"
    }
    ...
}
```
3. Запустить скрипт в терминале
```sh
npm run types
```

## Использование типов
```ts
import { APIResponse, StrapiModelUID, APIResponseCollection, GetStrapiType } from '@puppup/strapi-share';

// Использование типа, описывающего UID моделей
const userSchemaUID: StrapiModelUID = 'plugin::users-permissions.user';

// Получение типа модели по его UID
type User = GetStrapiType<'plugin::users-permissions.user'>;

// Получение типа ответа Strapi на запрос по UID модели (одиночный)
type UserApi = APIResponse<'plugin::users-permissions.user'>;

// Получение типа ответа Strapi на запрос по UID модели (коллекция)
type UsersApi = APIResponseCollection<'plugin::users-permissions.user'>;
```

## Интеграция с нашими продуктами
### [`@puppup/api-factory`](https://github.com/puppuppuppup/api-factory)
`ApiStrapiTypes` создает типы, которые можно использовать для типизации `ApiFactory` на базе стандартных ответов `Strapi`
```ts
import { ApiFactory } from '@puppup/api-factory';
import { ApiStrapiTypes } from '@pupppup/strapi-share';

const apiFactory = new ApiFactory({
    baseUrl: 'base_url'
});

type ApiTypes = ApiStrapiTypes<'plugin::users-permissions.user'>;

class UsersApi extends apiFactory.getApi<ApiTypes>('users') {}
```
