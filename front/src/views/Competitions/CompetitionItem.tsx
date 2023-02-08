import { CalendarIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Competition, CompetitionMatch, User } from '../../generated/graphql'
import { getTime } from '../../logic/utils'
import CompetitionHeader from './CompetitionHeader'

type Props = {
  data: Competition
}

const WEEK_IN_MS = 604800000
const players = (data: Competition) => data?.players?.length ?? 'Loading'
const matches = (data: Competition) => data?.matches?.filter( m => m.results?.length).length ?? 'Loading'
const week = (data: Competition) => {
  if (!data) return 'Loading'
  if (!data.start) return undefined

  const start = new Date(data.start).getTime()

  return Math.ceil((Date.now() - start) / WEEK_IN_MS)
}

const getLeader = (data:Competition) => {
  if (!data) return undefined
  
  const leader = data.players?.reduce( (top, current) => 
    (top.score ?? 0) > (current.score ?? 0)
      ? top
      : current
  , data.players[0]
  )

  return leader?.score ? leader : undefined
}

const getNextMatch = (data: Competition) => {
  if (!data) return undefined

  const nextMatch = data.matches?.filter( m => m.start)
    .reduce( (next, match) => 
      getTime(next.start) > getTime(match?.start)
        ? next
        : match
    , data.matches[0]
    )

  return nextMatch
}

function Leader({ data }: { data?: User}) {
  if (!data) return <span></span>

  return (
    <>
      <span className='m-2'>
          Leader
      </span>
      <div className='m-1 flex flex-row'>
        <img 
          src={data.avatar}
          className='block h-16 w-16 rounded-full'
        />
        <div className='flex-grow px-2 flex flex-col text-sm'>
          <span className='text-gray-800 text-top'>
            {data?.name}
          </span>
          <span>{data?.games} matches</span>
          <span>{data?.score} points</span>
        </div>
      </div>
    </>
  )
}

function NextMatch({ data }: { data?: CompetitionMatch }) {
  if (!data) return <span></span>

  return (
    <>
      <span>
          Next Match
      </span>
      <div className='flex-grow flex flex-row'>
        <img 
          src={data.player1.avatar}
          className='block my-1 h-14 w-14 rounded-full'
        />
        <div className='w-40 text-gray-900 font-bold text-center flex flex-col text-sm'>
          <span>{data.player1.name}</span>
          <span>vs</span>
          <span>{data.player2.name}</span>
        </div>
        <img 
          src={data.player2.avatar}
          className='block my-1 h-14 w-14 rounded-full'
        />
      </div>
      <div className='mx-auto mb-1'>
        <CalendarIcon className='inline-block stroke-gray-700 w-4 h-4'/>
        <span className='inline-block text-sm ml-2'>
          {data.start.replace(/([TZ]|\.\d{3})/g,' ')} GMT
        </span>
      </div>
    </>
  )
}

const ordinal = [null, '1st','2nd','3rd']

export default function CompetitionItem ({ data }: Props) {
  const weekNum = week(data)

  return (
    <div className='mb-4 text-gray-700 font-semibold bg-white w-full rounded-xl h-fit flex flex-row divide-x overflow-hidden'>
      <Link to={`/divisions/${data.id}`}>
        <div className='w-56'>
          <CompetitionHeader shortname={data.shortname} name={data.name}/>
        </div>
      </Link>

      <div className='h-full w-56'>
        <Leader data={getLeader(data)} />
      </div>

      <div className='w-72 pl-2 flex flex-col'>
        <NextMatch data={getNextMatch(data)} />
      </div>

      <div className='flex-grow bg-gray-200 flex flex-col'>
        <div className='flex flex-row p-2 gap-2'>
          <span className='inline-block text-gray-900 text-3xl'>{players(data)}</span>
          <span className='inline-block text-top h-full py-1'> PLAYERS </span>
          <span className='inline-block text-gray-900 text-3xl'>{matches(data)}</span>
          <span className='inline-block text-top h-full py-1'> MATCHES </span>
        </div>
        <div className='flex flex-row p-2 gap-2'>
          { weekNum === undefined
            ? <span className='inline-block text-top h-full py-1'> Not Scheduled </span>
            : weekNum < 0 
              ? <span className='inline-block text-gray-900 text-xl pl-5'>
                  Starts {data.start.split('T')[0]}
              </span>
              : <>
                <span className='inline-block text-gray-900 text-3xl'>
                  {
                    typeof weekNum === 'string'
                      ? weekNum
                      : weekNum < 4
                        ? ordinal[weekNum]
                        : `${weekNum}th`
                  }
                </span>
                <span className='inline-block text-top h-full py-1'> WEEK </span>
              </>
          }
          
        </div>
      </div>
    </div>
  )

}