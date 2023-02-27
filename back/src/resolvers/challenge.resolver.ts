import { BigIntResolver } from 'graphql-scalars'
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql'
import { GraphQLError } from 'graphql'
import { GRAPHQL_CODES } from '@/middlewares/error.middleware'
import { Challenge } from '@/typedefs/challenge.type'
import ChallengeRepository from '@/repositories/challenge.repository'
import { ChallengeDTO } from '@/dtos/challenge.dto'

@Resolver(() => Challenge)
export class ChallengeResolver {
  private challengeRepository = new ChallengeRepository()

  @Authorized(['ADMIN', 'USER'])
  @Mutation(() => Challenge, {
    description: 'Challenge create',
  })
  async createChallenge(@Arg('data') challengeData: ChallengeDTO): Promise<Challenge> {
    return await this.challengeRepository.challengeCreate(challengeData)
  }

  @Authorized(['ADMIN', 'USER'])
  @Mutation(() => Challenge, {
    description: 'Challenge update',
  })
  async updateChallenge(
    @Arg('id', () => BigIntResolver) id: bigint,
    @Arg('data') challengeData: ChallengeDTO,
  ): Promise<Challenge> {
    try {
      const challenge: Challenge = await this.challengeRepository.challengeUpdate(id, challengeData)
      return challenge
    } catch (error) {
      console.log(error)
      throw new GraphQLError(error.message, null, null, null, null, error, {
        code: GRAPHQL_CODES[error.status.toString()],
      })
    }
  }

  @Authorized(['ADMIN', 'USER'])
  @Mutation(() => Challenge, {
    description: 'Challenge delete',
  })
  async deleteChallenge(@Arg('id', () => BigIntResolver) id: bigint): Promise<Challenge> {
    try {
      const Challenge: Challenge = await this.challengeRepository.challengeDelete(id)
      return Challenge
    } catch (error) {
      throw new GraphQLError(error.message, null, null, null, null, error, {
        code: GRAPHQL_CODES[error.status.toString()],
      })
    }
  }
}
