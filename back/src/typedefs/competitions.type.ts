import { Field, Float, ObjectType } from 'type-graphql'
import { CompetitionMatch } from './competition-matches.type'
import { User } from './users.type'

@ObjectType()
export class Competition {
  @Field(() => Float)
  id: bigint

  @Field()
  name: string

  @Field()
  shortname: string

  @Field({ nullable: true })
  start?: Date

  @Field(() => [CompetitionMatch], { nullable: true })
  matches?: CompetitionMatch[]

  @Field(() => [User], { nullable: true })
  players?: User[]
}
