import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { BigIntResolver } from 'graphql-scalars'
import { CreateCompetitionMatchDto } from '@dtos/competition-matches.dto'
import CompetitionMatchRepository from '@repositories/competition-matches.repository'
import { CompetitionMatch } from '@typedefs/competition-matches.type'
import RoundResultRepository from '@/repositories/result.repository'
import UserRepository from '@/repositories/users.repository'
import { User } from '@/typedefs/users.type'

@Resolver(() => CompetitionMatch)
export class MatchResolver {
  private matchRepository = new CompetitionMatchRepository()
  private resultRepository = new RoundResultRepository()
  private userRepository = new UserRepository()

  @Query(() => [CompetitionMatch], {
    description: 'CompetitionMatch find list',
  })
  async getCompetitionMatches(
    @Arg('competitionId', () => BigIntResolver) competitionId: bigint,
  ): Promise<CompetitionMatch[]> {
    const matches: CompetitionMatch[] = await this.matchRepository.matchFindInCompetition(
      competitionId,
    )
    return matches
  }

  @Query(() => CompetitionMatch, {
    description: 'CompetitionMatch find by id',
  })
  async getCompetitionMatchById(
    @Arg('matchId', () => BigIntResolver) matchId: bigint,
  ): Promise<CompetitionMatch> {
    const match: CompetitionMatch = await this.matchRepository.matchFindById(matchId)
    return match
  }

  @Authorized('ADMIN')
  @Mutation(() => CompetitionMatch, {
    description: 'CompetitionMatch create',
  })
  async createCompetitionMatch(
    @Arg('matchData') matchData: CreateCompetitionMatchDto,
  ): Promise<CompetitionMatch> {
    const match: CompetitionMatch = await this.matchRepository.matchCreate(matchData)
    return match
  }

  @Authorized('ADMIN')
  @Mutation(() => CompetitionMatch, {
    description: 'CompetitionMatch update',
  })
  async updateCompetitionMatch(
    @Arg('matchId', () => BigIntResolver) matchId: bigint,
    @Arg('matchData') matchData: CreateCompetitionMatchDto,
  ): Promise<CompetitionMatch> {
    const match: CompetitionMatch = await this.matchRepository.matchUpdate(matchId, matchData)
    return match
  }

  @Authorized('ADMIN')
  @Mutation(() => CompetitionMatch, {
    description: 'CompetitionMatch delete',
  })
  async deleteCompetitionMatch(
    @Arg('matchId', () => BigIntResolver) matchId: bigint,
  ): Promise<CompetitionMatch> {
    const match: CompetitionMatch = await this.matchRepository.matchDelete(matchId)
    return match
  }

  async userFromId(id) {
    const user: User = await this.userRepository.userFindById(id)
    user.score = await this.resultRepository.wonRoundsOfPlayer(id)
    user.games = await this.resultRepository.gamesOfPlayer(id)

    return user
  }

  @FieldResolver()
  async player1(@Root() match: CompetitionMatch) {
    return await this.userFromId(match.competitor1)
  }

  @FieldResolver()
  async player2(@Root() match: CompetitionMatch) {
    return await this.userFromId(match.competitor2)
  }

  @FieldResolver()
  async results(@Root() match: CompetitionMatch) {
    return await this.resultRepository.resultsOfMatch(match.id)
  }
}
