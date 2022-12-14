import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid'
import timegridPlugin from '@fullcalendar/timegrid'

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
    <div className='h-5/6 bg-black/80 rounded-3xl'>
      <div className={mainClass}>
        <div className='px-5 py-5 text-white absolute top-0 left-0 h-fit w-full z-3'>
          <FullCalendar
            dayHeaderClassNames="text-black bg-white"
            dayCellClassNames="border-gray-300"
            viewClassNames="text-black bg-white"
            customButtons={{
              myCustomButton: {
                text: 'custom!',
                click: function() {
                  alert('clicked the custom button!')
                }
              }
            }}
            allDaySlot={false}
            scrollTime={scrollTime}
            plugins={[ timegridPlugin, daygridPlugin]}
            initialView='timeGridWeek'
            weekends
            slotDuration={{ hours: 1 }}
            selectable
            slotLaneClassNames="border-gray-300"
            slotLaneContent={Timecell}
            events={events}
            height='75vh'
          />
        </div>
      </div>
    </div>
  )
}