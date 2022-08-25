# Zsh aliases

Retrieve and parse zsh aliases from the environment or from a file.

This package is written for `deno` and compiled for `node` using `dnt`.

## Usage (for deno)

```typescript
import { evaluatedAliases, aliasesFromFile } from "https://deno.land/x/shell_aliases/mod.ts";

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

## First: Deno x publishing

This package is automatically [published](https://deno.land/x/shell_aliases) when new tag with version is pushed to the Github repository.

```
git tag <version>
git push
```

## Second: NPM publishing

There is a build script that uses [dnt](https://deno.land/x/dnt) and compiles a
npm package.

```
deno run -A _build.ts $(git tag | head -n 1)
cd npm
npm publish
```

