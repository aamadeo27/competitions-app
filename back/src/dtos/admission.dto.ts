import { InputType, Field } from 'type-graphql'
import { Admission, AdmissionStatus } from '@prisma/client'
import { AdmissionStatusScalar } from '@/typedefs/admission.type'
import { BigIntResolver } from 'graphql-scalars'

@InputType()
export class AdmissionDTO implements Partial<Admission> {
  @Field(() => BigIntResolver)
  competition_id: bigint

  @Field()
  steamId: string

  @Field()
  timestamp: Date

  @Field(() => AdmissionStatusScalar)
  status: AdmissionStatus
}
