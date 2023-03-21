import { BigIntResolver } from 'graphql-scalars'
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql'
import { GraphQLError } from 'graphql'
import { GRAPHQL_CODES } from '@/middlewares/error.middleware'
import { Admission } from '@/typedefs/admission.type'
import AdmissionRepository from '@/repositories/admission.repository'
import { AdmissionDTO } from '@/dtos/admission.dto'

@Resolver(() => Admission)
export class AdmissionResolver {
  private admissionRepository = new AdmissionRepository()

  @Authorized(['ADMIN', 'USER'])
  @Mutation(() => Admission, {
    description: 'Admission create',
  })
  async createAdmission(@Arg('data') admissionData: AdmissionDTO): Promise<Admission> {
    return await this.admissionRepository.admissionCreate(admissionData)
  }

  @Authorized(['ADMIN', 'USER'])
  @Mutation(() => Admission, {
    description: 'Admission update',
  })
  async updateAdmission(
    @Arg('data') admissionData: AdmissionDTO,
  ): Promise<Admission> {
    try {
      const admission: Admission = await this.admissionRepository.admissionUpdate(admissionData)
      return admission
    } catch (error) {
      throw new GraphQLError(error.message, null, null, null, null, error, {
        code: GRAPHQL_CODES[error.status.toString()],
      })
    }
  }

  @Authorized(['ADMIN', 'USER'])
  @Mutation(() => Admission, {
    description: 'Admission delete',
  })
  async deleteAdmission(@Arg('id', () => BigIntResolver) compettion_id: bigint, steamId: string): Promise<Admission> {
    try {
      const Admission: Admission = await this.admissionRepository.admissionDelete(compettion_id, steamId)
      return Admission
    } catch (error) {
      throw new GraphQLError(error.message, null, null, null, null, error, {
        code: GRAPHQL_CODES[error.status.toString()],
      })
    }
  }
}
