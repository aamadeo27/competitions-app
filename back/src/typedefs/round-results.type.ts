import { BigIntResolver } from 'graphql-scalars'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class RoundResult {
  @Field(() => BigIntResolver)
  id: bigint

  @Field(() => BigIntResolver)
  matchId: bigint

  @Field()
  order: number

  @Field()
  winner: string

  @Field()
  details: string
}
