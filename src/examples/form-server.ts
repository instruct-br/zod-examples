/**
 * In this example, a form validates data coming from the same form in the
 * browser. It extends the same schema to perform an aditional validation in
 * the server: check if the mail is unique.
 * The example also ilustrates the usage of safeParseAsync and async refine
 * function.
 */
import { z } from 'zod'
import { user as userSchema } from '../custom/user'
import { userMailExists } from '../db'

const userForm = userSchema.extend({
  email: z.string().email().refine(async (val) => {
    return !(await userMailExists(val))
  }, { message: 'Email must be unique' }),
})
type UserForm = z.infer<typeof userForm>

// Using the inferred type from the schema in the type notation of the function
// below, the code that calls it needs to properly pass all the required
// parameters and only the required parameters. Try changing the input values
// below this function and see how your code editor guides you towards the
// correct function call.
const evaluateInput = async (input: UserForm) => {
  const validated = await userForm.safeParseAsync(input)
  if (validated.success) {
    console.log(`Sanitized, validated and standardized user: ${JSON.stringify(validated.data)}`)
  }
  else {
    console.log(validated.error.flatten())
  }
}

// This input has multiple issues:
// Invalid name, repeated email and invalid CPF
// Compare this with the equivalent code in the `form-browser` and see how the
// results differs.
evaluateInput({
  name: 'J',
  email: 'joe@example.com',
  cpf: '823.470.495-12',
})
// This input is ok
evaluateInput({
  name: 'Alice',
  email: 'alice@example.com',
  cpf: '823.470.495-85',
})
// This input has an invalid email address
evaluateInput({
  name: 'Bob',
  email: 'bob',
  cpf: '111.111.111-11',
})
