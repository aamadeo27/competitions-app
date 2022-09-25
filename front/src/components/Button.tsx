import classNames from 'classnames'

type Props = {
  href?: string
  onClick?: () => void
  colorClasses?: string
  sizeClasses?: string
  mainClasses?: string
  extraClasses?: string
  label: React.ReactNode
}

const MAIN_CLASSES = 'rounded-3xl cursor-pointer font-bold block'
const COLOR_CLASSES = 'bg-stone-700 text-zinc-100'
const SIZE_CLASSES = 'w-40'

export default function Button({
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
    colorClasses,
    sizeClasses,
    extraClasses
  )
  return <a className={classes}
    onClick={onClick}
    href={href}>
    {label}
  </a>
}