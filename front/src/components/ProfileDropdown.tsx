import { useUser } from '../logic/client'
import { PowerIcon } from '@heroicons/react/20/solid'
import { urls } from '../logic/constants'
import Dropdown from './Dropdown'
import { ClockIcon } from '@heroicons/react/24/outline'
import { useModals } from '../modals/modals'

export default function ProfileDropdown() {
  const ctx = useUser()
  const modals = useModals()

  if (!ctx?.user || !modals.setModal) return <span>Loading</span>

  const items = [
    {
      value: 0,
      label: (
        <>
          <img
            src={ctx.user.avatar}
            className="h-8 w-8 rounded-full mr-4"
            alt=""
          />
          <span className="flex-grow pt-1">{ctx.user.name}</span>
        </>
      ),
    },
    {
      value: 1,
      label: (
        <>
          <ClockIcon className="h-8 w-8 rounded-full mr-4" />
          <span className="flex-grow">Availability</span>
        </>
      ),
    },
    {
      value: 2,
      label: (
        <>
          <PowerIcon className="h-8 w-8 rounded-full mr-4" />
          <span className="flex-grow">Log out</span>
        </>
      ),
    },
  ]

  const actions = [
    () => null,
    () => modals.setModal('availability'),
    () => (location.href = urls.logout),
  ]

  return (
    <div className="absolute z-20 right-0 m-4">
      <Dropdown
        onSelect={(v: number) => actions[v]()}
        options={items}
        placeholder=""
        value={0}
        sizeClasses="w-60 gap-4"
        paddingClasses="py-1"
        customRowClasses="pl-1 pr-2"
        selectedClasses="hidden"
        hoverClasses=""
        colorClasses="bg-gray-400/20"
      />
    </div>
  )
}
