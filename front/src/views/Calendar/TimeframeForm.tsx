import * as Icons from '@heroicons/react/24/outline'
import Button from '../../components/Button'

const timeC = 'inline-block px-2 py-1 rounded-md w-24 mx-1'

const timeOptions = []
for ( let i = 0  ; i < 24 ; i++ ){
  timeOptions.push(`${i}:00`)
  timeOptions.push(`${i}:30`)
}
timeOptions.push('24:00')

const TIME_OPTIONS = timeOptions.map( (v,i) => 
  (<option label={v}
    value={i}
    key={i}>v</option>)
)

export type Timeframe = {
  start: number
  end: number
}

type TimeframeFormProps = Timeframe & {
  onChange: (tf: Timeframe) => void
  onDelete?: () => void
}

type TimePickerProps = {
  slot: number
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

function TimePicker({ slot, onChange } : TimePickerProps){
  return <select value={slot}
    onChange={onChange}
    className={timeC}>
    {TIME_OPTIONS}
  </select>
}

export default function TimeframeForm({ start, end, onChange, onDelete }: TimeframeFormProps) {
  const oc = (id: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tf = { start, end, [id]: e.target.value }

    if ( tf.end <= tf.start ) return

    onChange(tf)
  }

  const icon = <Icons.TrashIcon className='h-4 w-4'/>
  return (
    <div className='grid grid-cols-4 gap-2'>
      <div className=' col-span-3 flex w-48 bg-white rounded-xl'>
        <TimePicker slot={start}
          onChange={oc('start')}/>
        <div className='w-8 text-center w-full py-1'> to </div>
        <TimePicker slot={end}
          onChange={oc('end')}/>
      </div>
      {onDelete && <Button 
        label={icon}
        onClick={onDelete}
        extraClasses='inline-block'
        sizeClasses='m-1 w-6'
        colorClasses='bg-red-600 hover:bg-red-900 text-red-100'
      />}
    </div>
  )
}