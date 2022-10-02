import { InputType, Field } from 'type-graphql'
import { RoundResult } from '@/typedefs/round-results.type'

@InputType()
export class CreateRoundResultDto implements Partial<RoundResult> {
  @Field()
  id: bigint

  @Field()
  matchId: bigint

  @Field()
  order: number

  @Field()
  winner: string

  @Field()
  details: string
}
