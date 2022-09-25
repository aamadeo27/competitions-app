import * as Icons from '@heroicons/react/24/outline'
import { ModalName } from '../Modals'

const mainClass = 'h-1/6 p-3'

type Props = {
  setModal: (m:ModalName) => void
}

export default function Toolbar({ setModal }: Props) {
  const onClick = (modal: ModalName) => () => setModal(modal)

  return (
    <div className={mainClass}>
      <div
        className='rounded-3xl bg-stone-900 w-40 h-12 p-1 cursor-pointer'
        onClick={onClick('availability')}
      >
        <Icons.ClockIcon className='m-1 h-8 w-8 stroke-zinc-200 inline-block'/>
        <span className='text-zinc-200 text-sm inline-block font-bold'>
          Set availability
        </span>
      </div>
    </div>
  )
}