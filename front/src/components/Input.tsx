import classNames from 'classnames'

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
  size?: keyof typeof SIZE_VARIANTS
}

const SIZE_VARIANTS = {
  big: 'w-72',
  normal: 'w-60',
  small: 'w-48',
  xsmall: 'w-24',
}

export default function Input({
  label,
  value,
  onChange,
  size = 'normal',
}: Props) {
  const inputClasses = 'bg-gray-300 rounded-md p-2 text-gray-800'
  const containerClasses = classNames(SIZE_VARIANTS[size], 'flex flex-col')

  return (
    <div className={containerClasses}>
      <span className="py-4 text-gray-500">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClasses}
      />
    </div>
  )
}
