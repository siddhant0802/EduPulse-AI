import jwt, { type SignOptions } from 'jsonwebtoken'
import { env } from '../config'

export function generateToken(userId: string) {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'],
  }

  return jwt.sign({ userId }, env.jwtSecret, options)
}
