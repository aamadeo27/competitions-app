import { AuthChecker } from 'type-graphql'
import { HttpException } from '@exceptions/HttpException'
import { Request } from 'express'

export const authMiddleware = async (req: Request) => {
  try {
    const user = req['user']
    if (!user) {
      return null
    }

    const { id } = user

    return { id }
  } catch (error) {
    throw new HttpException(401, 'Wrong authentication token')
  }
}

export const authChecker: AuthChecker<Request> = async ({ context }) => {
  console.log('User', context['user'])

  if (!context['user']) {
    throw new HttpException(404, 'Authentication token missing')
  }

  return true
}
