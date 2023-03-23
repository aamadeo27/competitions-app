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
    console.log(userData)

    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')
    const { steamId } = userData

    console.log('FindUser', steamId)
    const findUser: User = await this.users.findUnique({ where: { steamId } })
    if (findUser) return findUser

    if (!userData.avatar || !userData.name) {
      const { name, avatar } = await this.steamApi.getSteamInfo(userData.steamId)
      userData.name = name
      userData.avatar = avatar
    }
    
    try {
      const createUserData: User = await this.users.create({ data: userData })
      return createUserData
    } catch(error) {
      console.error(error)
    }
    
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
