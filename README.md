# Zod Examples

This repository has a couple of examples with Zod usage.

## Setup

Install dependencies with `pnpm install`.

If you don't have `pnpm` installed and uses Node.js >= v16.9 enable [Corepack](https://github.com/nodejs/corepack) with `corepack enable`.

Otherwise refer to the [pnpm install docs](https://pnpm.io/installation).

## Examples

### Custom "type"

See the file `src/custom/cpf.ts` to check how to define a custom string with
custom validation and custom transformation to
[accept multiple input formats, and standardize the parsed output](https://en.wikipedia.org/wiki/Robustness_principle).

Run the example with `pnpm jiti src/examples/cpf.ts`.

Do read the files comments.

### Shared form between browser and server

See the file `src/custom/user.ts` and how the examples
`src/custom/form-browser.ts` and `src/custom/form-server.ts` uses it to check a
user form. The `form-server.ts` extends the form schema to perform aditional
validations that can't be executed in the browser.

Run the exemples with `pnpm jiti src/examples/form-browser.ts` and
`pnpm jiti src/examples/form-server.ts`.

Compare how the results differ and check the source code.

Do read the files comments.
