import { CalendarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useReducer } from 'react'
import Container from '../../components/Container'
import { CompetitionMatch, RoundResult, User } from '../../generated/graphql'
import { getTime } from '../../logic/utils'


type Props = {
  matches: CompetitionMatch[]
  ranking: Map<string,number>
}

type MatchProps = {
  data: CompetitionMatch
  ranking: Map<string,number>
}

const wins = (results: RoundResult[], id: string) => {
  return results.filter( r => r.winner === id).length
}

const midBoxesSizes = {
  p1: 'w-48 text-right px-1',
  mid: 'w-32 text-center',
  p2: 'w-48 text-left px-1'
}

function MatchElement({ data, ranking }: MatchProps){
  const line = <div className='w-[1px] h-full bg-gray-400'></div>
  const start = data.start && new Date(data.start)
  const [date, time] = start ? start.toISOString().split('T') : []

  const played = data.results?.length

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

  const midBoxesClasses = (box: keyof typeof midBoxesSizes) =>  classNames(
    'flex flex-col white',
    midBoxesSizes[box],
    played ? 'py-3 gap-3' : ''
  )

  return (
    <div className={containerClasses}>
      <div className={boxClasses('left')}></div>
      <img
        className='m-2 p-1 h-fit w-24'
        src={data.player1.avatar}
      />
      <div className={midBoxesClasses('p1')}>
        <span>{data.player1.name}</span>
        {
          played
            ? <>
              <span>{wins(data.results as RoundResult[], data.player1.steamId)}</span>
            </>
            : <>
              <span>{(ranking.get(data.player1.steamId) ?? 0) +1}</span>
              <span>{data.player1.games}</span>
              <span>{data.player1.score}</span>
            </>
        }
      </div>
      {line}
      <div className={midBoxesClasses('mid')}>
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
      {line}
      <div className={midBoxesClasses('p2')}>
        <span>{data.player2.name}</span>
        {
          played
            ? <>
              <span>{wins(data.results as RoundResult[], data.player2.steamId)}</span>
            </>
            : <>
              <span>{(ranking.get(data.player2.steamId) ?? 0) +1}</span>
              <span>{data.player2.games}</span>
              <span>{data.player2.score}</span>
            </>
        }
        
      </div>
      <img
        className='m-2 p-1 h-fit w-24'
        src={data.player2.avatar}
      />
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

type Filters = {
  confirmed?: boolean
  played?: boolean
  pending?: boolean
}

type FilterAction = {
  payload: keyof Filters
}
const filterReducer = (state: Filters, action: FilterAction) => {
  return {
    ...state,
    [action.payload]: !state[action.payload]
  }
}

const FILTER_COLORS = {
  confirmed: {
    showing: 'bg-blue-1',
    hiding: 'bg-gray-400'
  }, played: {
    showing: 'bg-green-2',
    hiding: 'bg-gray-400'
  }, pending: {
    showing: 'bg-gray-700',
    hiding: 'bg-gray-400'
  }
}

export default function Matches({ matches, ranking }: Props){

  const [filters, dispatch] = useReducer(filterReducer, { pending: true })
  const toggleFilter = (filter: keyof Filters) => () => dispatch({ payload: filter })

  let filteredMatches = [...matches]

  filteredMatches.sort( (a,b) => {
    return getTime(b.start, Number.MIN_SAFE_INTEGER) - getTime(a.start, Number.MIN_SAFE_INTEGER)
  })

  if ( filters.pending ){
    filteredMatches = filteredMatches.filter( m => m.start )
  }
  if ( filters.confirmed ){
    filteredMatches = filteredMatches.filter( m => m.start ? m.results?.length : true )
  }
  if ( filters.played ){
    filteredMatches = filteredMatches.filter( m => !(m.start && m.results?.length))
  }

  const filterClass = (filter: keyof Filters, status: boolean) => classNames(
    'w-16 h-16 rounded-full p-3 cursor-pointer',
    FILTER_COLORS[filter][status ? 'hiding' : 'showing']
  )

  return (
    <div className='flex flex-arrow gap-2'>
      <Container sizeClasses='flex-grow'>
        {filteredMatches.map( (m,i) =>  <MatchElement data={m} key={i} ranking={ranking} />)}
      </Container>
      
      <div className='w-24 mt-10 p-2 flex flex-col gap-5'>
        <div className={filterClass('played', !!filters.played)} onClick={toggleFilter('played')}>
          <CheckCircleIcon className='block w-10 h-10 stroke-white' />
        </div>
        <div className={filterClass('confirmed', !!filters.confirmed)} onClick={toggleFilter('confirmed')}>
          <CalendarIcon className='block w-10 h-10 stroke-white' />
        </div>
        <div className={filterClass('pending', !!filters.pending)} onClick={toggleFilter('pending')}>
          <ClockIcon className='block w-10 h-10 stroke-white'/>
        </div>
      </div>
    </div>
  )
}