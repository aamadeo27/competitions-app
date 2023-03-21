import classNames from 'classnames'
import React from 'react'

type Props = {
  content: React.ReactNode
  top?: string
  width?: string
}

export default function Tooltip({
  content,
  top = '-top-5',
  width = 'w-fit',
}: Props) {
  const classes = classNames(
    top,
    width,
    'tooltip z-90 -left-5 border-[1px] rounded-md border-white text-white text-xs bg-gray-900 p-1 absolute invisible'
  )

  return <div className={classes}>{content}</div>
}
