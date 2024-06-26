# Zsh aliases

[![JSR](https://jsr.io/badges/@lttr/shell-aliases)](https://jsr.io/@lttr/shell-aliases)
[![JSR Score](https://jsr.io/badges/@lttr/shell-aliases/score)](https://jsr.io/@lttr/shell-aliases)

Retrieve and parse zsh aliases from the environment or from a file.

This package is written for `deno` and compiled for `node` using `dnt`.

## Usage (for deno)

```typescript
import {
  aliasesFromFile,
  evaluatedAliases,
} from "https://deno.land/x/shell_aliases/mod.ts";

const aliases = await evaluatedAliases();
// or
const aliases = await aliasesFromFile(pathToAliasesFile);

// aliases will be an array like:
// [
//   {
//     key: "..",
//     value: "cd .."
//   },
//   {
//     key: "ll",
//     value: "ls -l"
//   }
// ]
```

## Usage (for node)

```typescript
import { evaluatedAliases } from "@lttr/shell-aliases";
const aliases = await evaluatedAliases();
```

## Testing

```
deno task test
```

## Zero: JSR publishing

Automatically using a Github Action to https://jsr.io/@lttr/shell-aliases

Before publishing: Bumb version in `deno.json` and add git tag.

## First: Deno x publishing

This package is automatically [published](https://deno.land/x/shell_aliases)
when new tag with version is pushed to the Github repository.

```
git describe --tags # get last tag
git tag <version>
git push --tags
```

## Second: NPM publishing

There is a build script that uses [dnt](https://deno.land/x/dnt) and compiles a
npm package.

```
deno run -A _build.ts <version>
cd npm
npm publish --access public
deno task clean
```
