export type Civ = 
  'Roman' | 'Greek' |
  'Macedonian' |'Carthaginian'| 
  'Palmyran' |'Assyrian'| 
  'Babilonian' | 'Choson'| 
  'Egyptian' |   'Hitite'| 
  'Minoan' |     'Persian'| 
  'Phoenician' | 'Shang' |
  'Sumerian' |   'Yamato' |
  null

export const CIVS: Civ [] = [
  'Roman',      'Greek',
  'Macedonian', 'Carthaginian',
  'Palmyran',   'Assyrian',
  'Babilonian', 'Choson',
  'Egyptian',   'Hitite',
  'Minoan',     'Persian',
  'Phoenician', 'Shang',
  'Sumerian',   'Yamato'
]
export type Player = 'a' | 'b'

export type Setting = {
    map: string | null
    age: string | null
} | null

export const SETTS: Setting[] = [
  { map: 'Coastal', age: 'Bronze'},
  { map: 'Narrows', age: 'Bronze'},
  { map: 'Continental', age: 'Bronze'},
  { map: 'Hill Country', age: 'Bronze'},
  { map: 'Mediterranean', age: 'Bronze'},
  { map: 'Inland', age: 'Bronze'},
  { map: 'Highland', age: 'Stone'},
  { map: 'Rivers', age: 'Stone'},
  { map: 'Oasis', age: 'Tool'},
  { map: 'Small Islands', age: 'Iron'},
  { map: 'Large Islands', age: 'Iron'},
]


export const getCiv = (civ: Civ) => 
  CIVS.find( c => c === civ )

export const getSetting = (id: number|null) => 
  id !== null ? SETTS[id] : undefined

