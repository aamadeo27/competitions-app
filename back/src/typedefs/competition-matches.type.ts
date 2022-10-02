import { Field, Float, ObjectType } from 'type-graphql'
import { RoundResult } from './round-results.type'
import { User } from './users.type'

@ObjectType()
export class CompetitionMatch {
  @Field(() => Float)
  id: bigint

  @Field(() => Float)
  competitionId: bigint

  @Field()
  phase: number

  @Field()
  name: string

  @Field()
  rounds: number

  @Field()
  competitor1: string

  @Field()
  competitor2: string

  @Field(() => User)
  player1?: User

  @Field(() => User)
  player2?: User

  @Field({ nullable: true })
  start?: Date

  @Field({ nullable: true })
  end?: Date

  @Field(() => [RoundResult], { nullable: true })
  results?: RoundResult[]
}
