import classNames from 'classnames'
import Container from '../../components/Container'
import { User } from '../../generated/graphql'

type Props = {
  players: User[]
}

const VARIANT_MAP = {
  header: 'bg-gray-900 text-white text-lg',
  default: 'bg-gray-300 text-gray-900 text-xl',
  first: 'bg-gray-300 text-gray-900 text-xl',
  last: 'bg-gray-300 text-gray-900 text-xl',
}

const CELL_WIDTH = [
  'w-[100px] flex-none',
  'w-[600px] flex-none',
  'w-[100px] flex-none',
  'w-[120px] flex-none',
]

type RankingRowProps = {
  values: React.ReactNode[]
  variant?: keyof typeof VARIANT_MAP
}

function RankingRow({ values, variant = 'default' }: RankingRowProps) {
  const classes = classNames(
    'flex flex-row w-full font-semibold',
    VARIANT_MAP[variant],
  )

  const cells = values.map( (v,i) => (
    <div
      key={i}
      className={
        classNames(
          'overflow-hidden h-12 flex flex-row',
          CELL_WIDTH[i],
          i === 1 && variant !== 'header' ? 'text-left' : 'text-center'
        )
      }
    >
      {
        typeof v === 'string' 
          ? <span className='block h-12 w-full py-2'>{v}</span>
          : v
      }
    </div>
  ))

  return (
    <div className={classes}>
      {cells}
    </div>
  )
}

function CompetitorCell({ data }: {data: User}) {
  return (
    <>
      <img 
        className="block relative h-16 w-16 mr-4"
        src={data.avatar}
      />
      <span className='block h-12 w-full py-2 text-cent'>{data.name}</span>
    </>
  )
}
  

export default function Ranking({ players }: Props){

  const variant = (i: number) => i === 0
    ? 'first' 
    : i <= (players.length-3)
      ? 'default'
      : 'last'

  const positions = players.map( (p,i) => (
    <RankingRow
      key={i}
      variant={variant(i)}
      values={[
        ''+(i+1),
        <CompetitorCell
          data={p}
          key={i}
        />,
        ''+p.games,
        ''+p.score,
      ]}
    />
  )
  )

  return <Container sizeClasses='mr-10'>
    <div className='flex flex-col gap-4 font-main overflow-hidden'>
      <RankingRow 
        variant='header'
        values={['RANK','PLAYER','GAMES','POINTS']}
      />
      {positions}
    </div>
  </Container>
}