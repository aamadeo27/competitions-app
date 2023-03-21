import { CreateUserDto, UserDto } from '@dtos/users.dto'
import { HttpException } from '@exceptions/HttpException'
import { User } from '@interfaces/users.interface'
import { isEmpty } from '@utils/util'
import { PrismaClient } from '@prisma/client'
import { pick } from 'lodash'

const prisma = new PrismaClient()

export default class UserRepository {
  public async userFindAll(): Promise<User[]> {
    const users = await prisma.user.findMany()

    return users
  }

  public async userInCompetition(competitionId: bigint): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { competitionId },
    })

    return users
  }

  public async userFindById(steamId: string): Promise<User> {
    if (isEmpty(steamId)) throw new HttpException(400, 'steamId is empty')

    const user: User = await prisma.user.findUnique({ where: { steamId } })
    if (!user) throw new HttpException(409, "User doesn't exist")

    return user
  }

  public async userCreate(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')

    const findUser: User = await prisma.user.findUnique({ where: { steamId: userData.steamId } })
    if (findUser) throw new HttpException(409, `This steam id ${userData.steamId} already exists`)

    const createUserData: User = await prisma.user.create({ data: userData })

    return createUserData
  }

  public async userUpdate(userData: UserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')

    const findUser: User = await prisma.user.findUnique({ where: { steamId: userData.steamId } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    return await prisma.user.update({
      where: { steamId: userData.steamId },
      data: pick,
    })
  }

  public async userDelete(steamId: string): Promise<User> {
    if (isEmpty(steamId)) throw new HttpException(400, "User doesn't have steamId")

    const findUser: User = await prisma.user.findUnique({ where: { steamId } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    await prisma.user.delete({ where: { steamId } })
    return findUser
  }
}
