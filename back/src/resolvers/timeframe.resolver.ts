import { BigIntResolver } from 'graphql-scalars'
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql'
import { TimeFrameDto } from '@dtos/time-frame.dto'
import { TimeFrame } from '@typedefs/time-frame.type'
import TimeFrameRepository from '@/repositories/time-frame.repository'
import { GraphQLError } from 'graphql'
import { GRAPHQL_CODES } from '@/middlewares/error.middleware'

@Resolver(() => TimeFrame)
export class TimeFrameResolver {
  private timeFrameRepository = new TimeFrameRepository()

  @Authorized('ADMIN')
  @Mutation(() => TimeFrame, {
    description: 'TimeFrame create',
  })
  async createTimeFrame(@Arg('data') timeframeData: TimeFrameDto): Promise<TimeFrame> {
    return await this.timeFrameRepository.timeFrameCreate(timeframeData)
  }

  @Authorized('ADMIN')
  @Mutation(() => TimeFrame, {
    description: 'TimeFrame update',
  })
  async updateTimeFrame(
    @Arg('id', () => BigIntResolver) id: bigint,
    @Arg('data') timeframeData: TimeFrameDto,
  ): Promise<TimeFrame> {
    try {
      const timeframe: TimeFrame = await this.timeFrameRepository.timeFrameUpdate(id, timeframeData)
      return timeframe
    } catch (error) {
      throw new GraphQLError(error.message, null, null, null, null, error, {
        code: GRAPHQL_CODES[error.status.toString()],
      })
    }
  }

  @Authorized('ADMIN')
  @Mutation(() => TimeFrame, {
    description: 'TimeFrame delete',
  })
  async deleteTimeFrame(@Arg('id', () => BigIntResolver) id: bigint): Promise<TimeFrame> {
    try {
      const TimeFrame: TimeFrame = await this.timeFrameRepository.timeFrameDelete(id)
      return TimeFrame
    } catch (error) {
      throw new GraphQLError(error.message, null, null, null, null, error, {
        code: GRAPHQL_CODES[error.status.toString()],
      })
    }
  }
}
