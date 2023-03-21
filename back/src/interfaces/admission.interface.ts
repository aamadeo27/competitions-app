import { AdmissionStatus } from "@prisma/client"

export interface Admission {
  competition_id: bigint
  steamId: string
  timestamp: Date
  status: AdmissionStatus
}
