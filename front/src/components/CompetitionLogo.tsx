import classNames from 'classnames'

const COLOR_MAP: Record<string, string> = {
  XP: 'bg-xp',
  GP: 'bg-gp',
  IM: 'bg-im',
  BN: 'bg-bn',
}

const SIZES = {
  big: {
    circle: 'h-56 w-56',
    text: 'text-[140px]',
  },
  medium: {
    circle: 'h-16 w-16',
    text: 'text-3xl',
  },
  small: {
    circle: 'h-10 w-10',
    text: 'text-lg',
  },
}

type Props = {
  shortname: string
  size?: keyof typeof SIZES
}
export default function CompetitionLogo({ shortname, size = 'medium' }: Props) {
  const circleClasses = classNames(
    'flex',
    SIZES[size].circle,
    'm-2 rounded-full',
    COLOR_MAP[shortname]
  )

  return (
    <div className={circleClasses}>
      <div
        className={classNames('block text-gray-200 mx-auto', SIZES[size].text)}
      >
        {shortname}
      </div>
    </div>
  )
}
