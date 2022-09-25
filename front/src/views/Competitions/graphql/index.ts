import { loader } from 'graphql.macro'

export const competitionsQuery = loader('./Competitions.graphql')
export const competitionQuery = loader('./Competition.graphql')

