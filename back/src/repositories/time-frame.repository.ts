import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import { PrismaClient } from '@prisma/client'
import TimeFrame from '@/interfaces/time-frame.interface'
import { CreateTimeFrameDto } from '@/dtos/time-frame.dto'

const prisma = new PrismaClient()

export default class TimeFrameRepository {
  public async userTimeFrames(userId: string): Promise<TimeFrame[]> {
    const results = await prisma.timeFrame.findMany({ where: { userId } })

    return results
  }

  public async timeFrameCreate(timeFrameData: CreateTimeFrameDto): Promise<TimeFrame> {
    if (isEmpty(timeFrameData)) throw new HttpException(400, 'timeFrameData is empty')

    const createTimeFrameData: TimeFrame = await prisma.timeFrame.create({ data: timeFrameData })

    return createTimeFrameData
  }

  public async timeFrameUpdate(id: bigint, timeFrameData: CreateTimeFrameDto): Promise<TimeFrame> {
    if (isEmpty(timeFrameData)) throw new HttpException(400, 'timeFrameData is empty')

    const findTimeFrame: TimeFrame = await prisma.timeFrame.findUnique({ where: { id } })
    if (!findTimeFrame) throw new HttpException(409, "TimeFrame doesn't exist")

    return await prisma.timeFrame.update({ where: { id }, data: timeFrameData })
  }

  public async timeFrameDelete(id: bigint): Promise<TimeFrame> {
    if (isEmpty(id)) throw new HttpException(400, "TimeFrame doesn't existId")

    const findTimeFrame: TimeFrame = await prisma.timeFrame.findUnique({ where: { id } })
    if (!findTimeFrame) throw new HttpException(409, "TimeFrame doesn't exist")

    await prisma.timeFrame.delete({ where: { id } })
    return findTimeFrame
  }
}
