import { useState } from 'react'
import Header from '../../components/Header'
import CalendarComponent, { FCEvent } from './CalendarComponent'
import Toolbar from './Toolbar'
import { userQuery, rivalsQuery, matchesInRangeQuery } from '../../graphql'
import { useUser } from '../../logic/client'
import { useQuery } from '@apollo/client'
import Loading from '../../components/Loading'
import { GetRivalsQuery, TimeFrame, User } from '../../generated/graphql'
import { pick } from 'lodash'

type PlayerList = GetRivalsQuery['getCompetitionById']['players']
const WEEK_DELTA = {
  'S': 0,
  'm': 1,
  't': 2,
  'w': 3,
  'T': 4,
  'f': 5,
  's': 6,
}

const HOUR_MS = 3600 * 1000
const DAY_MS = 24 * HOUR_MS

const weekCells = () => {
  const cells: any[] = []
  for(let i = 0 ; i < 7 ; i++){
    cells[i] = []

    for(let j = 0 ; j < 24 ; j++) cells[i][j] = []
  }

  return cells
}

const genAvailabilityEvent = (start: number, end: number, data: Record<string, any>) => ({
  start: new Date(start).toISOString(),
  end: new Date(end).toISOString(),
  type: 'availability',
  extendedProps: data
})

const fillMatrix = (player: User, weekMatrix: string[][][]) => player.availability?.forEach(tf => {
  tf.days.split('').forEach(d => {
    const day = WEEK_DELTA[d as keyof typeof WEEK_DELTA]

    for( let h = tf.start ; h < tf.end ; h++ ){
      weekMatrix[(day + Math.floor(h/24)) % 7][h % 24].push(player.steamId)
    }
    
  })
})

const availability = (hero: User, rival: User, week: Date) => {
  if (!hero) return []

  const weekMatrix = weekCells()
  const events: FCEvent[] = []

  hero && fillMatrix(hero, weekMatrix)
  rival && fillMatrix(rival, weekMatrix)

  let start = 0
  let end = 0
  let type = 'void'

  weekMatrix.forEach((dayCells: string[][], d) => {
    dayCells.forEach((hourCell: string[], h) => {
      const currentHour = week.getTime() + d*DAY_MS + h*HOUR_MS
      
      start = start ? start : currentHour
      end = currentHour + HOUR_MS
      
      let newType: string
      if (hourCell.length === 0) {
        newType = 'void'
      } else if (hourCell.length === 1 ) {
        newType = hourCell[0] === hero.steamId ? 'hero' : 'rival'
      } else {
        newType = 'both'
      }

      if (newType !== type){
        
        if (type === 'both') {
          events.push(
            genAvailabilityEvent(start, end, { start, end, hero, rival, showHero: true  })
          )
        } else if (type === 'hero') {
          events.push(genAvailabilityEvent(start, end, { start, end, hero, showHero: true }))
        } else if (type === 'rival'){
          events.push(genAvailabilityEvent(start, end, { start, end, rival, hero }))
        }

        type = newType
        start = 0
      }
    })
  })

  if (start){
    end = week.getTime() + 6 * DAY_MS + 24 * HOUR_MS
    if (type === 'both') {
      events.push(genAvailabilityEvent(start, end, { hero, rival, showHero: true }))
    } else if (type === 'hero') {
      events.push(genAvailabilityEvent(start, end, { hero, showHero: true }))
    } else if (type === 'rival'){
      events.push(genAvailabilityEvent(start, end, { hero, rival }))
    }
  }

  return events
}

const matchesEvents = (data: TimeFrame[]) => data?.map( (tf) => {
  let end = tf.end 
  if (!end){
    end = new Date(tf.start).getTime() + 3600 * 1000 * 2
  }

  return {
    ...tf,
    start: new Date(tf.start).toISOString(),
    end: new Date(end).toISOString(),
    type: 'match',
  }
}) ?? []


const mainClass = 'h-fit w-full mt-28 pr-10'
export default function Calendar() {
  const userCtx = useUser()
  const [view, setView] = useState<'challenge'|'matches'>('challenge')
  const [{ start, end }, setDateRange] = useState<{ start?: Date, end?: Date }>({})

  const hero = useQuery(userQuery, {
    variables: { userId: userCtx?.user?.id ?? '-1'},
  })
  const rivals = useQuery(rivalsQuery, {
    variables: { competitionId: hero.data?.getUserById?.competitionId ?? '-1'},
    skip: view === 'matches'
  })
  
  const [rivalId, setRivalId] = useState<bigint>()
  const rival = useQuery(userQuery, {
    variables: { userId: rivalId ?? '-1' },
    skip: view === 'matches'
  })

  const matchesResult = useQuery(matchesInRangeQuery, {
    variables: { start, end },
    skip: view === 'challenge' || !start || !end
  })

  if ( !userCtx?.user || hero.loading || rivals.loading || rival.loading ){
    return <Loading />
  }
  
  const players = rivals.data?.getCompetitionById.players as PlayerList

  const toolProps = {
    view,
    setView,
    rivalId,
    setRivalId,
    rivals: players?.filter((p) => p.steamId !== userCtx.user?.id) ?? []
  }

  const week = new Date()
  week.setDate(week.getUTCDate() - week.getUTCDay())
  week.setUTCHours(0)
  week.setUTCMinutes(0)
  week.setUTCSeconds(0)
  week.setUTCMilliseconds(0)
  
  const events = view === 'challenge'
    ? availability(
      hero.data.getUserById,
      rival.error ? null : rival.data.getUserById,
      week
    ) 
    : matchesEvents(matchesResult.data?.getCompetitionMatchesInDateRange)

  return (
    <div className={mainClass}>
      <Header>
        Calendar
      </Header>
      <Toolbar {...toolProps} />
      <CalendarComponent 
        events={events}
        onDatesSet={(dateInfo) => setDateRange(pick(dateInfo,'start','end'))}
      />
    </div>
  )
}