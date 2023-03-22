import { AdmissionDTO } from '@dtos/admission.dto'
import { HttpException } from '@exceptions/HttpException'
import { Admission } from '@interfaces/admission.interface'
import { isEmpty } from '@utils/util'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class AdmissionRepository {
  public async admissionFindAll(): Promise<Admission[]> {
    const admissions = await prisma.admission.findMany()

    return admissions
  }

  public async admissionsByPlayer(steamId: string): Promise<Admission[]> {
    if (isEmpty(steamId)) throw new HttpException(400, 'steamId is empty')

    const admissions: Admission[] = await prisma.admission.findMany({ where: { steamId } })
    if (!admissions) throw new HttpException(409, "Admission doesn't exist")

    return admissions
  }

  public async admissionsToCompetition(competition_id: bigint): Promise<Admission[]> {
    if (isEmpty(competition_id)) throw new HttpException(400, 'steamId is empty')

    const admissions: Admission[] = await prisma.admission.findMany({ where: { competition_id } })
    if (!admissions) throw new HttpException(409, "Admission doesn't exist")

    return admissions
  }

  public async admissionCreate(admissionData: AdmissionDTO): Promise<Admission> {
    if (isEmpty(admissionData)) throw new HttpException(400, 'admissionData is empty')

    const findAdmission: Admission = await prisma.admission.findFirst({
      where: {  steamId: admissionData.steamId },
    })
    if (findAdmission) throw new HttpException(409, `This player already has an admission pending`)

    const createAdmissionData: Admission = await prisma.admission.create({ data: admissionData })

    return createAdmissionData
  }

  public async admissionUpdate( admissionData: AdmissionDTO): Promise<Admission> {
    if (isEmpty(admissionData)) throw new HttpException(400, 'admissionData is empty')

    return await prisma.admission.update({
      where: {
        competition_id_steamId: {
          competition_id: admissionData.competition_id,
          steamId: admissionData.steamId,
        }
      },
      data: admissionData,
    })
  }

  public async admissionDelete(competition_id: bigint, steamId: string): Promise<Admission> {
    if (isEmpty(competition_id) || isEmpty(steamId)) throw new HttpException(400, 'Invalid ids to delete Admission')

    const findAdmission: Admission = await prisma.admission.findUnique({ 
      where: { competition_id_steamId: { competition_id, steamId } },
     })
    if (!findAdmission) throw new HttpException(409, "Admission doesn't exist")

    await prisma.admission.delete({ 
      where: { competition_id_steamId: { competition_id, steamId } },
    })

    return findAdmission
  }
}
