/** A shape of the values that are output from this module functions. */
export interface Alias {
  key: string;
  value: string;
}

/**
 * Retrieves a list of aliases from the current shell environment in a structured array.
 *
 * @returns A Promise that resolves to an array of Alias objects representing the evaluated aliases.
 */
export async function evaluatedAliases(): Promise<Alias[]> {
  const { success, output } = await command("zsh", [
    "--interactive",
    "-c",
    "alias",
  ]);
  if (success) {
    return parseAliases(output.split("\n"));
  }
  return [];
}

/**
 * Reads aliases declarations from a file and returns them in a structured array.
 *
 * @param filename - The name of the file to read aliases from.
 * @returns A Promise that resolves to an array of Alias objects.
 * @throws If there is an error reading the file or parsing the aliases.
 */
export async function aliasesFromFile(filename: string): Promise<Alias[]> {
  const lines = await readFileLines(filename);
  const filteredLines = lines.filter((line) => line.startsWith("alias")).map(
    (line) => line.replace(/^alias /, ""),
  );
  return parseAliases(filteredLines);
}

/**
 * Expects every line of input to be in following format:
 *
 * key='value'
 * or
 * key="value"
 *
 * where `key` is the name of an alias and `value` is the what the alias stands for
 */
function parseAliases(rawAliases: string[]): Alias[] {
  return rawAliases.map((alias) => {
    const indexOfDelimeter = alias.indexOf("=");
    const quotedValue = alias.substring(indexOfDelimeter + 1);
    return {
      key: alias.substring(0, indexOfDelimeter),
      value: removeQuotes(quotedValue),
    };
  });

  function removeQuotes(rawValue: string) {
    let value = rawValue;
    if (rawValue.startsWith("'")) {
      value = rawValue.replace(/^'/, "");
    } else if (rawValue.startsWith('"')) {
      value = rawValue.replace(/^"/, "");
    }
    if (value.endsWith("'")) {
      value = value.replace(/'$/, "");
    } else if (value.endsWith('"')) {
      value = value.replace(/"$/, "");
    }
    return value;
  }
}

async function command(command: string, args: string[]): Promise<{
  success: boolean;
  code: number;
  output: string;
}> {
  const process = new Deno.Command(command, {
    args,
    stdout: "piped",
  });
  const { success, stdout, code } = await process.output();
  const output = new TextDecoder().decode(stdout).trim();
  return { success, code, output };
}

async function readFileLines(pathToFile: string): Promise<string[]> {
  let fileLines: string[] = [];
  try {
    const fileString = await Deno.readTextFile(pathToFile);
    fileLines = fileString.split("\n");
  } catch (err) {
    throw new Error(
      `File not found on path '${pathToFile}'`,
      { cause: err },
    );
  }
  return fileLines;
}
