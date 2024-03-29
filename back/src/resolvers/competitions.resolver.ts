import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { CreateCompetitionDto } from '@dtos/competitions.dto'
import CompetitionRepository from '@repositories/competitions.repository'
import { Competition } from '@typedefs/competitions.type'
import UserRepository from '@/repositories/users.repository'
import CompetitionMatchRepository from '@/repositories/competition-matches.repository'
import { BigIntResolver } from 'graphql-scalars'
import AdmissionRepository from '@/repositories/admission.repository'

@Resolver(() => Competition)
export class CompetitionResolver extends CompetitionRepository {
  private userRepository = new UserRepository()
  private matchRepository = new CompetitionMatchRepository()
  private admissionsRepository = new AdmissionRepository()

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

  @Authorized('ADMIN')
  @Mutation(() => Competition, {
    description: 'Competition create',
  })
  async createCompetition(
    @Arg('competitionData') competitionData: CreateCompetitionDto,
  ): Promise<Competition> {
    const competition: Competition = await this.competitionCreate(competitionData)
    return competition
  }

  @Authorized('ADMIN')
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

  @Authorized('ADMIN')
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

  @FieldResolver()
  async admissions(@Root() c: Competition) {
    const byPlayer = (await this.admissionsRepository.admissionsToCompetition(c.id)) ?? []

    return byPlayer
  }
}
