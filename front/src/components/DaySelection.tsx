import classNames from 'classnames'

const DAY_ORDER = 'SmtwTfs'.split('')

export default function DaySelection({ days }: { days: string }) {
  const marked = new Set(days.split(''))

  const classes = (markedDay: boolean) => classNames(
    'h-6 w-6 text-center',
    markedDay ? 'bg-green-2' : 'bg-gray-400 text-gray-900'
  )

  const elements = DAY_ORDER.map(d => <div 
    className={classes(marked.has(d))}
    key={d}
  >
    {d.toUpperCase()}
  </div>)

  return (
    <div className='flex flex-row w-fit h-fit rounded-md overflow-hidden bg-gray-500 gap-0.5'>
      {elements}
    </div>
  )
}