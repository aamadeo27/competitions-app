import type { Setting } from '../logic/data'
import * as Icons from '@heroicons/react/24/outline'
import React from 'react'
import classNames from 'classnames'

type SettCardProps = {
  setting: Setting
  id: number
  clearSetting?: () => void
}

export default function SettingCard({
  setting,
  id,
  clearSetting,
}: SettCardProps) {
  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer?.setData('type', 'setting')
    e.dataTransfer?.setData('id', `${id}`)
  }
  const xClazz = 'h-4 w-4 right-2 top-2 cursor-pointer absolute'
  const clazz = classNames(
    'border-2 p-3 m-1 rounded-md relative',
    clearSetting
      ? 'border-green-200 bg-emerald-900'
      : 'border-blue-200 bg-indigo-900'
  )

  return (
    <div draggable onDragStart={dragStart} className={clazz}>
      <span>
        {setting!.map} in
        <span className="font-bold text-blue-100"> {setting!.age} </span>
        {clearSetting && (
          <span onClick={clearSetting} className={xClazz}>
            <Icons.XMarkIcon className="stroke-red" />
          </span>
        )}
      </span>
    </div>
  )
}
