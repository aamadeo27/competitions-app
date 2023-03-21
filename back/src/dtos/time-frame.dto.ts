import { TimeFrame } from '@/typedefs/time-frame.type'
import { InputType, Field } from 'type-graphql'

@InputType()
export class TimeFrameDto implements Partial<TimeFrame> {
  @Field()
  userId: string

  @Field({ nullable: true })
  description?: string

  @Field()
  days: string

  @Field()
  start: number

  @Field()
  end: number

  @Field()
  canPlay: boolean

  @Field({ nullable: true })
  validSince?: Date

  @Field({ nullable: true })
  validUntil?: Date
}
