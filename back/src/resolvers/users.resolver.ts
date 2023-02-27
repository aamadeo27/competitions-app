import { BigIntResolver } from 'graphql-scalars'
import {
  Arg,
  Args,
  ArgsType,
  Authorized,
  Field,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { UserDto } from '@dtos/users.dto'
import UserRepository from '@repositories/users.repository'
import { User } from '@typedefs/users.type'
import RoundResultRepository from '@/repositories/result.repository'
import TimeFrameRepository from '@/repositories/time-frame.repository'
import CompetitionMatchRepository from '@/repositories/competition-matches.repository'
import ChallengeRepository from '@/repositories/challenge.repository'

@ArgsType()
class GetUsersInCompetitionArgs {
  @Field(() => BigIntResolver, { nullable: true })
  competitionId?: bigint
}

@Resolver(() => User)
export class UserResolver {
  private userRepository = new UserRepository()
  private resultRepository = new RoundResultRepository()
  private timeFrameRepository = new TimeFrameRepository()
  private matchesRepository = new CompetitionMatchRepository()
  private challengesRepository = new ChallengeRepository()

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
  async getUsersInCompetition(
    @Args() { competitionId }: GetUsersInCompetitionArgs,
  ): Promise<User[]> {
    const users: User[] = await this.userRepository.userInCompetition(competitionId)
    return users
  }

  @Authorized('ADMIN')
  @Mutation(() => User, {
    description: 'User update',
  })
  async updateUser(@Arg('userData') userData: UserDto): Promise<User> {
    const user: User = await this.userRepository.userUpdate(userData)
    return user
  }

  @Authorized('ADMIN')
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

  @FieldResolver()
  async availability(@Root() u: User) {
    return (await this.timeFrameRepository.userTimeFrames(u.steamId)) ?? []
  }

  @FieldResolver()
  async matches(@Root() u: User) {
    return (await this.matchesRepository.matchFindByUserId(u.steamId)) ?? []
  }

  @FieldResolver()
  async challenges(@Root() u: User) {
    const byPlayer = (await this.challengesRepository.challengesByPlayer(u.steamId)) ?? []
    const toPlayer = (await this.challengesRepository.challengesToPlayer(u.steamId)) ?? []

    return [...byPlayer, ...toPlayer]
  }
}
