import { PrismaClient, User } from '@prisma/client'
import { CreateUserDto } from '@dtos/users.dto'
import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import SteamApi from './steam.service'

class UserService {
  public users = new PrismaClient().user
  public steamApi = new SteamApi()

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findMany()
    return allUser
  }

  public async findUserById(steamId: string): Promise<User> {
    if (isEmpty(steamId)) throw new HttpException(400, 'steamId is empty')

    const findUser: User = await this.users.findUnique({ where: { steamId } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    return findUser
  }

  public async connect(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')
    const { steamId } = userData

    const findUser: User = await this.users.findUnique({ where: { steamId } })
    if (findUser) return findUser

    const { name, avatar } = await this.steamApi.getSteamInfo(userData.steamId)
    const createUserData: User = await this.users.create({ data: { ...userData, name, avatar } })
    return createUserData
  }

  public async deleteUser(steamId: string): Promise<User> {
    if (isEmpty(steamId)) throw new HttpException(400, "User doesn't existId")

    const findUser: User = await this.users.findUnique({ where: { steamId } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    const deleteUserData = await this.users.delete({ where: { steamId } })
    return deleteUserData
  }
}

export default UserService
