import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import { PrismaClient } from '@prisma/client'
import { RoundResult } from '@interfaces/round-results.interface'
import { CreateRoundResultDto } from '@dtos/round-results.dto'

const prisma = new PrismaClient()

export default class RoundResultRepository {
  public async resultsOfMatch(matchId: bigint): Promise<RoundResult[]> {
    const results = await prisma.roundResult.findMany({ where: { matchId } })

    return results
  }

  public async wonRoundsOfPlayer(steamId: string): Promise<number> {
    const results = await prisma.roundResult.aggregate({
      _count: { winner: true },
      where: { winner: steamId },
    })

    return results._count.winner
  }

  public async gamesOfPlayer(steamId: string): Promise<number> {
    const results = await prisma.roundResult.findMany({ where: { winner: steamId } })
    const matches = {}
    results.forEach(r => (matches[r.matchId.toString()] = true))

    return Object.keys(matches).length
  }

  public async resultCreate(resultData: CreateRoundResultDto): Promise<RoundResult> {
    if (isEmpty(resultData)) throw new HttpException(400, 'resultData is empty')

    const createRoundResultData: RoundResult = await prisma.roundResult.create({ data: resultData })

    return createRoundResultData
  }

  public async resultUpdate(id: bigint, resultData: CreateRoundResultDto): Promise<RoundResult> {
    if (isEmpty(resultData)) throw new HttpException(400, 'resultData is empty')

    const findRoundResult: RoundResult = await prisma.roundResult.findUnique({ where: { id } })
    if (!findRoundResult) throw new HttpException(409, "RoundResult doesn't exist")

    return await prisma.roundResult.update({ where: { id }, data: resultData })
  }

  public async resultDelete(id: bigint): Promise<RoundResult> {
    if (isEmpty(id)) throw new HttpException(400, "RoundResult doesn't existId")

    const findRoundResult: RoundResult = await prisma.roundResult.findUnique({ where: { id } })
    if (!findRoundResult) throw new HttpException(409, "RoundResult doesn't exist")

    await prisma.roundResult.delete({ where: { id } })
    return findRoundResult
  }
}
