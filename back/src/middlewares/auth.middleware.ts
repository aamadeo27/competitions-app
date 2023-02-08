import { AuthChecker } from 'type-graphql'
import { HttpException } from '@exceptions/HttpException'
import { Request } from 'express'

import jwt from 'jsonwebtoken'
import { auth } from '@/config'

export const authMiddleware = async (req: Request) => {
  try {
    const token = req.cookies['token']
    const user = jwt.verify(token, auth.jwtSecret)

    if (!user) {
      return null
    }

    const { id } = user as { id: string }

    return { id }
  } catch (error) {
    throw new HttpException(401, 'Wrong authentication token')
  }
}

export const authChecker: AuthChecker<Request> = async ({ context }) => {
  if (!context['user']) {
    throw new HttpException(401, 'Authentication token missing')
  }

  return true
}
