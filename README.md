# Transcriber

Transcriber is a [Bun](https://bun.sh/) CLI for executing combinations of shell
commands.

## Example

Given the following `input.json`:

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
bun run index.ts -- --input input.json   
$ echo value1 value3 value5
value1 value3 value5
$ echo value1 value3 value6
value1 value3 value6
$ echo value1 value4 value5
value1 value4 value5
$ echo value1 value4 value6
value1 value4 value6
$ echo value2 value3 value5
value2 value3 value5
$ echo value2 value3 value6
value2 value3 value6
$ echo value2 value4 value5
value2 value4 value5
$ echo value2 value4 value6
value2 value4 value6
```

The commands are run using [Bun Shell](https://bun.sh/docs/runtime/shell), which
implements its own set of
[built-in commands](https://bun.sh/docs/runtime/shell#builtin-commands).
