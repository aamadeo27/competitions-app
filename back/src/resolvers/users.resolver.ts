import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { CreateUserDto } from '@dtos/users.dto'
import UserRepository from '@repositories/users.repository'
import { User } from '@typedefs/users.type'
import SteamRepository from '@/services/steam.service'
import RoundResultRepository from '@/repositories/result.repository'

@Resolver(() => User)
export class UserResolver {
  private userRepository = new UserRepository()
  private steamRepository = new SteamRepository()
  private resultRepository = new RoundResultRepository()

  @Query(() => [User], {
    description: 'User find list',
  })
  async getUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.userFindAll()
    return users
  }

  @Query(() => User, {
    description: 'User find by id',
  })
  async getUserById(@Arg('userId') userId: string): Promise<User> {
    const user: User = await this.userRepository.userFindById(userId)
    return user
  }

  @Query(() => [User], {
    description: 'Users find by competitionId',
  })
  async getUsersInCompetition(@Arg('competitionId') competitionId: string): Promise<User[]> {
    const users: User[] = await this.userRepository.userInCompetition(competitionId)
    return users
  }

  @Mutation(() => User, {
    description: 'User create',
  })
  async createUser(@Arg('userData') userData: CreateUserDto): Promise<User> {
    const user: User = await this.userRepository.userCreate(userData)
    return user
  }

  @Mutation(() => User, {
    description: 'User update',
  })
  async updateUser(@Arg('userId') userId: string, @Arg('userData') userData: CreateUserDto): Promise<User> {
    const user: User = await this.userRepository.userUpdate(userId, userData)
    return user
  }

  @Mutation(() => User, {
    description: 'User delete',
  })
  async deleteUser(@Arg('userId') userId: string): Promise<User> {
    const user: User = await this.userRepository.userDelete(userId)
    return user
  }

  @FieldResolver()
  async score(@Root() u: User) {
    return await this.resultRepository.wonRoundsOfPlayer(u.steamId)
  }

  @FieldResolver()
  async games(@Root() u: User) {
    return await this.resultRepository.gamesOfPlayer(u.steamId)
  }
}
