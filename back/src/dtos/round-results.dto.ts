import { InputType, Field } from 'type-graphql'
import { RoundResult } from '@/typedefs/round-results.type'

@InputType()
export class CreateRoundResultDto implements Partial<RoundResult> {
  @Field()
  id: string

  @Field()
  matchId: string

  @Field()
  order: number

  @Field()
  winner: string

  @Field()
  details: string
}
