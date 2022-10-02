import { Field, ID, Float, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  steamId: string

  @Field()
  name?: string

  @Field()
  avatar?: string

  @Field(() => Float, { nullable: true })
  competitionId?: bigint

  @Field({ nullable: true })
  discordId?: string

  @Field({ nullable: true })
  twitchId?: string

  @Field({ nullable: true })
  score?: number

  @Field({ nullable: true })
  games?: number
}
