import { EntityRepository } from 'typeorm'
import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import { PrismaClient } from '@prisma/client'
import { Competition } from '@interfaces/competitions.interface'
import { CreateCompetitionDto } from '@dtos/competitions.dto'

const prisma = new PrismaClient()

@EntityRepository()
export default class CompetitionRepository {
  public async competitionFindAll(): Promise<Competition[]> {
    const competitions = await prisma.competition.findMany()

    return competitions
  }

  public async competitionFindById(id: string): Promise<Competition> {
    if (isEmpty(id)) throw new HttpException(400, 'id is empty')

    const competition: Competition = await prisma.competition.findUnique({ where: { id } })
    if (!competition) throw new HttpException(409, "Competition doesn't exist")

    return competition
  }

  public async competitionCreate(competitionData: CreateCompetitionDto): Promise<Competition> {
    if (isEmpty(competitionData)) throw new HttpException(400, 'competitionData is empty')

    const findCompetition: Competition = await prisma.competition.findUnique({ where: { name: competitionData.name } })
    if (findCompetition) throw new HttpException(409, `This name ${competitionData.name} already exists`)

    const createCompetitionData: Competition = await prisma.competition.create({ data: competitionData })

    return createCompetitionData
  }

  public async competitionUpdate(id: string, competitionData: CreateCompetitionDto): Promise<Competition> {
    if (isEmpty(competitionData)) throw new HttpException(400, 'competitionData is empty')

    const findCompetition: Competition = await prisma.competition.findUnique({ where: { id } })
    if (!findCompetition) throw new HttpException(409, "Competition doesn't exist")

    return await prisma.competition.update({ where: { id }, data: competitionData })
  }

  public async competitionDelete(id: string): Promise<Competition> {
    if (isEmpty(id)) throw new HttpException(400, "Competition doesn't existId")

    const findCompetition: Competition = await prisma.competition.findUnique({ where: { id } })
    if (!findCompetition) throw new HttpException(409, "Competition doesn't exist")

    await prisma.competition.delete({ where: { id } })
    return findCompetition
  }

  public async startCompetition(id: string, start: Date): Promise<Competition> {
    if (isEmpty(id)) throw new HttpException(400, 'Competition data is empty')

    const findCompetition: Competition = await prisma.competition.findUnique({ where: { id } })
    if (!findCompetition) throw new HttpException(409, "Competition doesn't exist")

    const users = await prisma.user.findMany({ where: { competitionId: id } })

    for (let a = 0; a < users.length; a++) {
      for (let b = a + 1; b < users.length; b++) {
        await prisma.competitionMatch.create({
          data: {
            competitionId: id,
            phase: 0,
            name: `${users[a].name} vs ${users[b].name}`,
            competitor1: users[a].steamId,
            competitor2: users[b].steamId,
          },
        })
      }
    }

    return prisma.competition.update({ where: { id }, data: { start } })
  }
}
