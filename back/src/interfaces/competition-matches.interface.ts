export interface CompetitionMatch {
  id: bigint
  phase: number
  competitionId: bigint
  name: string
  competitor1: string
  competitor2: string
  start: Date
  end: Date
  rounds: number
}
