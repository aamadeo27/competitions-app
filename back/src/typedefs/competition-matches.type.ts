import { Field, ObjectType } from 'type-graphql'
import { RoundResult } from './round-results.type'
import { User } from './users.type'

@ObjectType()
export class CompetitionMatch {
  @Field()
  id: string

  @Field()
  competitionId: string

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

  @Field(type => User)
  player1: User

  @Field(type => User)
  player2: User

  @Field({ nullable: true })
  start?: Date

  @Field({ nullable: true })
  end?: Date

  @Field(type => [RoundResult], { nullable: true })
  results?: RoundResult[]
}
