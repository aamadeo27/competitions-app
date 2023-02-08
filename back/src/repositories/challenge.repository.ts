import { ChallengeDTO } from '@dtos/challenge.dto'
import { HttpException } from '@exceptions/HttpException'
import { Challenge } from '@interfaces/challenge.interface'
import { isEmpty } from '@utils/util'
import { PrismaClient } from '@prisma/client'
import { pick } from 'lodash'

const prisma = new PrismaClient()

export default class ChallengeRepository {
  public async challengeFindAll(): Promise<Challenge[]> {
    const challenges = await prisma.challenge.findMany()

    return challenges
  }

  public async challengesByPlayer(challenger: string): Promise<Challenge[]> {
    if (isEmpty(challenger)) throw new HttpException(400, 'steamId is empty')

    const challenges: Challenge[] = await prisma.challenge.findMany({ where: { challenger } })
    if (!challenges) throw new HttpException(409, "Challenge doesn't exist")

    return challenges
  }

  public async challengesToPlayer(challenged: string): Promise<Challenge[]> {
    if (isEmpty(challenged)) throw new HttpException(400, 'steamId is empty')

    const challenges: Challenge[] = await prisma.challenge.findMany({ where: { challenged } })
    if (!challenges) throw new HttpException(409, "Challenge doesn't exist")

    return challenges
  }

  public async challengeCreate(challengeData: ChallengeDTO): Promise<Challenge> {
    if (isEmpty(challengeData)) throw new HttpException(400, 'challengeData is empty')

    const { challenger, challenged } = challengeData
    const findChallenge: Challenge = await prisma.challenge.findFirst({
      where: { challenger, challenged },
    })
    if (findChallenge) throw new HttpException(409, `This id ${challengeData.id} already exists`)

    const createChallengeData: Challenge = await prisma.challenge.create({ data: challengeData })

    return createChallengeData
  }

  public async challengeUpdate(challengeData: ChallengeDTO): Promise<Challenge> {
    if (isEmpty(challengeData)) throw new HttpException(400, 'challengeData is empty')

    return await prisma.challenge.update({
      where: { id: challengeData.id },
      data: pick,
    })
  }

  public async challengeDelete(id: number): Promise<Challenge> {
    if (isEmpty(id)) throw new HttpException(400, 'Invalid id to delete Challenge')

    const findChallenge: Challenge = await prisma.challenge.findUnique({ where: { id } })
    if (!findChallenge) throw new HttpException(409, "Challenge doesn't exist")

    await prisma.challenge.delete({ where: { id } })
    return findChallenge
  }
}
