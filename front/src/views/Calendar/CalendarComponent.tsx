import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid'
import timegridPlugin from '@fullcalendar/timegrid'

import Curtain from '../../components/Curtain'

function Timecell(){
  return <div className='h-10'>

  </div>
}

const mainClass = 'relative h-full w-full p-2'
export default function Calendar() {

  const now = new Date()
  const end = new Date()
  end.setTime(Date.now() + 1000*3600*10)
  const events = [{
    id: '0',
    start: now.toISOString(),
    end: end.toISOString()
  }]

  const scrollTime = now.toTimeString().split(' ')[0]

  return (
    <div className='h-5/6'>
      <div className={mainClass}>
        <Curtain classes={'opacity-60'}/>
        <div className='px-5 py-5 text-white absolute top-0 left-0 h-fit w-full z-3'>
          <FullCalendar
            scrollTime={scrollTime}
            plugins={[ timegridPlugin, daygridPlugin]}
            initialView='timeGridWeek'
            slotLaneClassNames='bg-white-200'
            weekends
            slotDuration={{ hours: 1 }}
            selectable
            slotLaneContent={Timecell}
            events={events}
            height='75vh'
          />
        </div>
      </div>
    </div>
  )
}