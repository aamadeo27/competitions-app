import Button from '../components/Button'
import * as Icons from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useQuery } from '@apollo/client'
import { useUser } from '../logic/client'
import type { Option } from '../components/Dropdown'
import Dropdown from '../components/Dropdown'
import { userQuery } from '../graphql'
import { User } from '../generated/graphql'

type Props = {
  close: () => void
  start: number
  end: number
  challenger: User
  challenged: User
  existing?: boolean
}

const HOURS: Option[] = []
for (let i = 0 ; i < 24 ; i++) {
  HOURS.push({
    value: i,
    label: <span className='flex-grow text-left'>{i < 10 ? '0' + i : i}:00</span>
  })
}

export default function Challenge({ close, start, end, challenger, challenged, existing }: Props) {
  const userCtx = useUser()
  const [schedule, setSchedule] = useState(() =>({ 
    start: new Date(start).getHours(),
    end: new Date(end).getHours(),
  }))

  const userResult = useQuery(userQuery, {
    variables: { userId: userCtx?.user?.id ?? '-1'},
  })


  const user = userResult.data?.getUserById
  const userIsChallenging = user?.steamId === challenger.steamId
  const opponent = userIsChallenging ? challenged : challenger
  const modified = existing && new Date(start).getHours() !== schedule.start
  const btnLabel = !existing ? 'Challenge' : (modified ? 'Update' : 'Accept')
  
  useEffect(() => {
    console.log('Data Refreshed', schedule)
  },[userResult.data])

  if (!open) return null

  const MAIN_CLASSES = classNames(
    'relative mx-auto mt-16 p-12 rounded-3xl',
    'bg-gray-900 h-fit w-fit min-w-modal',
    'flex flex-col gap-10 text-gray-300'
  )

  const OPPONENT_CLASSES = classNames(
    'bg-black/40 rounded-2xl w-full h-fit',
    'flex flex-row overflow-y-scroll p-10 gap-10',
  )

  const onChangeHour = (field: 'end'|'start') => (value: number) => {
    setSchedule((old) => ({
      ...old,
      [field]: value
    }))
  }

  const opponentPoints =
    opponent.matches?.reduce(
      (p, m) => p + (m.results?.filter((r) => r && r.winner === opponent.steamId)?.length ?? 0)
      ,0
    )

  return (
    <div className={MAIN_CLASSES}>
      <div className='flex flex-col gap-2'>
        <h1 className='flex-none w-60 font-bold text-4xl'>Challenge</h1>
        <div className='text-gray-500 text-sm'>Set a schedule to play this opponent</div>
      </div>
      
      <div className={OPPONENT_CLASSES}>
        <img src={opponent.avatar} className='bg-gray-900 rounded-xl'/>
        <div className='flex flex-col w-full gap-3 text-xl'>
          <div className='text-2xl'>{opponent.name}</div>
          <div>{opponent.games} games</div>
          <div>{opponentPoints} points</div>
        </div>
      </div>

      <div className='flex flex-row gap-3 text-xl'>
        <Icons.CalendarDaysIcon className='h-10 w-10 pt-2'/>
        <div className='pt-2'>{new Date(start).toDateString()}</div>
        <Dropdown 
          colorClasses='bg-gray-800'
          sizeClasses='w-36'
          paddingClasses='py-1 mb-1'
          onSelect={onChangeHour('start')}
          value={schedule.start}
          options={HOURS}
        />
      </div>

      <Button
        colorClasses='bg-green-2'
        onClick={() => close()}
        label={btnLabel}
        sizeClasses='h-fit w-fit text-xl rounded-full'
        extraClasses='px-6 py-2'
      />

      <Button
        onClick={() => close()}
        label={<Icons.XMarkIcon />}
        colorClasses=''
        sizeClasses='h-8 w-8'
        extraClasses='absolute top-5 right-5'
      />
    </div>
  )
}