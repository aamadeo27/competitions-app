import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  steamId: string

  @Field()
  name?: string

  @Field()
  avatar?: string

  @Field({ nullable: true })
  competitionId?: string

  @Field({ nullable: true })
  discordId?: string

  @Field({ nullable: true })
  twitchId?: string

  @Field({ nullable: true })
  score?: number

  @Field({ nullable: true })
  games?: number
}
