import Button from '../../components/Button'
import Form from '../../components/Form'
import * as Icons from '@heroicons/react/24/outline'
import { useState } from 'react'
import classNames from 'classnames'
import TimeframeForm, { Timeframe } from './TimeframeForm'

const MAIN_CLASSES = classNames(
  'relative mx-auto mt-16 p-10 rounded-3xl',
  'bg-stone-200 h-fit w-fit min-w-modal',
)

function DayButton({ day, selected, onClick }: any) {
  const clazz = classNames(
    'pl-4 py-2 rounded-md font-medium',
    'm-0.5 cursor-pointer',
    selected ? 'bg-stone-700 text-stone-100' : 'bg-stone-100 text-stone-700'
  )

  console.log({ day, selected })

  return (
    <div
      className={clazz}
      onClick={onClick}
    >
      {day}
    </div>
  )
}
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' |
  'friday' | 'saturday' | 'sunday'
type DaySelectorProps = {
  selected: DayOfWeek
  select: (d: DayOfWeek) => void
}

function DaySelector({ selected, select }: DaySelectorProps){
  const days: DayOfWeek [] = ['monday' , 'tuesday' , 'wednesday' , 'thursday' ,
    'friday' , 'saturday' , 'sunday']

  return (
    <div className='flex-none w-32 border-2 mr-2'> 
      <div className='grid grid-rows-7'>
        {days.map( d => <DayButton 
          day={d}
          selected={d === selected}
          key={d}
          onClick={() => select(d)}
        />)}
      </div>
    </div>
  )
}

const INITIAL_TIMEFRAME = [{
  start: 18,
  end: 24
}]

type Props = {
  close: () => void
}

export default function AvailabilityModal({ close }: Props) {
  const [dayTimeframes, setTimeframes] = useState(INITIAL_TIMEFRAME)
  const [daySelected, selectDay] = useState<DayOfWeek>('monday')
  
  if (!open) return null

  const addTimeframe = () => {
    const last = dayTimeframes[dayTimeframes.length-1]

    setTimeframes([...dayTimeframes, {
      start: last.end,
      end: 48
    }])
  }

  const octf = (id: number) => (newTf: Timeframe) => {
    const tfs = dayTimeframes.map( (tf, i) => 
      id === i ? newTf : tf
    )

    setTimeframes(tfs)
  }

  const od = (id: number) => () => {
    const tfs = dayTimeframes.filter( (tf, i) => 
      id !== i
    )

    setTimeframes(tfs)
  }

  const atfLabel = <>
    <Icons.PlusCircleIcon className='h-6 w-6 inline-block mr-1 pb-1'/>
    <span className='inline-block text-sm'>Add timeframe</span>
  </>

  const timeframes = dayTimeframes.map( (data: Timeframe , id) => 
    ({
      node: <TimeframeForm {...{...data, onChange: octf(id), onDelete: id ? od(id) : undefined}}
        key={id}/>
    })
  )

  const groups = [
    {
      node: <Button label={atfLabel}
        key={0}
        onClick={addTimeframe}/>,
    },
    ...timeframes
  ]

  console.log(daySelected)

  return (
    <div className='absolute top-0 left-0 h-screen w-screen z-30'>
      <div className='h-full w-full'>
        <div className={MAIN_CLASSES}>
          <h1 className='font-bold text-zinc-800 my-4 text-lg'> Availability Config</h1>
          <div className='flex w-100'>
            <DaySelector selected={daySelected}
              select={selectDay}/>
            
            <Form 
              groups={groups}
            />
          </div>
          <Button
            onClick={() => null}
            label='Save'
            sizeClasses='h-7 w-16 pl-3'
            extraClasses='m-auto mt-5'
          />
          <Button
            onClick={() => close()}
            label={<Icons.XMarkIcon />}
            colorClasses=''
            sizeClasses='h-8 w-8'
            extraClasses='absolute top-5 right-5'
          />
        </div>
      </div>
    </div>
  )
}