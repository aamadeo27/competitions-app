import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useReducer } from 'react'
import Container from '../../components/Container'
import type { CompetitionMatch } from '../../generated/graphql'
import { getTime } from '../../logic/utils'
import MatchComponent from './MatchComponent'

type Props = {
  matches: CompetitionMatch[]
  ranking: Map<string, number>
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
    [action.payload]: !state[action.payload],
  }
}

const FILTER_COLORS = {
  confirmed: {
    showing: 'bg-blue-1',
    hiding: 'bg-gray-400',
  },
  played: {
    showing: 'bg-green-2',
    hiding: 'bg-gray-400',
  },
  pending: {
    showing: 'bg-gray-700',
    hiding: 'bg-gray-400',
  },
}

export default function Matches({ matches, ranking }: Props) {
  const [filters, dispatch] = useReducer(filterReducer, { pending: true })
  const toggleFilter = (filter: keyof Filters) => () =>
    dispatch({ payload: filter })

  let filteredMatches = [...matches]

  filteredMatches.sort((a, b) => {
    return (
      getTime(b.start, Number.MIN_SAFE_INTEGER) -
      getTime(a.start, Number.MIN_SAFE_INTEGER)
    )
  })

  if (filters.pending) {
    filteredMatches = filteredMatches.filter((m) => m.start)
  }
  if (filters.confirmed) {
    filteredMatches = filteredMatches.filter((m) =>
      m.start ? m.results?.length : true
    )
  }
  if (filters.played) {
    filteredMatches = filteredMatches.filter(
      (m) => !(m.start && m.results?.length)
    )
  }

  const filterClass = (filter: keyof Filters, status: boolean) =>
    classNames(
      'w-16 h-16 rounded-full p-3 cursor-pointer',
      FILTER_COLORS[filter][status ? 'hiding' : 'showing']
    )

  return (
    <div className="flex flex-arrow gap-2">
      <Container sizeClasses="flex-grow">
        {filteredMatches.map((m, i) => (
          <MatchComponent data={m} key={i} ranking={ranking} />
        ))}
      </Container>

      <div className="w-24 mt-10 p-2 flex flex-col gap-5">
        <div
          className={filterClass('played', !!filters.played)}
          onClick={toggleFilter('played')}
        >
          <CheckCircleIcon className="block w-10 h-10 stroke-white" />
        </div>
        <div
          className={filterClass('confirmed', !!filters.confirmed)}
          onClick={toggleFilter('confirmed')}
        >
          <CalendarIcon className="block w-10 h-10 stroke-white" />
        </div>
        <div
          className={filterClass('pending', !!filters.pending)}
          onClick={toggleFilter('pending')}
        >
          <ClockIcon className="block w-10 h-10 stroke-white" />
        </div>
      </div>
    </div>
  )
}
