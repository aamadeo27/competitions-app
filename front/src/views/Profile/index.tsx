import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import DiscordIcon from '../../components/icons/DiscordIcon'
import SteamIcon from '../../components/icons/SteamIcon'
import TwitchIcon from '../../components/icons/TwitchIcon'
import Loading from '../../components/Loading'
import type { Challenge, User } from '../../generated/graphql'
import { rivalsQuery, userQuery } from '../../graphql'
import { useUser } from '../../logic/client'
import { useModals } from '../../modals/modals'
import CompetitionHeader from '../Competitions/CompetitionHeader'
import MatchComponent from '../Competitions/MatchComponent'

const CHALLENGE_CLASS = 'p-2 rounded-md cursor-pointer hover:bg-gray-200'

type ChallengesProps = {
  hero?: User
  players: Map<string, User>
  challenges: Challenge[]
}
function Challenges({ hero, players, challenges }: ChallengesProps) {
  const modals = useModals()
  if (!hero) return null

  const rival = (c: Challenge) =>
    c.challenger === hero.steamId ? c.challenged : c.challenger
  const onClick = (c: Challenge) => () => {
    modals.setModal('challenge', {
      id: c.id,
      challenger:
        c.challenger === hero.steamId ? hero : players.get(c.challenger),
      challenged:
        c.challenged === hero.steamId ? hero : players.get(c.challenged),
      start: c.start,
    })
  }

  const items = challenges.map((c) => (
    <div key={c.id} className={CHALLENGE_CLASS} onClick={onClick(c)}>
      <div className="flex flex-row gap-2">
        <img src={players.get(rival(c))?.avatar} className="h-10 w-10" />
        <div className="text-lg font-semibold my-auto">
          {players.get(rival(c))?.name}
        </div>
      </div>

      <div className="flex flex-row gap-1">
        <div>{new Date(c.start).toLocaleDateString()}</div>
        <div>{new Date(c.start).toLocaleTimeString()}</div>
      </div>
    </div>
  ))
  return (
    <div className="bg-gray-300 w-full h-fit p-5 rounded-2xl">
      <h1 className="text-gray-900 font-semibold text-lg mb-4">CHALLENGES</h1>
      <div className="flex flex-col w-full h-fit">{items}</div>
    </div>
  )
}

export default function Profile() {
  const ctx = useUser()
  const { id } = useParams()

  const userResult = useQuery(userQuery, {
    variables: { userId: id ?? ctx?.user?.id },
    skip: !(id ?? ctx?.user?.id),
  })
  const sameUser = !id || id === ctx?.user?.id

  const user = userResult.data?.getUserById as User | undefined

  const rivalsResult = useQuery(rivalsQuery, {
    variables: { competitionId: user?.competitionId },
    skip: !user?.competitionId,
  })

  const players = rivalsResult.data?.getCompetitionById.players ?? []

  const rankedList = [...players].sort(
    (a, b) => (b.score ?? 0) - (a.score ?? 0)
  )
  const ranking = new Map<string, number>()
  const playerMap = new Map()
  rankedList.forEach((u, i) => {
    ranking.set(u.steamId, i)
    playerMap.set(u.steamId, u)
  })

  if (!ctx?.user || userResult.loading || rivalsResult.loading) {
    return <Loading />
  }

  const matches = user?.matches
    ?.filter((m) => m.start)
    .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
    .map((m, i) => {
      const data = { ...m }

      if (data.player2.steamId === id) {
        const tmp = data.player1
        data.player1 = data.player2
        data.player2 = tmp
      }

      return <MatchComponent data={data} short key={i} ranking={ranking} />
    })

  return (
    <div className="mt-36 mr-16 h-24">
      <Header padding="py-2 pl-2 pr-12">
        <div className="flex flex-row gap-2 w-fit">
          <img
            className="block rounded-full h-24 w-24 p-1"
            src={user?.avatar}
          />
          <span className="h-full py-4">{user?.name}</span>
        </div>
      </Header>

      <div className="flex flex-row rounded-3xl bg-black/80 w-full h-fit my-6 p-6 gap-8">
        <div className="flex flex-col flex-grow">
          <div className="bg-gray-300 rounded-2xl px-5 font-semibold text-base flex flex-col">
            <div className="flex flex-row">
              <CompetitionHeader name="Expert Division" shortname="XP" />
              <div className="flex-none h-28 mx-3 py-10 text-gray-900 text-[50px]">
                #{ranking.get(user!.steamId)! + 1}
              </div>
            </div>

            <div className="flex flex-row gap-10 text-gray-700 px-4 mb-4 text-xl">
              <div className="w-fit">
                <span className="mx-1 text-black">Games:</span>
                <span>{user?.games}</span>
              </div>

              <div className="w-fit">
                <span className="mx-1 text-black">Score:</span>
                <span>{user?.score} pts</span>
              </div>

              <div className="w-fit">
                <span className="mx-1 text-black">Players:</span>
                <span>{ranking.size}</span>
              </div>
            </div>
          </div>

          <div>{matches}</div>
        </div>

        <div className="flex-none flex flex-col gap-5 w-60">
          <div className="flex flex-col bg-gray-300 w-full h-fit rounded-2xl p-5">
            <h1 className="text-gray-900 font-semibold text-lg mb-4">LINKS</h1>
            <a
              className="font-main text-base font-semibold text-gray-800 block m-2"
              href={`https://steamcommunity.com/profiles/${user?.steamId}`}
            >
              <SteamIcon className="inline-block mx-2 h-7 w-7" originalColor />
              <span>Steam</span>
            </a>
            {user?.twitchId && (
              <a
                className="font-main text-base font-semibold text-gray-800 block m-2"
                href={`https://twitch.tv/${user?.twitchId}`}
              >
                <TwitchIcon className="inline-block mx-2 h-7 w-7" />
                <span>Twitch</span>
              </a>
            )}
            {user?.discordId && (
              <a
                className="font-main text-base font-semibold text-gray-800 block m-2"
                href={`https://discord.app/${user?.discordId}`}
              >
                <DiscordIcon className="inline-block mx-2 h-7 w-7" />
                <span>@{user?.discordId}</span>
              </a>
            )}
          </div>

          {sameUser && (
            <Challenges
              challenges={user!.challenges!}
              hero={user}
              players={playerMap}
            />
          )}
        </div>
      </div>
    </div>
  )
}
