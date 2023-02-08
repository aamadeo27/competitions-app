import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import { PrismaClient } from '@prisma/client'
import { CompetitionMatch } from '@interfaces/competition-matches.interface'
import { CreateCompetitionMatchDto } from '@dtos/competition-matches.dto'

const prisma = new PrismaClient()

export default class CompetitionMatchRepository {
  public async matchFindInCompetition(competitionId: bigint): Promise<CompetitionMatch[]> {
    const matches = await prisma.competitionMatch.findMany({ where: { competitionId } })

    return matches
  }

  public async mathchesInDateRange(start: Date, end: Date): Promise<CompetitionMatch[]> {
    return await prisma.competitionMatch.findMany({
      where: {
        AND: [
          {
            start: {
              gte: start,
            },
          },
          {
            start: {
              lt: end,
            },
          },
        ],
      },
    })
  }

  public async matchFindByUserId(userId: string): Promise<CompetitionMatch[]> {
    if (isEmpty(userId)) throw new HttpException(400, 'id is empty')

    const matches: CompetitionMatch[] = await prisma.competitionMatch.findMany({
      where: {
        OR: [{ competitor1: userId }, { competitor2: userId }],
      },
    })

    return matches
  }

  public async matchFindById(id: bigint): Promise<CompetitionMatch> {
    if (isEmpty(id)) throw new HttpException(400, 'id is empty')

    const match: CompetitionMatch = await prisma.competitionMatch.findUnique({ where: { id } })
    if (!match) throw new HttpException(409, "CompetitionMatch doesn't exist")

    return match
  }

  public async matchCreate(matchData: CreateCompetitionMatchDto): Promise<CompetitionMatch> {
    if (isEmpty(matchData)) throw new HttpException(400, 'matchData is empty')

    const createCompetitionMatchData: CompetitionMatch = await prisma.competitionMatch.create({
      data: matchData,
    })

    return createCompetitionMatchData
  }

  public async matchUpdate(
    id: bigint,
    matchData: CreateCompetitionMatchDto,
  ): Promise<CompetitionMatch> {
    if (isEmpty(matchData)) throw new HttpException(400, 'matchData is empty')

    const findCompetitionMatch: CompetitionMatch = await prisma.competitionMatch.findUnique({
      where: { id },
    })
    if (!findCompetitionMatch) throw new HttpException(409, "CompetitionMatch doesn't exist")

    return await prisma.competitionMatch.update({ where: { id }, data: matchData })
  }

  public async matchDelete(id: bigint): Promise<CompetitionMatch> {
    if (isEmpty(id)) throw new HttpException(400, "CompetitionMatch doesn't existId")

    const findCompetitionMatch: CompetitionMatch = await prisma.competitionMatch.findUnique({
      where: { id },
    })
    if (!findCompetitionMatch) throw new HttpException(409, "CompetitionMatch doesn't exist")

    await prisma.competitionMatch.delete({ where: { id } })
    return findCompetitionMatch
  }
}
