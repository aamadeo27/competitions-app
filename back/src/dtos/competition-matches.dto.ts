import { InputType, Field } from 'type-graphql'
import { CompetitionMatch } from '@typedefs/competition-matches.type'

@InputType()
export class CreateCompetitionMatchDto implements Partial<CompetitionMatch> {
  @Field()
  competitionId: string

  @Field()
  phase: number

  @Field()
  name: string

  @Field()
  competitor1: string

  @Field()
  competitor2: string

  @Field()
  start?: Date
}
