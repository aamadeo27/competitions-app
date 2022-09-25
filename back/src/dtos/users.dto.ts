import { InputType, Field } from 'type-graphql'
import { User } from '@typedefs/users.type'

@InputType()
export class CreateUserDto implements Partial<User> {
  @Field()
  steamId: string

  @Field()
  competitionId?: string

  @Field()
  discordId?: string

  @Field()
  twitchId?: string
}
