# Transcriber

Transcriber is a [Bun](https://bun.sh/) CLI for executing combinations of shell
commands.

The commands are run using [Bun Shell](https://bun.sh/docs/runtime/shell), which
implements its own set of
[built-in commands](https://bun.sh/docs/runtime/shell#builtin-commands).

## Example

Given the following `echo.json`:

```json
{
  "command": "echo $arg1 $arg2 $arg3",
  "args": {
    "arg1": ["value1", "value2"],
    "arg2": ["value3", "value4"],
    "arg3": ["value5", "value6"]
  }
}
```

Do:

```plaintext
bun run index.ts -- --input ./examples/echo.json

value1 value3 value5
value1 value3 value6
value1 value4 value5
value1 value4 value6
value2 value3 value5
value2 value3 value6
value2 value4 value5
value2 value4 value6
```

Pass `--show-command` and/or `--show-args` to log the command and/or args specified in the input JSON:

```plaintext
bun run index.ts -- --input ./examples/echo.json --show-command --show-args

$ echo value1 value3 value5
┌──────┬────────┐
│      │ Values │
├──────┼────────┤
│ arg1 │ value1 │
│ arg2 │ value3 │
│ arg3 │ value5 │
└──────┴────────┘
-------
value1 value3 value5

$ echo value1 value3 value6
┌──────┬────────┐
│      │ Values │
├──────┼────────┤
│ arg1 │ value1 │
│ arg2 │ value3 │
│ arg3 │ value6 │
└──────┴────────┘
-------
value1 value3 value6

[...]
```

More examples can be found within the [**`/examples`**](./examples) folder.

## CLI

Use [`bun build`](https://bun.sh/docs/bundler/executables) to generate a portable executable:

```plaintext
bun build ./index.ts --compile --outfile transcriber
```

Usage:

```plaintext
./transcriber --input ./examples/echo.json
```

## Logging

Pipe `stdout` to a text file to record outputs:

```plaintext
./transcriber --input ./examples/echo.json > ./output.txt
```
