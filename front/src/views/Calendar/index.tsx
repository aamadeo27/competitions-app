import React, { useEffect } from 'react'
import { useState } from 'react'
import Curtain from '../../components/Curtain'
import { ModalName } from '../Modals'
import Availability from './Availability'
import CalendarComponent from './CalendarComponent'
import Toolbar from './Toolbar'

type ModalLib = { [x: string]: (close:() => void) => React.ReactNode }
const modals: ModalLib = {
  availability: (close: () => void) => <Availability close={close}/>,
} 

const mainClass = 'h-full w-full p-2'
export default function Calendar() {

  const [modal, setModal] = useState<ModalName>(null)

  useEffect( () => {
    const okd = (e: KeyboardEvent) => {
      console.log(e.key)
      if (e.key === 'Escape') setModal(null)
    }

    document.addEventListener('keydown', okd)

    return () => document.removeEventListener('keydown', okd)
  }, [setModal])

  return (
    <div className={mainClass}>
      <Toolbar setModal={setModal}/>
      <CalendarComponent />
      {modal
        ? <div>
          <Curtain classes='opacity-60 z-10'
            roundedClass=''/>
          {modals[modal](() => setModal(null))}
        </div>
        : null}
    </div>
  )
}