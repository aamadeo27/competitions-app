import classNames from 'classnames'
import CivCard from '../components/CivCard'
import { Civ, CIVS, Player, SETTS } from '../logic/data'
import Match from './Match'
import { useReducer } from 'react'
import SettingCard from '../components/SettingCard'
import Curtain from '../components/Curtain'

const basicStyle = 'p-2'
const styles = {
  civs: classNames('col-span-2 grid grid-cols-1 relative', basicStyle),
  settings: classNames('col-span-2 relative', basicStyle),
  match: classNames('col-span-2 relative z-3', basicStyle),
}

type State = {
  a: Civ
  b: Civ
  setting: number | null
}
type CivPick = {
  player: Player
  civ: Civ
}
type Payload = CivPick | number | null
type Action = {
  payload: Payload
  type: 'pickCiv' | 'pickSetting'
}

const handlers = {
  pickCiv(state: State, action: Payload) {
    const {player, civ} = action as CivPick

    return {...state, [player]: civ}
  },
  pickSetting(state: State, setting: Payload){
    return {...state, setting: setting as number}
  }
}

const reducer = (state: State, action: Action) =>       
  handlers[action.type](state, action.payload)

const EMPTY_STATE: State = {
  a: null, b: null, setting: null 
}

export default function Draft() {
  const [state, dispatch] = useReducer(reducer, EMPTY_STATE)

  const pickers = {
    civ: (player: Player, civ: Civ) => dispatch({ type: 'pickCiv', payload: { player, civ } }),
    setting: (settId: number|null) =>
      dispatch({ type: 'pickSetting', payload: settId }),
  }

  const clazz = classNames(
    'text-violet-100',
    'grid grid-cols-6 gap-2 p-5 w-full h-full',
    'border-1'
  )

  const civs = CIVS
    .filter( c => c !== state.a && c !== state.b)
    .map( (c,i) => 
      <CivCard civ={c}
        key={i}/>
    )

  const settings = SETTS
    .filter( (s, settId) => settId !== state.setting )
    .map( (s,i) => 
      <SettingCard setting={s}
        key={i}
        id={i} />
    )

  return(
    <div className={clazz}>
      <div className={styles.civs}>
        <Curtain />
        {civs}      
      </div>
      <div className={styles.settings}>
        <Curtain />
        {settings}
      </div>
      <div className={styles.match}>
        <Curtain />
        <Match pickers={pickers}/>
      </div>
    </div>
  )
}