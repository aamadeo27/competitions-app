import { InputType, Field } from 'type-graphql'
import { Challenge, ChallengeStatusScalar } from '@typedefs/challenge.type'
import { ChallengeStatus } from '@prisma/client'

@InputType()
export class ChallengeDTO implements Partial<Challenge> {
  @Field()
  challenger: string

  @Field()
  challenged: string

  @Field()
  start: Date

  @Field(() => ChallengeStatusScalar)
  status: ChallengeStatus
}
