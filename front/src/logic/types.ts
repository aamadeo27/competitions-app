
export type User = {
  id: string
  realname: string
  name: string
  avatar: string
  country: string
} | null

export type Competitor = {
  steamId: string
  steamInfo: {
    name: string
    avatar: string
  }
}

export type Match = {
  id: string
  name: string
  competitor1: string
  competitor2: string
  start?: string
}

export type Competition = {
  id: string
  name: string
  shortname: string
  start?: Date
  matches?: Match[]
  players?: User[]
}