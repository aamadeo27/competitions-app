import { BigIntResolver } from 'graphql-scalars'
import { Field, ObjectType } from 'type-graphql'
import { Admission } from './admission.type'
import { CompetitionMatch } from './competition-matches.type'
import { User } from './users.type'

@ObjectType()
export class Competition {
  @Field(() => BigIntResolver)
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

  @Field(() => [Admission], { nullable: true })
  admissions?: Admission[]
}
