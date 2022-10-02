import { Field, Float, ObjectType } from 'type-graphql'

@ObjectType()
export class RoundResult {
  @Field(() => Float)
  id: bigint

  @Field(() => Float)
  matchId: bigint

  @Field()
  order: number

  @Field()
  winner: string

  @Field()
  details: string
}
