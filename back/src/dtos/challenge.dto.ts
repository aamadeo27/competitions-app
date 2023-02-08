import { InputType, Field } from 'type-graphql'
import { Challenge } from '@typedefs/challenge.type'
import { BigIntResolver } from 'graphql-scalars'
import { ChallengeStatus } from '@prisma/client'

@InputType()
export class ChallengeDTO implements Partial<Challenge> {
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
