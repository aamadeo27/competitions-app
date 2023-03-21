import type { EventContentArg } from '@fullcalendar/react'
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid'
import timegridPlugin from '@fullcalendar/timegrid'
import classNames from 'classnames'
import { CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Tooltip from '../../components/Tooltip'
import type { RoundResult } from '../../generated/graphql'
import { useModals } from '../../modals/modals'

function Timecell() {
  return <div className="h-10"></div>
}

export type FCEvent = Record<string, any>
type EventProps = {
  data: EventContentArg
}

function AvailabilityEvent({ data }: EventProps) {
  const { hero, rival, start, end, showHero } = data.event.extendedProps
  const modals = useModals()

  const containerClasses = classNames(
    showHero && rival ? 'bg-green-2' : showHero ? 'bg-blue-500' : 'bg-red-500',
    'flex flex-row gap-1 p-1 h-full'
  )

  const imgs = []
  if (rival) {
    imgs.push(
      <img src={rival.avatar} className="h-6 w-6 rounded-full" key="rival" />
    )
  }
  if (showHero) {
    imgs.push(
      <img src={hero.avatar} className="h-6 w-6 rounded-full" key="hero" />
    )
  }

  const onClick = () => {
    if (!rival) return

    modals.setModal('challenge', { start, end, challenger: hero, challenged: rival })
  }

  return (
    <div className={containerClasses} onClick={onClick}>
      {imgs}
    </div>
  )
}

function MatchEvent({ data }: EventProps) {
  const { results, competitor1, player1, player2 } = data.event.extendedProps

  const containerClasses = classNames(
    results.length ? 'bg-green-2' : 'bg-blue-500',
    'flex flex-col gap-1 p-1 h-full',
    'tooltip-target'
  )

  const items = []
  items.push(
    results.length ? (
      <CheckCircleIcon className="w-4 h-4 stroke-gray-400" />
    ) : (
      <CalendarIcon className="w-4 h-4 stroke-gray-400" />
    )
  )
  items.push(
    <img src={player1.avatar} className="h-4 w-4 rounded-full" key="p1" />
  )
  items.push(
    <img src={player2.avatar} className="h-4 w-4 rounded-full" key="p2" />
  )

  const p1Wins = results.reduce(
    (wins: number, r: RoundResult) => wins + (r.winner === competitor1 ? 1 : 0),
    0
  )
  const score = results.length && (
    <div className="flex flex-col">
      <span>
        {player1.name} {p1Wins}
      </span>
      <span>
        {player2.name} {results.length - p1Wins}
      </span>
    </div>
  )

  return (
    <div className={containerClasses}>
      {!!score && <Tooltip content={score} top="top-20" width="w-36" />}
      {items}
    </div>
  )
}

function CalendarEvent({ data }: EventProps) {
  if (data.event.extendedProps.type === 'availability') {
    return <AvailabilityEvent data={data} />
  }
  if (data.event.extendedProps.type === 'match') {
    return <MatchEvent data={data} />
  }

  return null
}

type Props = {
  events: FCEvent[]
  onDatesSet: (dateInfo: any) => void
}
const mainClass = 'relative h-full w-full p-2'
export default function Calendar({ events, onDatesSet }: Props) {
  const now = new Date()
  const end = new Date()
  end.setTime(Date.now() + 1000 * 3600 * 10)

  const scrollTime = now.toTimeString().split(' ')[0]

  return (
    <div className="h-[110vh] bg-black/80 rounded-3xl">
      <div className={mainClass}>
        <div className="px-5 py-5 text-white absolute top-0 left-0 h-fit w-full z-3">
          <FullCalendar
            datesSet={onDatesSet}
            dayHeaderClassNames="text-black bg-white"
            dayCellClassNames="border-gray-300"
            viewClassNames="text-black bg-white"
            customButtons={{
              myCustomButton: {
                text: 'custom!',
                click: function () {
                  alert('clicked the custom button!')
                },
              },
            }}
            eventBackgroundColor="transparent"
            eventClassNames="bg-transparent left-0"
            eventContent={(e) => <CalendarEvent data={e} />}
            allDaySlot={false}
            scrollTime={scrollTime}
            plugins={[timegridPlugin, daygridPlugin]}
            initialView="timeGridWeek"
            weekends
            slotDuration={{ hours: 1 }}
            selectable
            slotLaneClassNames="border-gray-300"
            slotLaneContent={Timecell}
            events={events}
            height="100vh"
          />
        </div>
      </div>
    </div>
  )
}
