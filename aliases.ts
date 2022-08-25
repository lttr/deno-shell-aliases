export interface Alias {
  key: string;
  value: string;
}

export async function evaluatedAliases(): Promise<Alias[]> {
  const { success, output } = await command([
    "zsh",
    "--interactive",
    "-c",
    "alias",
  ]);
  if (success) {
    return parseAliases(output.split("\n"));
  }
  return [];
}

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

async function command(params: string[]): Promise<{
  success: boolean;
  code: number;
  output: string;
}> {
  const process = Deno.run({
    cmd: params,
    stdout: "piped",
  });
  const { success, code } = await process.status();
  const stdout = await process.output();
  const output = new TextDecoder().decode(stdout).trim();
  process.close();
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
