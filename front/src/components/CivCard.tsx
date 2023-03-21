import type { Civ } from '../logic/data'
import React from 'react'
import classNames from 'classnames'
import * as Icons from '@heroicons/react/24/outline'

type CivCardProps = {
  civ: Civ
  clearCiv?: () => void
}

export default function CivCard({ civ, clearCiv }: CivCardProps) {
  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer?.setData('type', 'civ')
    e.dataTransfer?.setData('name', civ!)
  }
  const xClazz = 'h-3 w-3 right-2 top-2 cursor-pointer absolute'
  const clazz = classNames(
    'border-2 pt-4 pb-2 px-2 m-1 rounded-md relative text-sm',
    clearCiv
      ? 'border-green-200 bg-emerald-900'
      : 'border-blue-200 bg-indigo-900'
  )

  return (
    <div draggable onDragStart={dragStart} className={clazz}>
      {clearCiv && (
        <span onClick={clearCiv} className={xClazz}>
          <Icons.XMarkIcon className="stroke-red" />
        </span>
      )}
      <span>{civ}</span>
    </div>
  )
}
