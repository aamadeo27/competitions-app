import * as Icons from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import SwordIcon from './icons/SwordIcon'

const classes =
  'mt-8 mx-14 py-2 rounded-2xl bg-gray-900 h-[700px] relative text-white'

type Props = {
  label: React.ReactNode
  path: string
  icon: React.ComponentType<{ className: string }>
  active?: boolean
  colorClasses?: string
}
function MenuButton({
  label,
  path,
  icon,
  active,
  colorClasses = 'stroke-white',
}: Props) {
  const itemClass = classNames('block py-1.5 w-full', {
    'bg-gray-800 rounded-3xl': active,
  })
  const IconElement = icon
  const classes = classNames(colorClasses, 'ml-4 inline-block h-6 w-6')

  return (
    <li className="w-full">
      <Link to={path} className={itemClass}>
        <IconElement className={classes} />
        {typeof label === 'string' ? (
          <span className="ml-3">{label}</span>
        ) : (
          label
        )}
      </Link>
    </li>
  )
}

export default function MenuBar() {
  const location = useLocation()

  return (
    <div className={classes}>
      <h1 className="ml-4 absolute top-4 font-medium text-sm w-32 font-logo">
        AoE DE Community League
      </h1>
      <ul className="px-4 grid grid-rows gap-3 absolute top-32 w-full">
        <MenuButton
          path="/"
          icon={Icons.HomeIcon}
          label="Home"
          active={location.pathname === '/'}
        />
        <MenuButton
          path="/calendar"
          icon={Icons.CalendarDaysIcon}
          label="Calendar"
          active={location.pathname === '/calendar'}
        />
        <MenuButton
          path="/match"
          icon={SwordIcon}
          label="Match"
          colorClasses="fill-white"
          active={location.pathname === '/match'}
        />
        <MenuButton
          path="/divisions"
          icon={Icons.BuildingLibraryIcon}
          label="Divisions"
          active={location.pathname === '/divisions'}
        />
        <MenuButton
          path="/configurations"
          icon={Icons.Cog8ToothIcon}
          label="Configurations"
          active={location.pathname === '/configurations'}
        />
      </ul>
    </div>
  )
}
