export default interface TimeFrame {
  userId: string
  id: bigint
  description?: string
  days: string
  start: number
  end: number
  canPlay: boolean
  validSince?: Date
  validUntil?: Date
}
