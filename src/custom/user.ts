/**
 * A custom schema for a user form
 */
import { z } from 'zod'
import { cpf as cpfSchema } from './cpf'

// Note that you can use another schema definition
// as a field in this schema, check the "cpf" there
export const user = z.object({
  name: z.string().min(2).max(512),
  cpf: cpfSchema,
  email: z.string().email(),
})
