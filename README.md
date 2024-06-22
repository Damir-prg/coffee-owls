### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server

## Как запускать SSR

Запустить в дев режиме можно следующими командами:

- через `"dev"` в `packages/server/package.json`
- через `"dev:server"`(`"lerna run dev --scope=server"`) в глобальном `package.json`
- через `"dev:ssr"` в `packages/client/package.json`

Запустить в режиме прода можно следующими командами:

- через `"build"` и `"preview` в `packages/server/package.json`
- через `""build:ssr""` и `"preview:ssr"` в глобальном `package.json`

### Видео с демонстрацией

https://disk.yandex.ru/i/zY1-u1tAnmuMaA

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Docker

Для сборки образа приложения и запуска контейнеров использовать:

`docker-compose build`
`docker-compose up`

При локальной разработке веб-приложения иcпользовать для POSTGRES_HOST значение localhost, при тестовом билде докер контейнера postgres_db, также необходимо заполнить остальные переменные окружения для работы с postgres и pgadmin
