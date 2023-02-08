import { InputType, Field } from 'type-graphql'
import { User } from '@typedefs/users.type'
import { BigIntResolver } from 'graphql-scalars'
import { TimeFrameDto } from './time-frame.dto'

@InputType()
export class UserDto implements Partial<User> {
  @Field()
  steamId: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  avatar?: string

  @Field(() => BigIntResolver, { nullable: true })
  competitionId?: bigint

  @Field({ nullable: true })
  discordId?: string

  @Field({ nullable: true })
  twitchId?: string
}

@InputType()
export class CreateUserDto extends UserDto {
  @Field()
  name: string

  @Field()
  avatar: string
}
