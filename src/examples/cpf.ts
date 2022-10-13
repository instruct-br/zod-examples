import { cpf } from '../custom/cpf'

const evaluateInput = (input: string) => {
  const validated = cpf.safeParse(input)
  if (validated.success) {
    console.log(`Sanitized, validated and standardized CPF: ${validated.data}`)
  }
  else {
    console.log(validated.error.flatten())
  }
}

// Those inputs represents the same CPF, and they're both valid.
// The parsed data transforms the value to produce the same standardized value
evaluateInput('823.470.495-85')
evaluateInput('82347049585')
// This input is invalid (the check digits are wrong)
evaluateInput('823.470.495-12')

export { cpf }
