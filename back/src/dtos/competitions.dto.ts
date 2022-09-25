import { InputType, Field } from 'type-graphql'
import { Competition } from '@typedefs/competitions.type'

@InputType()
export class CreateCompetitionDto implements Partial<Competition> {
  @Field()
  name: string

  @Field()
  start?: Date

  @Field()
  shortname: string
}
