import { UsersIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import SwordIcon from '../../components/icons/SwordIcon'
import Tooltip from '../../components/Tooltip'
import type { User } from '../../generated/graphql'

const mainClass = 'flex flex-row gap-5 my-5'
type CalendarView = 'matches' | 'challenge'
type Props = {
  setView: (v: CalendarView) => void
  view: CalendarView
  rivalId?: bigint
  setRivalId: (id: bigint) => void
  rivals: Pick<User, 'steamId' | 'avatar' | 'name'>[]
}

export default function Toolbar({
  setView,
  view,
  setRivalId,
  rivalId,
  rivals,
}: Props) {
  const onClick = (v: CalendarView) => () => setView(v)

  const displayClasses = 'flex-grow py-1'
  const options = rivals.map((r) => ({
    value: r.steamId,
    label: (
      <>
        <img
          src={r.avatar}
          className="h-10 w-10 rounded-full bg-gray-300 mr-2"
        />
        <span className={displayClasses}>{r.name}</span>
      </>
    ),
  }))

  const btn = (node: React.ReactNode, tooltip: string) => (
    <div className="h-7 w-7 tooltip-target">
      <Tooltip content={tooltip} top="-top-10" />
      {node}
    </div>
  )

  return (
    <div className={mainClass}>
      <Button
        onClick={onClick('challenge')}
        label={btn(<UsersIcon />, 'Challenge')}
        sizeClasses="w-fit p-4"
      />

      <Button
        onClick={onClick('matches')}
        label={btn(<SwordIcon className="fill-white" />, 'Matches')}
        sizeClasses="w-fit p-4"
      />

      {view === 'challenge' && (
        <Dropdown
          value={rivalId}
          placeholder={<span className={displayClasses}>Look for a Rival</span>}
          options={options}
          onSelect={setRivalId}
          colorClasses="bg-gray-900"
          sizeClasses="w-72 h-fit text-lg"
          paddingClasses="pt-2 pb-1"
        />
      )}
    </div>
  )
}
