import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

await emptyDir("./npm");
await emptyDir("./npm/esm");
await emptyDir("./npm/script");

// Copy test data
Deno.copyFileSync("fixture", "npm/esm/fixture");
Deno.copyFileSync("fixture", "npm/script/fixture");

// Perform build for npm
await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
    custom: [{
      globalNames: ["TextEncoder", "TextDecoder"],
      module: "util",
    }],
  },
  compilerOptions: {
    lib: ["esnext"],
  },
  package: {
    name: "@lttr/shell-aliases",
    version: Deno.args[0],
    description:
      "Retrieve and parse zsh aliases from the environment or from a file",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/lttr/deno-shell-aliases.git",
    },
    bugs: {
      url: "https://github.com/lttr/deno-shell-aliases/issues",
    },
    engines: {
      node: ">=16.9",
    },
  },
});

// Copy project files
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");

// Discard test data from npm package
await Deno.writeTextFile(
  "npm/.npmignore",
  "esm/fixture/\nscript/fixture/\n",
  { append: true },
);
