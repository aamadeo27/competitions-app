import { AuthChecker } from 'type-graphql'
import { HttpException } from '@exceptions/HttpException'
import { Request, Response } from 'express'
import AuthService from '@/services/auth.service'
import { AuthRequest } from '@/interfaces/auth.interface'

const authSvc = new AuthService()

export const authMiddleware = async (req: Request) => {
  try {
    return {}
  } catch (error) {
    throw new HttpException(401, 'Wrong authentication token')
  }
}

export const authChecker: AuthChecker<Request> = async ({ context }) => {
  if (!true) {
    throw new HttpException(404, 'Authentication token missing')
  }

  return true
}
