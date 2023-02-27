import { ChallengeStatus } from '@prisma/client'
import { GraphQLScalarType } from 'graphql'
import { BigIntResolver } from 'graphql-scalars'
import { Field, ObjectType } from 'type-graphql'

export const ChallengeStatusScalar = new GraphQLScalarType({
  name: 'ChallengeStatus',
  serialize(value: ChallengeStatus) {
    return value.toString()
  },
  parseValue(value: string) {
    return ChallengeStatus[value]
  },
})

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

  @Field(() => ChallengeStatusScalar)
  status: ChallengeStatus
}
