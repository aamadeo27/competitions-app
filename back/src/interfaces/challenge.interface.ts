import { ChallengeStatus } from '@prisma/client'

export interface Challenge {
  id: bigint
  challenger: string
  challenged: string
  start: Date
  status: ChallengeStatus
}
