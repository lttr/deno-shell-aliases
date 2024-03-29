/**
 * Retrieve and parse zsh aliases from the environment or from a file.
 * @module
 */

export { aliasesFromFile, evaluatedAliases } from "./aliases.ts";

/** A shape of the values that are output of this module functions. */
export type { Alias } from "./aliases.ts";
