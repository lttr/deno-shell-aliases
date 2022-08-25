# Zsh aliases

Retrieve and parse zsh aliases from the environment or from a file.

## Usage

```typescript
import { evaluatedAliases } from "https://deno.land/x/shell_aliases/mode.ts";

const aliases = await evaluatedAliases()
// or
const aliases = aliasesFromFile(pathToAliasesFile)

// aliases will be an array like:
// [
// 	{
// 		key: "..",
// 		value: "cd .."
// 	},
// 	{
// 		key: "ll",
// 		value: "ls -l"
// 	}
// ]
```
