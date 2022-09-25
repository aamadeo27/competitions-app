import { PrismaClient } from '@prisma/client'

declare global {
  let db: PrismaClient
}
