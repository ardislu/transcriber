import { $ } from "bun";
import { Command } from "@commander-js/extra-typings";

const program = new Command()
  .name("transcriber")
  .description("CLI for executing combinations of shell commands.")
  .version("0.1.0")
  .requiredOption(
    "-i, --input <string>",
    "JSON file with command and arguments to execute",
  )
  .option(
    "--show-args",
    "log input arguments along with the input command",
  );
program.parse();
const options = program.opts();

const file = Bun.file(options.input);
const json = await file.json();
const { command, args } = json;

// Based on: https://stackoverflow.com/a/32839413/21084807
function getCombinations(
  args,
  index = 0,
  results: Array<Record<string, string>> = [],
  current = {},
): Array<Record<string, string>> {
  const allKeys = Object.keys(args);
  const key = allKeys[index];
  const values = args[key];

  for (let i = 0; i < values.length; i++) {
    current[key] = values[i];

    if (index + 1 < allKeys.length) {
      getCombinations(args, index + 1, results, current);
    } else {
      results.push(structuredClone(current));
    }
  }

  return results;
}

const c = Object.defineProperty([command], "raw", {
  value: [command],
}) as unknown as TemplateStringsArray;

if (args === undefined) {
  console.log(`\n$ ${command}`);
  await $(c);
} else {
  const runs = getCombinations(args);
  for (const inputArgs of runs) {
    let input = command;
    for (const [key, value] of Object.entries(inputArgs)) {
      input = input.replaceAll(`$${key}`, value);
    }
    console.log(`\n$ ${input}`);
    if (options.showArgs) {
      console.table(inputArgs);
      console.log("-------");
    }
    await $(c).env(inputArgs);
  }
}
