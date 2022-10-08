import { TimeFrame } from '@/typedefs/time-frame.type'
import { InputType, Field } from 'type-graphql'

@InputType()
export class CreateTimeFrameDto implements Partial<TimeFrame> {
  @Field()
  userId: string

  @Field()
  description?: string

  @Field()
  days: string

  @Field()
  start: number

  @Field()
  end: number

  @Field()
  canPlay: boolean

  @Field()
  validSince?: Date

  @Field()
  validUntil?: Date
}
