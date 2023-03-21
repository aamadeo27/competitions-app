import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useState } from 'react'

export type Option = {
  value: any
  label: React.ReactNode
}
type DropdownProps = {
  options: Option[]
  onSelect: (value: any) => void
  value?: any
  placeholder?: React.ReactNode
  sizeClasses?: string
  colorClasses?: string
  fontClasses?: string
  selectedClasses?: string
  hoverClasses?: string
  customRowClasses?: string
  paddingClasses?: string
}

export default function Dropdown({
  options,
  onSelect,
  value,
  placeholder,
  sizeClasses = 'w-48',
  colorClasses = 'bg-black/10 backdrop-blur-2xl',
  fontClasses = '',
  hoverClasses = 'hover:bg-gray-400 hover:text-gray-900',
  selectedClasses = 'bg-gray-300 text-gray-900',
  customRowClasses = 'px-5 py-1',
  paddingClasses = 'pt-2 pb-3',
}: DropdownProps) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? placeholder

  const btnClasses = classNames(
    sizeClasses,
    colorClasses,
    fontClasses,
    paddingClasses,
    'rounded-3xl flex flex-col',
    'absolute overflow-y-scroll',
    'h-fit max-h-72',
    expanded ? 'z-30' : 'z-20'
  )

  const rowClasses = (selected: boolean, header = false) =>
    classNames(
      customRowClasses,
      'flex flex-row cursor-pointer relative z-30',
      selected ? selectedClasses : 'text-white',
      header ? '' : hoverClasses
    )

  const onClickChevron = () => setExpanded(!expanded)
  const displayRow = (
    <div className={rowClasses(false, true)} onClick={onClickChevron}>
      {selectedLabel}
      {!expanded ? (
        <ChevronDownIcon className="flex-none pt-1 h-7 w-7 stroke-white" />
      ) : (
        <ChevronUpIcon className="flex-none pt-1 h-7 w-7 stroke-white" />
      )}
    </div>
  )

  const optionsRows: React.ReactNode[] = []
  const onClickOption = (v: any) => () => {
    setExpanded(false)
    onSelect(v)
  }

  if (expanded) {
    options.forEach((o) => {
      optionsRows.push(
        <div
          className={rowClasses(o.value === value)}
          key={o.value}
          onClick={onClickOption(o.value)}
        >
          {o.label}
        </div>
      )
    })
  }

  return (
    <div className={classNames('relative', sizeClasses, 'h-12')}>
      <div className={btnClasses}>
        {displayRow}
        {optionsRows}
      </div>
    </div>
  )
}
