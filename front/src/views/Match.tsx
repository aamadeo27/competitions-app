import React, { useState } from 'react'
import CivCard from '../components/CivCard'
import SettingCard from '../components/SettingCard'
import type { Civ, Player, Setting } from '../logic/data'
import { getCiv, getSetting } from '../logic/data'

const styles = {
  setting: (isEmpty: boolean) =>
    isEmpty
      ? 'p-1 font-bold text-indigo-100 text-center border-dashed border-2 border-blue-200 rounded-md'
      : '',
  civ: (isEmpty: boolean) =>
    isEmpty
      ? 'p-1 font-bold text-indigo-100 text-center border-dashed border-2 border-blue-200 rounded-md'
      : '',
}

type MatchSettingProps = {
  setting?: Setting
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  id: number | null
  clearSetting: () => void
}

const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

function MatchSetting({
  setting,
  id,
  onDrop,
  clearSetting,
}: MatchSettingProps) {
  return (
    <div
      className={styles.setting(!setting)}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {setting === undefined ? (
        <span>Setting</span>
      ) : (
        <SettingCard setting={setting} id={id!} clearSetting={clearSetting} />
      )}
    </div>
  )
}
type MatchCivProps = {
  civ?: Civ
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  player: Player
  clearCiv: () => void
}
function MatchCiv({ civ, onDrop, clearCiv, player }: MatchCivProps) {
  return (
    <div className={styles.civ(!civ)} onDrop={onDrop} onDragOver={onDragOver}>
      {civ ? (
        <CivCard civ={civ} clearCiv={clearCiv} />
      ) : (
        <span>Player {player.toUpperCase()}</span>
      )}
    </div>
  )
}

type MatchProps = {
  pickers: {
    civ: (player: Player, civ: Civ) => void
    setting: (settId: number | null) => void
  }
}

type PickedCivs = {
  a?: Civ
  b?: Civ
}

export default function Match({ pickers }: MatchProps) {
  const [civs, setCivs] = useState<PickedCivs>({})
  const [settId, setSetting] = useState<number | null>(null)

  const setCiv = (player: Player, civ: Civ) => {
    const newCivs = { ...civs }
    newCivs[player] = civ

    pickers.civ(player, newCivs[player] ?? null)
    setCivs(newCivs)
  }

  const onDropCiv =
    (player: Player) => (e: React.DragEvent<HTMLDivElement>) => {
      const type = e.dataTransfer.getData('type')
      if (type !== 'civ') return

      setCiv(player, e.dataTransfer.getData('name') as Civ)
    }

  const clearSetting = () => {
    setSetting(null)
    pickers.setting(null)
  }
  const clearCiv = (player: Player) => () => setCiv(player, null)

  const onDropSetting = (e: React.DragEvent<HTMLDivElement>) => {
    const type = e.dataTransfer.getData('type')

    if (type !== 'setting') return

    const newSettId = parseInt(e.dataTransfer.getData('id'))
    pickers.setting(newSettId)
    setSetting(newSettId)
  }

  const matchClass = 'grid grid-rows-2 rounded-md gap-2 w-full absolute pr-4'
  const match = {
    a: {
      civ: getCiv(civs.a ?? null),
    },
    setting: getSetting(settId),
    b: {
      civ: getCiv(civs.b ?? null),
    },
  }

  return (
    <div className={matchClass}>
      <MatchSetting
        setting={match.setting}
        onDrop={onDropSetting}
        id={settId}
        clearSetting={clearSetting}
      />
      <div className="grid grid-cols-2 gap-2">
        <MatchCiv
          civ={match.a.civ}
          onDrop={onDropCiv('a')}
          player={'a'}
          clearCiv={clearCiv('a')}
        />
        <MatchCiv
          civ={match.b.civ}
          onDrop={onDropCiv('b')}
          player={'b'}
          clearCiv={clearCiv('b')}
        />
      </div>
    </div>
  )
}
