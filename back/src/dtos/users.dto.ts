import { InputType, Field, Float } from 'type-graphql'
import { User } from '@typedefs/users.type'

@InputType()
export class UserDto implements Partial<User> {
  @Field()
  steamId: string

  @Field()
  name?: string

  @Field()
  avatar?: string

  @Field(() => Float)
  competitionId?: bigint

  @Field()
  discordId?: string

  @Field()
  twitchId?: string
}

@InputType()
export class CreateUserDto extends UserDto {
  @Field()
  name: string

  @Field()
  avatar: string
}
