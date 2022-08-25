import { aliasesFromFile } from "./mod.ts";
import { assertEquals, assertRejects } from "./deps.ts";

const fixture = "./fixture";

Deno.test("reads 5 lines of aliases", () => {
  aliasesFromFile(fixture).then((items) => {
    assertEquals(items.length, 5);
  });
});

Deno.test("parses the key and value", () => {
  aliasesFromFile(fixture).then((items) => {
    assertEquals(items.find((item) => item.key === "ni")?.value, "npm install");
  });
});

Deno.test("throws when unable to read aliases file", () => {
  assertRejects(() => aliasesFromFile("notafile"));
});
