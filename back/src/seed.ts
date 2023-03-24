import './setup-env'
import CompetitionRepository from './repositories/competitions.repository'
import { CompetitionMatch, PrismaClient } from '@prisma/client'
import { logger } from './utils/logger'
import UserService from './services/users.service'

const db = new PrismaClient()

/*
Creates users
Creates competitions
Creates matches
Creates results
*/

// { name: '[WOA] efffdis', id: '76561199087990682' },

const players = [
  {
    steamId: '76561199087990682',
    name: '[WOA] efffdis',
    avatar:
      'https://avatars.akamai.steamstatic.com/077b8cb8077f09dd8d7e346a1d617bfc26859bb5_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198198726327',
    name: 'Tôn Hành Giả',
    avatar:
      'https://avatars.akamai.steamstatic.com/b0b262012b5a75f436c601a46281ee8b9f572131_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561199036207741',
    name: '[KGB] NetQuaker',
    avatar:
      'https://avatars.akamai.steamstatic.com/62a50617789864a01ad9e66247bcac41e0a39f63_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198291928937',
    name: 'mrmorec',
    avatar:
      'https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198998053432',
    name: '[LGND] BuBzZz',
    avatar:
      'https://avatars.akamai.steamstatic.com/188182f8306f0781399e3df9993e8428d533ccef_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198109810375',
    name: 'HSTL | hoh0dfx',
    avatar:
      'https://avatars.akamai.steamstatic.com/996c2d8ccd51f49a2f8d686d6b582a6e1a0b0a68_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198003626909',
    name: 'SoiGia',
    avatar:
      'https://avatars.akamai.steamstatic.com/7266359a55febab180a29a2b6ca2dec3d2444d33_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198877188659',
    name: '_MIB_Maverick',
    avatar:
      'https://avatars.akamai.steamstatic.com/dfd1aac82a6c0fcbf61cc9c08c427b7cf7eea020_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198985123908',
    name: 'VerteX',
    avatar:
      'https://avatars.akamai.steamstatic.com/cdd14e9920ac3dbfd88d3047b4e5fd9d462ed6a1_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198932556971',
    name: '[KGB] blackwoltz',
    avatar:
      'https://avatars.akamai.steamstatic.com/e0ac6c1f00c0cddb9fc4d77853df612f9ec57aec_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198130780391',
    name: '[SH] Alligator',
    avatar:
      'https://avatars.akamai.steamstatic.com/89715e2929047d4e6a590f1b984bed92114f8ef7_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198255592963',
    name: 'Karim Benzema',
    avatar:
      'https://avatars.akamai.steamstatic.com/af09d3e3a346c01013ebfd38e14eeaeaf7e7cb33_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
  {
    steamId: '76561198272400369',
    name: 'twitch.tv/iberhobbit',
    avatar:
      'https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
    competitionId: { $oid: '633096daa34af58cc342e28f' },
  },
]

const start = new Date()
start.setDate(start.getDate() + 15)

const competitions = [
  { name: 'Expert Division', shortname: 'XP', start },
  { name: 'GP Division', shortname: 'GP', start },
  { name: 'Intermediate Division', shortname: 'IM', start },
  { name: 'Beginner Division', shortname: 'BN', start },
]

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

async function createAvailability(userId: string, timezone: number) {
  await db.timeFrame.createMany({
    data: [
      {
        userId,
        days: 'mtwTf',
        start: 18 + timezone,
        end: 23 + timezone,
        canPlay: true,
      },
      {
        userId,
        days: 'sS',
        start: 9 + timezone,
        end: 13 + timezone,
        canPlay: true,
      },
      {
        userId,
        days: 'sS',
        start: 16 + timezone,
        end: 20 + timezone,
        canPlay: true,
      },
    ],
  })
}

const tz = () => [-3, 0, 3][Math.floor(Math.random() * 3)]

const userSvc = new UserService()
const createUsers = async (competitionId: bigint) => {
  for (let i = 0; i < players.length; i++) {
    const { steamId, name, avatar } = players[i]
    const timezone = tz()
    logger.info(`\tAdding ${name} -> ${competitionId}`)

    await userSvc.connect({ steamId, competitionId, name, avatar })

    await createAvailability(steamId, timezone)
  }
}

;(async () => {
  logger.info('Deleting Results')
  await db.roundResult.deleteMany()
  logger.info('Deleting Matches')
  await db.competitionMatch.deleteMany()
  logger.info('Deleting Competitions')
  await db.competition.deleteMany()
  logger.info('Deleting Timeframes')
  await db.timeFrame.deleteMany()
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
          competitor1: players[i].steamId,
          competitor2: players[j].steamId,
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
