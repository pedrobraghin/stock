import {randomBytes} from 'crypto'

export function generateId(length: number = 4): string {
  return randomBytes(length).toString("hex");
}