import { CalendarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { CompetitionMatch, RoundResult } from '../../generated/graphql'

type MatchProps = {
  data: CompetitionMatch
  ranking: Map<string,number>
  short?: boolean
}

const wins = (results: RoundResult[], id: string) => {
  return results.filter( r => r.winner === id).length
}

const midBoxesSizes = {
  p1: 'w-48 text-right px-1',
  mid: 'w-32 text-center',
  p2: 'w-48 text-left px-1'
}

type PlayerBoxProps = {
  data: CompetitionMatch
  ranking: Map<string,number>
  played: boolean
  player: 'p1' | 'p2'
}

const LINE = <div className='w-[1px] h-full mx-2 bg-gray-400'>
</div>

const midBoxesClasses = (box: keyof typeof midBoxesSizes, played: boolean) =>  classNames(
  'flex flex-col white',
  midBoxesSizes[box],
  played ? 'py-3 gap-3' : ''
)

function PlayerBox({ played, data, ranking, player }: PlayerBoxProps){
  
  const pData = player === 'p1' ? data.player1 : data.player2

  return (
    <>
      {player === 'p1' && <a className='block w-fit h-fit' href={`/profile/${pData.steamId}`}>
        <img
          className='m-2 p-1 h-fit w-24'
          src={pData.avatar}
        />
      </a>}
      <div className={midBoxesClasses(player, played)}>
        <span>{pData.name}</span>
        {
          played
            ? <>
              <span>{wins(data.results as RoundResult[], pData.steamId)}</span>
            </>
            : <>
              <span>{(ranking.get(pData.steamId) ?? 0) +1}</span>
              <span>{pData.games}</span>
              <span>{pData.score}</span>
            </>
        }
      </div>
      {player === 'p2' && <a className='block w-fit h-fit' href={`/profile/${pData.steamId}`}>
        <img
          className='m-2 p-1 h-fit w-24'
          src={pData.avatar}
        />
      </a>}
    </>
  )
}

function ShortMatchComponent({ data, ranking }: MatchProps) {
  const start = data.start && new Date(data.start)
  const [date, time] = start ? start.toISOString().split('T') : []

  const played = !!data.results?.length

  const boxClasses = (box: 'left' | 'right') => classNames(
    'h-full',
    !start
      ? 'bg-gray-700'
      : played
        ? 'bg-green-2'
        : 'bg-blue-1 tex-lg',
    box === 'left' ? 'w-6' : 'w-48 flex flex-col text-gray-400 font-medium'
  )

  const containerClasses = classNames(
    'my-3 flex flex-row w-full',
    'bg-gray-300 h-28 rounded-2xl overflow-hidden',
    'font-semibold font-main text-lg'
  )

  const points = [
    wins(data.results as RoundResult[], data.player1.steamId),
    wins(data.results as RoundResult[], data.player2.steamId),
  ]

  return (
    <div className={containerClasses}>
      <div className={boxClasses('left')}></div>

      <div className='flex flex-row w-[450px]'>
        {played && <>
          <div className='flex flex-col w-40'>
            <img
              className='my-1 mx-auto p-1 h-fit w-20'
              src={data.player1.avatar}
            />
            <span className='mx-auto text-base'>{data.player1.name}</span>
          </div>
          <div className='mx-auto my-auto w-fit text-[50px]'>
            {points[0]} - {points[1]}
          </div>
          <a className='block' href={`/profile/${data.player2.steamId}`}>
            <div className='flex flex-col w-40'>
              <img
                className='my-1 mx-auto p-1 h-fit w-20'
                src={data.player2.avatar}
              />
              <span className='mx-auto text-base'>{data.player2.name}</span>
            </div>
          </a>
        </>}
        {!played && <>
          <div className='flex-grow flex flex-col px-5 py-3 text-base text-gray-800'>
            <span>Rank {ranking.get(data.player2.steamId)! +1}</span>
            <span>{data.player2.score} points</span>
            <span>{data.player2.games} games played</span>
          </div>
          <a className='block' href={`/profile/${data.player2.steamId}`}>
            <div className='flex flex-col w-40'>
              <img
                className='my-1 mx-auto p-1 h-fit w-20'
                src={data.player2.avatar}
              />
              <span className='mx-auto text-base'>{data.player2.name}</span>
            </div>
          </a>
        </>}
      </div>
      
      <div className={boxClasses('right')}>
        {start
          ? <>
            <div className='mt-2 ml-5 flex flex-row gap-2 text-base font-medium'>
              { 
                played
                  ? <CheckCircleIcon className='w-6 h-6 stroke-gray-400' />
                  : <CalendarIcon className='w-6 h-6 stroke-gray-400'/>
              }
              <span>{ played ? 'Played' : 'Scheduled'}</span>
            </div>
            <div className='ml-5 mt-2 text-lg flex flex-col font-semibold'>
              <span>{date}</span>
              <span>{time.split('.')[0]} GMT</span>
            </div>
          </>
          : <>
            <div className='mt-2 ml-5 flex flex-row gap-2 text-base'>
              <ClockIcon className='w-6 h-6 stroke-gray-400'/>
              <span>To be <br /> Scheduled</span>
            </div>
          </>
        }
      </div>
    </div>
  )
}

function FullMatchComponent({ data, ranking }: MatchProps){
  const start = data.start && new Date(data.start)
  const [date, time] = start ? start.toISOString().split('T') : []

  const played = !!data.results?.length

  const boxClasses = (box: 'left' | 'right') => classNames(
    'h-full',
    !start
      ? 'bg-gray-700'
      : played
        ? 'bg-green-2'
        : 'bg-blue-1 tex-lg',
    box === 'left' ? 'w-6' : 'w-48 flex flex-col text-gray-400 font-medium'
  )

  const containerClasses = classNames(
    'my-3 flex flex-row w-full',
    'bg-gray-300 h-28 rounded-2xl overflow-hidden',
    'font-semibold font-main text-lg'
  )

  return (
    <div className={containerClasses}>
      <div className={boxClasses('left')}></div>
      <PlayerBox {...{ data, ranking, played }} player='p1' />
      {LINE}
      <div className={midBoxesClasses('mid', played)}>
        <span>Name</span>
        {
          played
            ? <>
              <span>Score</span>
            </>
            : <>
              <span>Rank</span>
              <span>Points</span>
              <span>Matches</span>
            </>
        }
      </div>
      {LINE}
      <PlayerBox {...{ data, ranking, played }} player='p2' />
      <div className={boxClasses('right')}>
        {start
          ? <>
            <div className='mt-2 ml-5 flex flex-row gap-2 text-base font-medium'>
              { 
                played
                  ? <CheckCircleIcon className='w-6 h-6 stroke-gray-400' />
                  : <CalendarIcon className='w-6 h-6 stroke-gray-400'/>
              }
              <span>{ played ? 'Played' : 'Scheduled'}</span>
            </div>
            <div className='ml-5 mt-2 text-lg flex flex-col font-semibold'>
              <span>{date}</span>
              <span>{time.split('.')[0]} GMT</span>
            </div>
          </>
          : <>
            <div className='mt-2 ml-5 flex flex-row gap-2 text-base'>
              <ClockIcon className='w-6 h-6 stroke-gray-400'/>
              <span>To be <br /> Scheduled</span>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default function MatchComponent({ short, data, ranking }: MatchProps){
  if (short) return <ShortMatchComponent {...{ data, ranking }} />

  return <FullMatchComponent {...{ data, ranking }} />
}