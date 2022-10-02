import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { CreateCompetitionDto } from '@dtos/competitions.dto'
import CompetitionRepository from '@repositories/competitions.repository'
import { Competition } from '@typedefs/competitions.type'
import UserRepository from '@/repositories/users.repository'
import CompetitionMatchRepository from '@/repositories/competition-matches.repository'
import { BigIntResolver } from 'graphql-scalars'

@Resolver(() => Competition)
export class CompetitionResolver extends CompetitionRepository {
  private userRepository = new UserRepository()
  private matchRepository = new CompetitionMatchRepository()

  @Query(() => [Competition], {
    description: 'Competition find list',
  })
  async getCompetitions(): Promise<Competition[]> {
    const competitions: Competition[] = await this.competitionFindAll()
    return competitions
  }

  @Query(() => Competition, {
    description: 'Competition find by id',
  })
  async getCompetitionById(
    @Arg('competitionId', () => BigIntResolver) competitionId: bigint,
  ): Promise<Competition> {
    const competition: Competition = await this.competitionFindById(competitionId)
    return competition
  }

  @Mutation(() => Competition, {
    description: 'Competition create',
  })
  async createCompetition(
    @Arg('competitionData') competitionData: CreateCompetitionDto,
  ): Promise<Competition> {
    const competition: Competition = await this.competitionCreate(competitionData)
    return competition
  }

  @Mutation(() => Competition, {
    description: 'Competition update',
  })
  async updateCompetition(
    @Arg('competitionId', () => BigIntResolver) competitionId: bigint,
    @Arg('competitionData') competitionData: CreateCompetitionDto,
  ): Promise<Competition> {
    const competition: Competition = await this.competitionUpdate(competitionId, competitionData)
    return competition
  }

  @Mutation(() => Competition, {
    description: 'Competition delete',
  })
  async deleteCompetition(
    @Arg('competitionId', () => BigIntResolver) competitionId: bigint,
  ): Promise<Competition> {
    const competition: Competition = await this.competitionDelete(competitionId)
    return competition
  }

  @FieldResolver()
  async matches(@Root() c: Competition) {
    return await this.matchRepository.matchFindInCompetition(c.id)
  }

  @FieldResolver()
  async players(@Root() c: Competition) {
    return await this.userRepository.userInCompetition(c.id)
  }
}
