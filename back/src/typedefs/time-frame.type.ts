import { BigIntResolver } from 'graphql-scalars'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class TimeFrame {
  @Field()
  userId: string

  @Field(() => BigIntResolver)
  id: bigint

  @Field()
  description?: string

  @Field()
  days: string

  @Field()
  start: number

  @Field()
  end: number

  @Field()
  canPlay: boolean

  @Field()
  validSince?: Date

  @Field()
  validUntil?: Date
}
