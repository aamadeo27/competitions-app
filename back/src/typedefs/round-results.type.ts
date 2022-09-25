import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class RoundResult {
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
