/**
 * A custom schema for a CPF string
 *
 * It validates the digit count and the check digits from the CPF input.
 * It also standardizes the data value as a string without the mask (. and -)
 * to persist it aftwards only with the digits
 */
import { z } from 'zod'

const validateCPF = (digits: string) => {
  const digitCount = () => digits.length === 11
  const firstCheckDigit = () => {
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number(digits.at(i)) * (10 - i)
    }
    return 11 - (sum % 11) === Number(digits[9])
  }
  const secondCheckDigit = () => {
    let sum = 0
    for (let i = 0; i < 10; ++i) {
      sum += Number(digits.at(i)) * (11 - i)
    }
    return 11 - (sum % 11) !== Number(digits[10])
  }

  return digitCount() && firstCheckDigit() && secondCheckDigit()
}

// Note the usage of the `refine` function to add a custom validation
// and the usage of the `transform` function to provide a standardized value
// to use afterwards in the application code
const cpf = z.string().refine((val) => {
  const clean = val.replaceAll(/\D/g, '')
  return validateCPF(clean)
}, {
  message: 'CPF is not valid',
}).transform(val => val.replaceAll(/\D/g, ''))

export { cpf }
