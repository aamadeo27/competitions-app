import { EntityRepository } from 'typeorm'
import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import { PrismaClient } from '@prisma/client'
import { CompetitionMatch } from '@interfaces/competition-matches.interface'
import { CreateCompetitionMatchDto } from '@dtos/competition-matches.dto'

const prisma = new PrismaClient()

@EntityRepository()
export default class CompetitionMatchRepository {
  public async matchFindInCompetition(competitionId: string): Promise<CompetitionMatch[]> {
    const matchs = await prisma.competitionMatch.findMany({ where: { competitionId } })

    return matchs
  }

  public async matchFindById(id: string): Promise<CompetitionMatch> {
    if (isEmpty(id)) throw new HttpException(400, 'id is empty')

    const match: CompetitionMatch = await prisma.competitionMatch.findUnique({ where: { id } })
    if (!match) throw new HttpException(409, "CompetitionMatch doesn't exist")

    return match
  }

  public async matchCreate(matchData: CreateCompetitionMatchDto): Promise<CompetitionMatch> {
    if (isEmpty(matchData)) throw new HttpException(400, 'matchData is empty')

    const createCompetitionMatchData: CompetitionMatch = await prisma.competitionMatch.create({ data: matchData })

    return createCompetitionMatchData
  }

  public async matchUpdate(id: string, matchData: CreateCompetitionMatchDto): Promise<CompetitionMatch> {
    if (isEmpty(matchData)) throw new HttpException(400, 'matchData is empty')

    const findCompetitionMatch: CompetitionMatch = await prisma.competitionMatch.findUnique({ where: { id } })
    if (!findCompetitionMatch) throw new HttpException(409, "CompetitionMatch doesn't exist")

    return await prisma.competitionMatch.update({ where: { id }, data: matchData })
  }

  public async matchDelete(id: string): Promise<CompetitionMatch> {
    if (isEmpty(id)) throw new HttpException(400, "CompetitionMatch doesn't existId")

    const findCompetitionMatch: CompetitionMatch = await prisma.competitionMatch.findUnique({ where: { id } })
    if (!findCompetitionMatch) throw new HttpException(409, "CompetitionMatch doesn't exist")

    await prisma.competitionMatch.delete({ where: { id } })
    return findCompetitionMatch
  }
}
