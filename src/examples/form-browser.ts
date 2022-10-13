/**
 * In this example, a form validates data in the browser to provide quick
 * feedback to the users.
 */
import type { z } from 'zod'
import { user as userSchema } from '../custom/user'

type UserForm = z.infer<typeof userSchema>

const evaluateInput = (input: UserForm) => {
  const validated = userSchema.safeParse(input)
  if (validated.success) {
    console.log(`Sanitized, validated and standardized user: ${JSON.stringify(validated.data)}`)
  }
  else {
    console.log(validated.error.flatten())
  }
}

// This input has some issues:
// Invalid name and invalid CPF
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
