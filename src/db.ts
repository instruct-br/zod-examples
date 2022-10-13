/**
 * A fake database module, to simulate a network request to fetch data
 */
import { setTimeout } from 'timers/promises'

const EMAILS = [
  'joe@example.com',
]

export async function userMailExists(email: string) {
  // A slow query
  await setTimeout(10)
  return EMAILS.includes(email)
}
