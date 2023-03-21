import request from 'supertest'
import App from '@/app'

import { UserResolver } from '@resolvers/users.resolver'
import { CompetitionResolver } from '@resolvers/competitions.resolver'
import { MatchResolver } from '@resolvers/competition-matches.resolver'
import { PrismaClient } from '@prisma/client'
import { Competition } from '@/typedefs/competitions.type'

const db = new PrismaClient()
const app = new App([UserResolver, CompetitionResolver, MatchResolver], [])

const GET_COMPETITIONS = `
  {
    getCompetitions {
      id
      name
      shortname
      start
      players {
        name
        score
        avatar
      }
      matches {
        start
        results {
          id
        }
        player1 {
          name
          avatar
        }
        player2 {
          name
          avatar
        }
      }
    }
  }
`

const GET_COMPETITION = `
  query GetCompetitionById($competitionId: BigInt!) {
    getCompetitionById(competitionId: $competitionId) {
      id
      name
      shortname
      start
      matches {
        rounds
        name
        results {
          winner
        }
        player1 {
          steamId
          avatar
          name
          games
          score
        }
        player2 {
          steamId
          avatar
          name
          games
          score
        }
        start
        results {
          order
          winner
          details
        }
      }
      players {
        name
        score
        games
        steamId
        avatar
      }
    }
  }
`
let server
beforeEach(async () => {
  server = await app.listen()
})
afterEach(async () => {
  await server.close()
})

describe('Graphql Competitions Queries', () => {
  test('GetCompetitions', async () => {
    const response = await request(app.getServer())
      .post('/graphql')
      .send({ query: GET_COMPETITIONS })
      .expect(200)

    const getCompetitions: Competition[] = JSON.parse(response.text).data.getCompetitions

    expect(getCompetitions.map(({ shortname, name }) => ({ shortname, name }))).toStrictEqual([
      { shortname: 'XP', name: 'Expert Division' },
      { shortname: 'GP', name: 'GP Division' },
      { shortname: 'IM', name: 'Intermediate Division' },
      { shortname: 'BN', name: 'Beginner Division' },
    ])
  })

  test('GetCompetitionById', async () => {
    const xp = await db.competition.findFirst({ where: { shortname: 'XP' } })

    const response = await request(app.getServer())
      .post('/graphql')
      .send({
        query: GET_COMPETITION,
        operationName: 'GetCompetitionById',
        variables: { competitionId: xp.id.toString() },
      })
      .expect(200)

    const competition: Competition = JSON.parse(response.text).data.getCompetitionById

    expect(competition.matches.length).toBe(78)
    expect(competition.players.length).toBe(13)
  })
})
