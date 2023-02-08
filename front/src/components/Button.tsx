import classNames from 'classnames'

type Props = {
  disabled?: boolean
  href?: string
  onClick?: () => void
  colorClasses?: string
  sizeClasses?: string
  mainClasses?: string
  extraClasses?: string
  label: React.ReactNode
}

const MAIN_CLASSES = 'rounded-3xl cursor-pointer  block'
const COLOR_CLASSES = 'bg-gray-900 text-zinc-100'
const SIZE_CLASSES = 'w-40'

export default function Button({
  disabled,
  href,
  onClick,
  mainClasses = MAIN_CLASSES,
  colorClasses = COLOR_CLASSES,
  sizeClasses = SIZE_CLASSES,
  extraClasses,
  label,
}: Props){
  const classes = classNames(
    mainClasses,
    disabled ? 'bg-gray-500 text-white' : colorClasses,
    disabled ? '' : 'font-bold',
    sizeClasses,
    extraClasses
  )

  return <a className={classes}
    onClick={ !disabled ? onClick : undefined}
    href={href}>
    {label}
  </a>
}