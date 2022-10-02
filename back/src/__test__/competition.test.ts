import request from 'supertest'
import App from '@/app'

import { UserResolver } from '@resolvers/users.resolver'
import { CompetitionResolver } from '@resolvers/competitions.resolver'
import { MatchResolver } from '@resolvers/competition-matches.resolver'

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

describe('Graphql Competitions Queries', () => {
  it('Can respond correctly', async () => {
    await request(app.getServer())
      .post('/graphql')
      .send({ query: GET_COMPETITIONS })
      .expect(200, { data: { getCompetitions: [] } })
  }, 20000)
})
