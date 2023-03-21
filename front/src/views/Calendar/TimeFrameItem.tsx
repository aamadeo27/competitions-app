import * as Icons from '@heroicons/react/24/outline'
import DaySelection from '../../components/DaySelection'
import Tooltip from '../../components/Tooltip'
import type { TimeFrame } from '../../generated/graphql'

type TimeframeFormProps = TimeFrame & {
  onClick: React.ReactEventHandler
  remove?: () => void
}

export default function TimeFrameItem({
  onClick,
  remove,
  ...data
}: TimeframeFormProps) {
  const icon = <Icons.TrashIcon className="h-4 w-4" onClick={remove} />
  return (
    <div className="flex flex-row px-5 gap-1">
      <div className="flex-none w-56 py-1 cursor-pointer" onClick={onClick}>
        {data.description ?? 'Available'}
      </div>
      <div className="flex-none w-fit py-1">
        <DaySelection days={data.days} />
      </div>
      <div className="flex-grow py-1 font-medium text-center">
        {data.start}:00 - {data.end}:00
      </div>
      <div className="flex-none w-fit py-1 cursor-pointer tooltip-target">
        <Tooltip content="delete" />
        {icon}
      </div>
    </div>
  )
}
