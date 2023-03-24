import classNames from 'classnames'

const COLOR_MAP: Record<string, string> = {
  XP: 'bg-xp',
  GP: 'bg-gp',
  IM: 'bg-im',
  BN: 'bg-bn',
}

const SIZES = {
  medium: {
    circle: 'h-16 w-16',
    text: 'px-3.5 py-3 text-3xl',
  },
  small: {
    circle: 'h-10 w-10',
    text: 'px-2.5 py-1 text-lg',
  },
}

type Props = {
  shortname: string
  size?: 'medium' | 'small'
}
export default function CompetitionLogo({ shortname, size = 'medium' }: Props) {
  const circleClasses = classNames(
    SIZES[size].circle,
    'm-2 rounded-full',
    COLOR_MAP[shortname]
  )

  return (
    <div className={circleClasses}>
      <span className={classNames('block text-gray-200', SIZES[size].text)}>
        {shortname}
      </span>
    </div>
  )
}
