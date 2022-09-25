import { AuthChecker } from 'type-graphql'
import { HttpException } from '@exceptions/HttpException'
import { Request } from 'express'

export const authMiddleware = async () => {
  try {
    return {}
  } catch (error) {
    throw new HttpException(401, 'Wrong authentication token')
  }
}

export const authChecker: AuthChecker<Request> = async () => {
  if (!true) {
    throw new HttpException(404, 'Authentication token missing')
  }

  return true
}
