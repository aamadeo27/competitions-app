import { ChartBarSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import SwordIcon from '../../components/icons/SwordIcon'

export type CompetitionTab = 'ranking' | 'matches'
type Props = {
  active: CompetitionTab
  select: (t: CompetitionTab) => void
}
export default function CompetitionNav({ active, select }: Props){

  const classes = (active: boolean) => classNames(
    'rounded-3xl h-16 w-16 hover:bg-gray-600',
    active ? 'bg-gray-700' : 'bg-gray-900'
  )

  const onClick = (t: CompetitionTab) => () => select(t)

  return (
    <div className='flex flex-row gap-10 mt-10'>
      
      <button className={classes(active === 'ranking')}
        onClick={onClick('ranking')} >
        <ChartBarSquareIcon
          className='m-2 stroke-gray-300'
          fill='none'
        />
      </button>
      <button className={classes(active === 'matches')}
        onClick={onClick('matches')} >
        <SwordIcon className='m-4 fill-gray-300' />
      </button>
    </div> 
  )
}