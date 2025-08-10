# Fancy Translator

Fancy Translator uses the Translator API to provide fast, secure translations that run entirely in the browser.

https://translate.daidr.me/

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

### Migrate ESLint Config to Oxlint

```sh
bun lint:migrate
```

### Lint with [ESLint](https://eslint.org/) and [Oxlint](https://oxc.rs/docs/guide/usage/linter)

```sh
bun lint
```
