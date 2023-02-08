import { ChallengeStatus } from '@prisma/client'
import { BigIntResolver } from 'graphql-scalars'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Challenge {
  @Field(() => BigIntResolver)
  id: bigint

  @Field()
  challenger: string

  @Field()
  challenged: string

  @Field()
  start: Date

  @Field()
  status: ChallengeStatus
}
