import { loader } from 'graphql.macro'

export const competitionsQuery = loader('./Competitions.graphql')
export const competitionQuery = loader('./Competition.graphql')
export const userQuery = loader('./User.graphql')
export const userMutation = loader('./User.mutation.graphql')
export const timeframeCreate = loader('./Timeframe.create.graphql')
export const timeframeUpdate = loader('./Timeframe.update.graphql')
export const timeframeDelete = loader('./Timeframe.delete.graphql')
export const rivalsQuery = loader('./Rivals.graphql')
export const matchesInRangeQuery = loader('./MatchesInRange.graphql')
export const challengeCreate = loader('./Challenge.create.graphql')
export const challengeDelete = loader('./Challenge.delete.graphql')
export const challengeUpdate = loader('./Challenge.update.graphql')
