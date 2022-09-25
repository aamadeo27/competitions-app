import { auth } from '@config'
import jwt from 'jsonwebtoken'
// import { PrismaClient } from '@prisma/client'
import { User } from '@/interfaces/users.interface'
import { Response } from 'express'
import { serialize } from 'cookie'

export default class TokenService {
  storeToken(body: User, res: Response) {
    const token = jwt.sign(body, auth.jwtSecret, {
      expiresIn: '1 days',
    })

    res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      }),
    )
  }

  clearToken(res: Response) {
    res.setHeader(
      'Set-Cookie',
      serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      }),
    )
  }
}
