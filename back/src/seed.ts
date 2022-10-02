import './setup-env'
import CompetitionRepository from './repositories/competitions.repository'
import { CompetitionMatch, PrismaClient } from '@prisma/client'
import { logger } from './utils/logger'
import UserService from './services/users.service'

/*
Creates users
Creates competitions
Creates matches
Creates results
*/

// { name: '[WOA] efffdis', id: '76561199087990682' },

const players = [
  { name: 'VaneLove', id: '76561198198726327' },
  { name: '[KGB] NetQuaker', id: '76561199036207741' },
  { name: 'mrmorec', id: '76561198291928937' },
  { name: '[LGND] BuBzZz', id: '76561198998053432' },
  { name: 'HSTL | hoh0dfx', id: '76561198109810375' },
  { name: 'SoiGia', id: '76561198003626909' },
  { name: '_MIB_Maverick', id: '76561198877188659' },
  {
    id: '76561198985123908',
    name: 'VerteX',
  },
  {
    id: '76561198932556971',
    name: '[KGB] blackwoltz',
  },
  {
    id: '76561198130780391',
    name: '[SH] Alligator',
  },
  {
    id: '76561198255592963',
    name: 'Karim Benzema',
  },
  {
    id: '76561198272400369',
    name: 'twitch.tv/iberhobbit',
  },
]

const competitions = [
  { name: 'Expert Division', shortname: 'XP' },
  { name: 'GP Division', shortname: 'GP' },
  { name: 'Intermediate Division', shortname: 'IM' },
  { name: 'Beginner Division', shortname: 'BN' },
]

const db = new PrismaClient()
const createCompetitions = async () => {
  const competitionRepo = new CompetitionRepository()
  let xp
  for (let c = 0; c < competitions.length; c++) {
    logger.info(`\tAdding ${competitions[c].name}`)

    const competition = await competitionRepo.competitionCreate(competitions[c])

    if (competition.shortname === 'XP') {
      xp = competition
    }
  }

  return xp
}

const userSvc = new UserService()
const createUsers = async (competitionId: bigint) => {
  for (let i = 0; i < players.length; i++) {
    const { id } = players[i]
    logger.info(`\tAdding ${players[i].name}`)
    await userSvc.connect({ steamId: id, competitionId })
  }
}

;(async () => {
  logger.info('Deleting Results')
  await db.roundResult.deleteMany()
  logger.info('Deleting Matches')
  await db.competitionMatch.deleteMany()
  logger.info('Deleting Competitions')
  await db.competition.deleteMany()
  logger.info('Deleting Users')
  await db.user.deleteMany()

  logger.info('Creating Competitions')
  const xp = await createCompetitions()

  logger.info('Creating Users')
  await createUsers(xp.id)

  logger.info('Creating Matches')
  await createMatches(xp.id)
})()

const flipWinner = ({ competitor1, competitor2 }: CompetitionMatch) => {
  return Math.random() < 0.5 ? competitor1 : competitor2
}

const createMatches = async (competitionId: bigint) => {
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const day = 1 + i + 7 * (j - i - 1)
      logger.info(`[day: ${day}] - ${players[i].name} vs ${players[j].name}`)

      const match = await db.competitionMatch.create({
        data: {
          name: `${players[i].name} vs ${players[j].name}`,
          competitionId,
          phase: 0,
          competitor1: players[i].id,
          competitor2: players[j].id,
          start: day <= 33 ? new Date(2022, 10, day) : undefined,
        },
      })

      if (day <= 20) {
        logger.info(`Playing`)
        await db.roundResult.createMany({
          data: [
            {
              matchId: match.id,
              order: 1,
              winner: flipWinner(match),
              details: 'Stone Large Inland',
            },
            {
              matchId: match.id,
              order: 2,
              winner: flipWinner(match),
              details: 'Tool Large Highland',
            },
            { matchId: match.id, order: 3, winner: flipWinner(match), details: 'Brz Huge Coastal' },
            {
              matchId: match.id,
              order: 4,
              winner: flipWinner(match),
              details: 'Iron Huge Sm Islands',
            },
          ],
        })
      }
    }
  }
}

CompetitionRepository
