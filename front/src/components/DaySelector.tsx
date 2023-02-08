import classNames from 'classnames'
import Tooltip from './Tooltip'

const DAY_ORDER = 'SmtwTfs'.split('')

const DAY = {
  S: 'Sunday',
  m: 'Monday',
  t: 'Tuesday',
  w: 'Wednesday',
  T: 'Thursday',
  f: 'Friday',
  s: 'Saturday'
}

type Props = {
  value: string
  onChange: (v:string) => void
}

export default function DaySelector({ value, onChange }: Props) {
  const marked = new Set(value.split(''))

  const classes = (markedDay: boolean, d: string) => classNames(
    'h-9 w-9 text-center text-lg font-medium py-1 cursor-pointer border-gray-500',
    markedDay ? 'bg-green-2' : 'bg-gray-400 text-gray-900',
    'tooltip-target',
    d === 's' ? 'rounded-tr-md rounded-br-md' : 'border-r-[1px]',
    d === 'S' ? 'rounded-tl-md rounded-bl-md' : 'border-l-[1px]',
  )

  const onToggle = (d: string) => () => {
    if (marked.has(d)) marked.delete(d)
    else marked.add(d)

    const newValue = Array.from(marked).join('')

    onChange(newValue)
  }

  const elements = DAY_ORDER.map(d => <div 
    className={classes(marked.has(d), d)}
    key={d}
    onClick={onToggle(d)}
  >
    <Tooltip content={DAY[d as keyof typeof DAY]}/>
    {d.toUpperCase()}
  </div>)

  return (
    <div className='flex flex-row w-fit h-fit'>
      {elements}
    </div>
  )
}