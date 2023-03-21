import { AdmissionStatus } from '@prisma/client'
import { GraphQLScalarType } from 'graphql'
import { BigIntResolver } from 'graphql-scalars'
import { Field, ObjectType } from 'type-graphql'

export const AdmissionStatusScalar = new GraphQLScalarType({
  name: 'AdmissionStatus',
  serialize(value: AdmissionStatus) {
    return value.toString()
  },
  parseValue(value: string) {
    return AdmissionStatus[value]
  },
})

@ObjectType()
export class Admission {
  @Field(() => BigIntResolver)
  competition_id: bigint

  @Field()
  steamId: string

  @Field()
  timestamp: Date

  @Field(() => AdmissionStatusScalar)
  status: AdmissionStatus
}
