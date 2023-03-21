import React, { createContext, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Availability from './Availability'
import Challenge from './Challenge'

const modals = {
  availability: (close: () => void) => <Availability close={close} />,
  challenge: (close: () => void, data?: any) => (
    <Challenge
      start={data.start}
      end={data.end} 
      close={close}
      challenger={data.challenger}
      challenged={data.challenged}
    />
  ),
}
type ModalName = keyof typeof modals | null

type ModalControls = {
  modal: ModalName
  setModal: (m: ModalName, data?: any) => void
}

export const ModalContext = createContext<ModalControls>({
  modal: null,
  setModal: () => null,
})
export const useModals = () => useContext(ModalContext)

type PortalModalProps = {
  modal: ModalName
  setModal: (m: ModalName) => void
  data?: any
}
const PortalModal = ({ modal, setModal, data }: PortalModalProps) => {
  const node = document.getElementById('modals-portal')
  if (!modal || !node) return null

  return ReactDOM.createPortal(
    <div className="h-[160vh] bg-black/60 absolute top-0 left-0 right-0 z-20">
      {modals[modal](() => setModal(null), data)}
    </div>,
    node
  )
}

export const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalName>(null)
  const [data, setModalData] = useState<any>()
  useEffect(() => {
    const okd = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null)
    }
    document.addEventListener('keydown', okd)

    return () => document.removeEventListener('keydown', okd)
  }, [setModal])

  const controls: ModalControls = {
    modal,
    setModal: (modal, data?: any) => {
      setModal(modal)
      setModalData(data)
    },
  }

  return (
    <ModalContext.Provider value={controls}>
      <div>
        {children}
        {modal ? (
          <PortalModal modal={modal} setModal={setModal} data={data} />
        ) : null}
      </div>
    </ModalContext.Provider>
  )
}
