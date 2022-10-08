import { BigIntResolver } from 'graphql-scalars'
import { Field, ID, ObjectType } from 'type-graphql'
import { TimeFrame } from './time-frame.type'

@ObjectType()
export class User {
  @Field(() => ID)
  steamId: string

  @Field()
  name?: string

  @Field()
  avatar?: string

  @Field(() => BigIntResolver, { nullable: true })
  competitionId?: bigint

  @Field({ nullable: true })
  discordId?: string

  @Field({ nullable: true })
  twitchId?: string

  @Field({ nullable: true })
  score?: number

  @Field({ nullable: true })
  games?: number

  @Field(() => [TimeFrame], { nullable: true })
  availability?: TimeFrame[]
}
