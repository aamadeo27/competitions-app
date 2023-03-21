import classNames from 'classnames'

type Props = {
  shortname: string
  name: string
}

const COLOR_MAP: Record<string, string> = {
  XP: 'bg-xp',
  GP: 'bg-gp',
  IM: 'bg-im',
  BN: 'bg-bn',
}

export default function CompetitionHeader({ shortname, name }: Props) {
  const logoClasses = classNames(
    'h-16 w-16 rounded-full mt-6 text mx-2',
    COLOR_MAP[shortname]
  )

  return (
    <div className="flex flex-row h-28 w-fit">
      <div className={logoClasses}>
        <span className="block px-3.5 py-3 text-3xl text-gray-200">
          {shortname}
        </span>
      </div>
      <span className="block text-xl text-gray-900 h-fit my-auto">{name}</span>
    </div>
  )
}
